import { MainLayout } from '@/components/layout'
import DirectionButton from '@/components/shared/button/direction-button'
import SelectButton from '@/components/shared/button/select-button'
import InputGroup from '@/components/shared/input/input-group'
import { Images } from '@/utils/images'
import CancelIcon from '@mui/icons-material/Cancel'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import {
  Button,
  ButtonBase,
  CardMedia,
  Collapse,
  FormHelperText,
  InputAdornment,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material'

import MySwitch from '@/components/shared/input/my-switch'
import MyTextField from '@/components/shared/input/my-text-field'
import { FormCreateNFT } from '@/models/form'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { Box, Container } from '@mui/system'
import { useWeb3React } from '@web3-react/core'
import { PageBlockContext } from 'context/page-block-context'
import { Form, Formik } from 'formik'
import useNFT from 'hooks/useNFT'
import { useRouter } from 'next/router'
import { memo, useCallback, useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { NftService } from 'services'
import * as Yup from 'yup'
import { PRIMARY_CURRENCY_NAME, STORAGE_API_KEY, SUPPORT_IMG } from '@/constants/index'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />
interface FilePreview {
  blob: Blob
  srcPreview: string
  type: string
}
interface Props {
  [key: string]: string
  NFT_STORAGE_API_KEY: string
}

const TYPE_PUT_ON_MARKET: {
  name: string
  list: {
    mainText: string
    value: string
    image: any
    typeImage: string
  }[]
} = {
  name: 'typePutOnMarket',
  list: [
    {
      mainText: 'Fixed price',
      value: 'fixed-price',
      image: Images.FixedPriceIcon,
      typeImage: 'svg',
    },
  ],
}
const COLLECTION_OPTIONS: {
  name: string
  list: {
    mainText: string
    subText: string
    value: string
    image: any
    typeImage: string
  }[]
} = {
  name: 'collectionOption',
  list: [
    {
      mainText: 'Marketplace Demo',
      subText: 'Collection',
      value: 'aioz-art',
      image: Images.AiozCollectionIcon,
      typeImage: 'png',
    },
  ],
}

const initialValues: FormCreateNFT = {
  file: null,
  typePutOnMarket: 'fixed-price',
  price: '',
  collectionOption: 'aioz-art',
  title: '',
  description: '',
  putOnMarket: true,
}
let validationSchema = Yup.object().shape({
  file: Yup.mixed().required('The collectible image is required.'),
  putOnMarket: Yup.boolean(),
  typePutOnMarket: Yup.string().when('putOnMarket', {
    is: true,
    then: Yup.string(),
  }),
  price: Yup.string().when(['putOnMarket', 'typePutOnMarket'], {
    is: (putOnMarket: boolean, typePutOnMarket: string) => putOnMarket,
    then: Yup.string()
      .required('Price is required')
      .test('price', 'Prire must be a number', (value: any) => {
        if (value) return /[0-9]+(\.[0-9]*)?$/.test(value) && !!parseFloat(value)
        else return false
      })
      .test('price', 'Prire must be a positive number', (value: any) => {
        if (value) return /^[0-9]+(\.[0-9]*)?$/.test(value)
        else return false
      })
      .test('price', 'Just allow decimal 18', (value: any) => {
        if (value) return /^\d*(\.[0-9]{0,18})?$/.test(value)
        else return false
      }),
  }),
  collectionOption: Yup.string().required('Collection is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
})

export default function CreateErc721({ NFT_STORAGE_API_KEY }: Props) {
  const [file, setFile] = useState<FilePreview>()
  const { account, provider, isActive, chainId } = useWeb3React()
  const { mintNFT } = useNFT()
  const router = useRouter()
  const pageBlockContext = useContext(PageBlockContext)
  const onDrop = useCallback((acceptedFiles: File[]) => {
    let blob = new Blob([acceptedFiles[0]])
    const srcPreview = URL.createObjectURL(blob)
    if (acceptedFiles[0].type.toString().includes('video')) {
      setFile({
        blob,
        srcPreview,
        type: 'video',
      })
    }
    if (acceptedFiles[0].type.toString().includes('audio')) {
      setFile({
        blob,
        srcPreview,
        type: 'audio',
      })
    } else
      setFile({
        blob,
        srcPreview,
        type: 'img',
      })
  }, [])

  // Submit Form
  const onSubmit = async (values: FormCreateNFT): Promise<any> => {
    console.log(values.file)
    if (provider && account && isActive) {
      if (values.file) {
        try {
          // Create IPFS
          const newIPFS = await NftService.createMetadata(
            values.file,
            values.title,
            values.description,
            STORAGE_API_KEY
          )
          console.log('IPFS:', newIPFS)

          // Mint NFT
          const newNFT: any = await mintNFT(account, newIPFS)
          console.log('new NFT:', newNFT)

          // Post new data nft to server
        } catch (error) {
          console.log(error)
          return Promise.reject()
        }
      } else {
        return Promise.reject()
      }
    } else {
      // Request switch network
      return Promise.reject('Please connect your wallet')
    }
  }
  return (
    <Box>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '60px',
        }}
      >
        <DirectionButton
          text='Go back'
          href='/create'
          icon={<KeyboardBackspaceIcon sx={{ color: 'inherit' }} />}
        />
      </Container>
      <Container maxWidth='lg'>
        <Stack direction='column'>
          <Typography variant='h1' sx={{ marginBottom: '60px' }}>
            Create Single collectible
          </Typography>
          <Stack direction='row' gap='6rem'>
            {/*  Left BOX */}
            <Box sx={{ flex: '60%', overflow: 'hidden' }}>
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(values) => {
                  console.log(isActive)
                  if (!isActive) router.push(`/login?from=create/erc721`)
                  pageBlockContext?.openPageBlock({
                    func: onSubmit(values),
                    text: 'Creating...',
                    success: 'Create NFT success',
                    error: 'Create NFT error!',
                  })
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  setFieldValue,
                  setFieldError,
                  handleChange,
                  handleBlur,
                }) => (
                  <Form autoComplete='off'>
                    {/* DROP FILE */}
                    {/* <pre>{JSON.stringify({ values, errors, touched }, null, 4)}</pre> */}

                    <Box sx={{ marginBottom: '40px' }}>
                      <Typography variant='h3'>Upload file</Typography>
                      <Box
                        sx={{
                          marginTop: '16px',
                          border: '2px dashed',
                          borderColor: 'border.main',
                          borderRadius: '18px',
                          padding: file ? '3.75rem' : '40px 0',
                          position: 'relative',
                        }}
                      >
                        {/* UPLOAD FILE */}
                        {!file && (
                          <>
                            <UploadComponentMemorized
                              setFieldValue={setFieldValue}
                              setFieldError={setFieldError}
                              onDrop={onDrop}
                            />
                          </>
                        )}
                        {/* FILE PREVIEW */}
                        {file && (
                          <Box sx={{ position: 'relative' }}>
                            {file && file.type === 'video' ? (
                              <CardMedia
                                component='video'
                                // className={classes.media}
                                // image={'path/to/file/video.webm'}
                                src={file.srcPreview}
                                autoPlay
                                controls
                                sx={{
                                  height: '100%',
                                  width: '100%',
                                  borderRadius: '10px',
                                }}
                                onLoad={() => {
                                  URL.revokeObjectURL(file.srcPreview)
                                }}
                              />
                            ) : file && file.type === 'audio' ? (
                              <Box
                                sx={{
                                  height: '100px',
                                  // height: '100%',
                                  width: '100%',
                                  borderRadius: '10px',
                                }}
                              >
                                <audio
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'transparent',
                                  }}
                                  controls
                                  src={file.srcPreview}
                                ></audio>
                              </Box>
                            ) : (
                              <Box
                                component='img'
                                src={file.srcPreview}
                                sx={{
                                  height: '100%',
                                  width: '100%',
                                  borderRadius: '10px',
                                }}
                                onLoad={() => {
                                  URL.revokeObjectURL(file.srcPreview)
                                }}
                              ></Box>
                            )}
                          </Box>
                        )}
                        {file && (
                          <Box sx={{ position: 'absolute', top: '16px', right: '16px' }}>
                            <ButtonBase>
                              <CancelIcon
                                sx={{ color: 'secondary.main', fontSize: '38px' }}
                                onClick={() => {
                                  setFile(undefined)
                                  setFieldValue('file', '')
                                }}
                              ></CancelIcon>
                            </ButtonBase>
                          </Box>
                        )}
                      </Box>

                      {errors.file && touched.file && (
                        <FormHelperText error={true}>{errors.file}</FormHelperText>
                      )}
                    </Box>
                    <Stack>
                      {/* Put on marketplace */}
                      <Box>
                        {/* Button switch */}
                        <Box sx={{ position: 'relative', marginBottom: '20px' }}>
                          <Typography variant='h3' sx={{ marginBottom: '8px' }}>
                            Put on marketplace
                          </Typography>
                          <Typography variant='body1'>
                            Enter price to allow users instantly purchase your NFT
                          </Typography>
                          {/* Switch Put on market */}
                          <MySwitch
                            onBlur={handleBlur}
                            name='putOnMarket'
                            value={values.putOnMarket}
                            checked={values.putOnMarket}
                            onChange={handleChange}
                            sx={{ position: 'absolute', top: '0', right: '0' }}
                          ></MySwitch>
                        </Box>
                        {/* Select type put on marketplace */}

                        <Collapse in={values.putOnMarket}>
                          <Stack>
                            <Box
                              role='group'
                              aria-labelledby='my-radio-group'
                              sx={{ display: 'flex', flexDirection: 'row' }}
                            >
                              {TYPE_PUT_ON_MARKET &&
                                TYPE_PUT_ON_MARKET.list.map((item, index) => (
                                  <Box
                                    sx={{
                                      marginBottom: '20px',
                                      marginRight: '30px',
                                    }}
                                    key={index}
                                  >
                                    <SelectButton
                                      size='large'
                                      name={TYPE_PUT_ON_MARKET.name}
                                      value={item.value}
                                      image={item.image}
                                      typeImage={item.typeImage}
                                      mainText={item.mainText}
                                      isChecked={
                                        values.typePutOnMarket === item.value
                                          ? true
                                          : false
                                      }
                                      setFieldValue={setFieldValue}
                                      sx={{ minHeight: '191px', minWidth: '191px' }}
                                    ></SelectButton>
                                  </Box>
                                ))}
                            </Box>
                            {/* Input Group Price */}
                            <InputGroup title='Price'>
                              <Stack>
                                <MyTextField
                                  variant='standard'
                                  name='price'
                                  placeholder='Enter price for one piece'
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position='end'>
                                        <Typography
                                          variant='body2'
                                          color='common.white'
                                          fontWeight='700'
                                        >
                                          wAIOZ
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                ></MyTextField>
                                <Box>
                                  <Typography
                                    variant='subtitle1'
                                    color='myColor.cement'
                                    sx={{ display: 'inline-block' }}
                                  >
                                    Service fee &nbsp;
                                  </Typography>
                                  <Typography
                                    variant='subtitle1'
                                    sx={{
                                      display: 'inline-block',
                                      color: 'common.white',
                                    }}
                                  >
                                    0.000025 {PRIMARY_CURRENCY_NAME}
                                  </Typography>
                                </Box>
                              </Stack>
                            </InputGroup>
                          </Stack>
                        </Collapse>
                      </Box>

                      {/*Select Collection  */}
                      <Box
                        role='group'
                        aria-labelledby='selection-group'
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginBottom: '20px',
                        }}
                      >
                        {COLLECTION_OPTIONS &&
                          COLLECTION_OPTIONS.list.map((item, index) => (
                            <Box key={index} sx={{ marginRight: '30px' }}>
                              <SelectButton
                                size='large'
                                name={COLLECTION_OPTIONS.name}
                                value={item.value}
                                image={item.image}
                                typeImage={item.typeImage}
                                mainText={item.mainText}
                                isChecked={
                                  values.collectionOption === item.value ? true : false
                                }
                                disabled={item.value === 'create'}
                                setFieldValue={setFieldValue}
                              ></SelectButton>
                            </Box>
                          ))}
                      </Box>

                      {/* Form input Title, Description, Royalties */}
                      <InputGroup title='Title'>
                        <Stack>
                          <MyTextField
                            variant='standard'
                            name='title'
                            placeholder='e.g. "Redeemable T-Shirt with logo" '
                          ></MyTextField>
                        </Stack>
                      </InputGroup>
                      <InputGroup title='Description' note='Optional'>
                        <Stack>
                          <MyTextField
                            variant='standard'
                            name='description'
                            placeholder='e.g. “After purchasing you’ll ve able to get the real T-shirt”'
                          ></MyTextField>
                        </Stack>
                      </InputGroup>

                      {/* Btn submit */}
                      <Stack direction='row' alignItems='center' justifyContent='center'>
                        <Button
                          variant='contained'
                          color='primary'
                          size='medium'
                          sx={{ padding: '20px 105px', marginTop: '60px' }}
                          // onClick={(e: any) => onSubmit(values)}
                          type='submit'
                        >
                          Create Item
                        </Button>
                      </Stack>
                    </Stack>

                    {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                  </Form>
                )}
              </Formik>
            </Box>

            {/*  Right BOX*/}
            <Box sx={{ flex: '40%' }}>
              <Typography variant='h3'>Preview</Typography>
              <Box
                sx={{
                  marginTop: '16px',
                  border: '2px solid',
                  borderColor: 'border.main',
                  borderRadius: '12px',
                  position: 'sticky',
                  top: '2rem',
                  minHeight: '150px',
                  // minWidth: '392px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* FILE PREVIEW */}
                {file && file.type === 'video' ? (
                  <CardMedia
                    component='video'
                    // className={classes.media}
                    // image={'path/to/file/video.webm'}
                    src={file.srcPreview}
                    autoPlay
                    controls
                    sx={{
                      height: '100%',
                      width: '100%',
                      borderRadius: '10px',
                    }}
                    onLoad={() => {
                      URL.revokeObjectURL(file.srcPreview)
                    }}
                  />
                ) : file && file.type === 'audio' ? (
                  <Box
                    sx={{
                      height: '100px',
                      // height: '100%',
                      width: '100%',
                      borderRadius: '10px',
                    }}
                  >
                    <audio
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent',
                      }}
                      controls
                      src={file.srcPreview}
                    ></audio>
                  </Box>
                ) : file && file.type === 'img' ? (
                  <Box
                    component='img'
                    src={file.srcPreview}
                    className='preview'
                    sx={{
                      width: '100%',
                      height: '100%',
                      // paddingTop: '100%',
                      borderRadius: '10px',
                      objectFit: 'fill',
                      // overflow: 'hidden',
                      // backgroundSize: '',
                      // backgroundPosition: 'center',
                      // backgroundImage: `url(${file.srcPreview})`,
                    }}
                    id='img-review'
                    onLoad={() => {
                      URL.revokeObjectURL(file.srcPreview)
                    }}
                  ></Box>
                ) : (
                  <Typography variant='subtitle1' maxWidth='218px' align='center'>
                    Upload file to preview your brand new NFT
                  </Typography>
                )}
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

const UploadComponent = (props: any) => {
  const { setFieldValue, onDrop, setFieldTouched, setFieldError } = props
  const { acceptedFiles, getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    maxSize: 100000000,
    accept: {
      'image/png': SUPPORT_IMG,
      // 'video/mp4': ['.mp4'],
      // 'audio/mp3': ['.mp3'],
      // 'text/html': ['.html', '.htm'],
    },
    onError: (error) => {
      setFieldError('file', 'The collectible image must be PNG, GIF, WEBP, MP4 or MP3')
    },
    onDropAccepted: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        setFieldValue('file', acceptedFiles[0])
        onDrop(acceptedFiles)
      }
    },
    onDropRejected(fileRejections, event) {
      if (fileRejections) {
        setFieldError('file', 'The collectible image must be PNG, GIF, WEBP, MP4 or MP3')
      }
    },
  })
  return (
    <Box
      {...getRootProps()}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <input {...getInputProps()} />
      <Stack direction='row' alignItems='center'>
        <SvgIcon
          component={Images.ImgUploadIcon}
          viewBox='0 0 48 48'
          sx={{ width: 'auto', height: 'auto', color: 'border.main' }}
        ></SvgIcon>
        <Typography
          variant='subtitle1'
          sx={{
            maxWidth: '218px',
            marginLeft: '1rem',
            color: 'myColor.grey',
          }}
        >
          PNG, GIF, JPG. Max 100mb.
        </Typography>
      </Stack>

      <Button
        variant='contained'
        color='secondary'
        type='button'
        disableRipple={true}
        onClick={open}
        sx={{
          marginTop: '16px ',
        }}
      >
        Choose File
      </Button>
    </Box>
  )
}
const UploadComponentMemorized = memo(UploadComponent)

CreateErc721.Layout = MainLayout

export const getStaticProps = () => {
  const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY
  return {
    props: {
      NFT_STORAGE_API_KEY,
    },
  }
}
