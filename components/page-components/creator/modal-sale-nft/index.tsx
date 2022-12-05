import SelectButton from '@/components/shared/button/select-button'
import InputGroup from '@/components/shared/input/input-group'
import MySelectField from '@/components/shared/input/my-select-field'
import MyTextField from '@/components/shared/input/my-text-field'
import { FormSellNFT } from '@/models/form'
import { StyledSvgIcon } from '@/styles/custome-mui'
import { ImagesCreatorPage } from '@/utils/images'
import CloseIcon from '@mui/icons-material/Close'
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
import { useWeb3React } from '@web3-react/core'
import { PageBlockContext } from 'context/page-block-context'
import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import * as yup from 'yup'

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
const initialValues: FormSellNFT = {
  typePutOnMarket: 'fixed-price',
  price: '',
  minimumBid: '',
  startingDate: 'Right after listing',
  expirationDate: '1 day',
  selectPrice: 'WAIOZ',
  selectMinimumBid: 'WAIOZ',
}
let validationSchema = yup.object().shape({
  typePutOnMarket: yup.string(),
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
    }),

  minimumBid: yup.string().when('typePutOnMarket', {
    is: (typePutOnMarket: string) => {
      return typePutOnMarket === 'timed-auction'
    },
    then: yup
      .string()
      .required('Minimum bid is required')
      .test('minimumBid', 'Minimum bid must be a number', (value: any) => {
        if (value) return /[0-9]+(\.[0-9]*)?$/.test(value) && !!parseFloat(value)
        else return false
      })
      .test('minimumBid', 'Minimum bid must be a positive number', (value: any) => {
        if (value) return /^[0-9]+(\.[0-9]*)?$/.test(value)
        else return false
      })
      .test('minimumBid', 'Just allow decimal 18', (value: any) => {
        if (value) return /^\d*(\.[0-9]{0,18})?$/.test(value)
        else return false
      })
      .test(
        'minimumBid',
        'Minimum bid must be smaller than price',
        (minimumBid?: any, values2?: any) => {
          return !(parseFloat(minimumBid) > parseFloat(values2.parent.price))
        }
      ),
  }),
  startingDate: yup.string().when('typePutOnMarket', {
    is: (typePutOnMarket: string) => {
      return typePutOnMarket === 'timed-auction'
    },
    then: yup.string().required('Starting date is required'),
  }),
  expirationDate: yup.string().when('typePutOnMarket', {
    is: (typePutOnMarket: string) => {
      return typePutOnMarket === 'timed-auction'
    },
    then: yup.string().required('Expiration date is required'),
  }),
  selectPrice: yup.string(),
  selectMinimumBid: yup.string(),
})
type Props = {
  handleCloseModal: () => void
  handleOpenModal: () => void
  open: boolean
  onSubmit: (values: FormSellNFT) => Promise<any>
}
const ModalSellNft = ({ handleCloseModal, handleOpenModal, onSubmit, open }: Props) => {
  const { isActive } = useWeb3React()
  const pageBlockContext = useContext(PageBlockContext)

  return (
    <Modal
      open={open}
      // onClose={() => {
      //   handleCloseModal()
      // }}
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
            Sell Your Item
          </Typography>

          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values) =>
              // toast
              //   .promise(onSubmit(values), {
              //     loading: 'Creating...',
              //     success: <b>Sell NFT success!</b>,
              //     error: <b>Sell NFT fail!</b>,
              //   })
              //   .finally(() => handleCloseModal())
              pageBlockContext
                ?.openPageBlock({
                  func: onSubmit(values),
                  text: 'Selling...',
                  success: 'Sell NFT success',
                  error: 'Sell NFT error!',
                })
                .finally(() => {
                  console.log('close')
                  handleCloseModal()
                })
            }
          >
            {({ values, setFieldValue }) => (
              <Form autoComplete='off'>
                {/* <Box component='pre' sx={{ position: 'fixed', top: '0', right: 0 }}>
                  {JSON.stringify({ values }, null, 4)}
                </Box> */}
                {/* Select type sell */}
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  sx={{ display: 'flex', flexDirection: 'row' }}
                >
                  {typePutOnMarkets &&
                    typePutOnMarkets.list.map((item, index) => (
                      <Box sx={{ marginBottom: '20px', marginRight: '30px' }} key={index}>
                        <SelectButton
                          size='small'
                          name={typePutOnMarkets.name}
                          value={item.value}
                          image={item.image}
                          typeImage={item.typeImage}
                          mainText={item.mainText}
                          isChecked={values.typePutOnMarket === item.value ? true : false}
                          setFieldValue={setFieldValue}
                        ></SelectButton>
                      </Box>
                    ))}
                </Box>
                {/* Price */}
                <InputGroup title='Price'>
                  <MyTextField
                    variant='standard'
                    name='price'
                    placeholder='Enter price for one piece'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <MySelectField
                            type='small'
                            name='selectPrice'
                            items={['WAIOZ', 'WETH', 'AWETH']}
                          ></MySelectField>
                        </InputAdornment>
                      ),
                    }}
                  ></MyTextField>
                </InputGroup>
                <Collapse in={values.typePutOnMarket === 'timed-auction'}>
                  {/* Minimum Bid */}
                  <InputGroup title='Minimum bid'>
                    <Stack>
                      <MyTextField
                        variant='standard'
                        name='minimumBid'
                        placeholder='Enter minimim bid'
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <MySelectField
                                type='small'
                                name='selectMinimumBid'
                                items={['WAIOZ', 'WETH', 'AWETH', 'TEST']}
                              ></MySelectField>
                            </InputAdornment>
                          ),
                        }}
                      ></MyTextField>
                      <Typography variant='subtitle1'>
                        Bids below this amount won’t be allowed
                      </Typography>
                    </Stack>
                  </InputGroup>

                  {/* Starting Date && End Time */}
                  <Stack direction='row'>
                    <InputGroup
                      sx={{ flex: 1, marginRight: '15px' }}
                      title='Starting Date'
                    >
                      <MySelectField
                        type='standard'
                        items={['Right after listing', '6 hours', '12 hours']}
                        name='startingDate'
                        values={values.startingDate}
                      ></MySelectField>
                    </InputGroup>
                    <InputGroup
                      sx={{ flex: 1, marginLeft: '15px' }}
                      title='Expiration Date'
                    >
                      <MySelectField
                        type='standard'
                        values={values.expirationDate}
                        items={['1 day', '1 week', '1 month', 'Set a specific time']}
                        name='expirationDate'
                      ></MySelectField>
                    </InputGroup>
                  </Stack>
                </Collapse>
                {/* Fee */}
                <Box>
                  <Typography variant='subtitle1' sx={{ display: 'inline-block' }}>
                    Service fee &nbsp;
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    sx={{
                      display: 'inline-block',
                      color: 'common.white',
                    }}
                  >
                    2.5%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='subtitle1' sx={{ display: 'inline-block' }}>
                    You will receive &nbsp;
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    sx={{
                      display: 'inline-block',
                      color: 'common.white',
                    }}
                  >
                    0 EHT 0
                  </Typography>
                </Box>
                <Stack alignItems='center' justifyContent='center'>
                  <Button
                    variant='contained'
                    color='primary'
                    size='medium'
                    sx={{ padding: '20px 140px', margin: '0', marginTop: '60px' }}
                    type='submit'
                  >
                    {values.typePutOnMarket === 'fixed-price' ? 'Sell' : 'Place a bid'}
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

export default ModalSellNft
