import SelectButton from '@/components/shared/button/select-button'
import InputGroup from '@/components/shared/input/input-group'
import MySelectField from '@/components/shared/input/my-select-field'
import MyTextField from '@/components/shared/input/my-text-field'
import { FormSellNFT } from '@/models/form'
import { NftData, Profile } from '@/models/index'
import { StyledSvgIcon } from '@/styles/custome-mui'
import { toEther, truncateAddress } from '@/utils/convert'
import { ImagesCreatorPage } from '@/utils/images'
import CloseIcon from '@mui/icons-material/Close'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import {
  Box,
  Button,
  Collapse,
  InputAdornment,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'
import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import * as yup from 'yup'
import User from './user'
import { ethers } from 'ethers'
import { PageBlockContext } from 'context/page-block-context'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'

const typePutOnMarkets: {
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
      image: ImagesCreatorPage.SmallFixedPrice,
      typeImage: 'svg',
    },
    {
      mainText: 'Timed auction',
      value: 'timed-auction',
      image: ImagesCreatorPage.SmallTimeAuction,
      typeImage: 'svg',
    },
  ],
}

let validationSchema = yup.object().shape({
  minimumBid: yup.string(),
  price: yup
    .string()
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
    })
    .test(
      'price',
      'Price must be bigger than minimum bid',
      (price?: any, values2?: any) => {
        return !(price <= values2.parent.minimumBid)
      }
    ),
})
type Props = {
  nftData: NftData
  seller: Profile
  collectionName: string
  open: boolean
  imagePath: string
  handleCloseModal: () => void
  handleOpenModal: () => void
  onSubmit: (price: string) => Promise<any>
}
const ModalBid = ({
  handleCloseModal,
  handleOpenModal,
  onSubmit,
  open,
  seller,
  collectionName,
  nftData,
  imagePath,
}: Props) => {
  const initialValues = {
    price: '',
    selectPrice: 'WAIOZ',
    minimumBid: nftData && nftData.bid ? nftData.bid.minBidAmount : '0',
  }
  const { isActive, account } = useWeb3React()
  const pageBlockContext = useContext(PageBlockContext)

  const router = useRouter()
  return (
    <Modal
      open={open}
      onClose={() => {
        handleCloseModal()
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '690px',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: '60px',
            borderRadius: 2,
            color: 'common.white',
            overflowY: 'scroll',
          }}
        >
          <StyledSvgIcon
            onClick={() => {
              handleCloseModal()
            }}
            component={CloseIcon}
            color='white'
            width={20}
            height={20}
            sx={{
              cursor: 'pointer',
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
          ></StyledSvgIcon>

          <Typography variant='h1' sx={{ marginBottom: '40px' }}>
            Place a bid
          </Typography>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={
              async (values) => {
                if (!isActive) {
                  await router.push(`/login?from=${router.asPath}`)
                  toast.error('Please connect wallet!')
                } else
                  pageBlockContext
                    ?.openPageBlock({
                      func: onSubmit(values.price),
                      text: 'Bidding...',
                      success: 'Bid NFT success.',
                      error: 'Bid NFT fail!',
                    })
                    .finally(() => handleCloseModal())
              }
              // (values) =>
              //   toast
              //     .promise(onSubmit(values.price), {
              //       loading: 'Creating...',
              //       success: <b>Bid NFT success!</b>,
              //       error: <b>Bid NFT fail!</b>,
              //     })
              //     .finally(() => handleCloseModal())
            }
          >
            {({ values, setFieldValue }) => (
              <Form autoComplete='off'>
                {/* Price */}
                <Stack direction='row'>
                  {/* Image */}
                  <Box
                    sx={{
                      flex: '1',
                      borderRadius: '16px',
                      maxWidth: '550px',
                      maxHeight: '550px',
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: 'common.black',
                        position: 'relative',
                        paddingBottom: '100%',
                        overflow: 'hidden',
                        height: 0,
                        borderRadius: '16px',
                        '& .lazy-load-image-background': {
                          position: 'relative',
                          paddingBottom: '100%',
                          overflow: 'hidden',
                          width: '100%',
                          height: '100%',
                        },
                      }}
                    >
                      {nftData ? (
                        <Box
                          component={LazyLoadImage}
                          src={imagePath ? imagePath : ''}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            objectPosition: 'center',
                          }}
                          effect='blur'
                        ></Box>
                      ) : (
                        <Box></Box>
                      )}
                    </Box>
                  </Box>

                  {/* Information Nft */}
                  <Stack
                    sx={{
                      marginLeft: '30px',
                      maxWidth: '440px',
                      flex: '1',
                    }}
                  >
                    <Typography>
                      Collection{' '}
                      {collectionName ? (
                        <Typography
                          component='span'
                          fontWeight='bold'
                          color='myColor.foggy'
                          sx={{ textTransform: 'uppercase' }}
                        >
                          {collectionName}
                        </Typography>
                      ) : (
                        'UNKNOWN'
                      )}
                    </Typography>
                    <Typography variant='h3' mb={1 / 2} mt={1 / 2}>
                      {nftData && nftData.nft.title} #{nftData && nftData.nft.tokenId}
                    </Typography>
                    {seller && (
                      <User
                        title='Seller'
                        name={
                          seller.displayName
                            ? seller.displayName
                            : truncateAddress(seller.walletAddress, 'MATCH44')
                        }
                        sx={{ margin: '16px 0' }}
                      ></User>
                    )}
                    <MyTextField
                      variant='standard'
                      name='minimumBid'
                      sx={{ display: 'none' }}
                    />

                    <InputGroup title='Price' sx={{ marginBottom: '12px' }} size='small'>
                      <MyTextField
                        variant='standard'
                        name='price'
                        placeholder='Enter price for one piece'
                        sx={{ fontSize: '12px' }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <MySelectField
                                type='small'
                                size='small'
                                name='selectPrice'
                                items={['WAIOZ', 'ETH']}
                              ></MySelectField>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </InputGroup>
                    {/* Fee */}
                    {nftData && nftData.bid && (
                      <Typography variant='body2' sx={{ display: 'inline-block' }}>
                        Minimum Bid &nbsp;
                        <Typography
                          variant='body2'
                          sx={{
                            display: 'inline-block',
                            color: 'common.white',
                            fontWeight: 'bold',
                          }}
                          component='span'
                        >
                          {toEther(nftData.bid.minBidAmount)}
                        </Typography>
                      </Typography>
                    )}
                    <Box>
                      <Typography variant='body2' sx={{ display: 'inline-block' }}>
                        Service fee &nbsp;
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          display: 'inline-block',
                          color: 'common.white',
                          fontWeight: 'bold',
                        }}
                      >
                        2.5%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='body2' sx={{ display: 'inline-block' }}>
                        You will receive &nbsp;
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          display: 'inline-block',
                          color: 'common.white',
                          fontWeight: 'bold',
                        }}
                      >
                        0 EHT 0
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
                <Stack alignItems='center' justifyContent='center'>
                  <Button
                    variant='contained'
                    color='primary'
                    size='medium'
                    sx={{ padding: '20px 140px', margin: '0', marginTop: '60px' }}
                    type='submit'
                  >
                    Place a bid
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModalBid
