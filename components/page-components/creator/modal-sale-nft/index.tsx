import SelectButton from '@/components/shared/button/select-button'
import InputGroup from '@/components/shared/input/input-group'
import MySelectField from '@/components/shared/input/my-select-field'
import MyTextField from '@/components/shared/input/my-text-field'
import { FormSellNFT } from '@/models/form'
import { StyledSvgIcon } from '@/styles/custome-mui'
import { ImagesCreatorPage } from '@/utils/images'
import { validatePrice } from '@/utils/_index'
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
const initialValues = {
  price: '',
  selectPrice: 'WBNB',
}
let validationSchema = yup.object().shape({
  price: yup.string().when(['putOnMarket', 'typePutOnMarket'], {
    is: (putOnMarket: boolean, typePutOnMarket: string) => putOnMarket,
    then: yup
      .string()
      .required('Price is required')
      .test(
        'price',
        'Price must be nagative number, greater than 0 and decimal 18',
        (value: any) => {
          return validatePrice(value)
        }
      ),
  }),
  selectPrice: yup.string(),
})
type Props = {
  handleCloseModal: () => void
  handleOpenModal: () => void
  open: boolean
  onSubmit: (tokenId: string, price: string) => Promise<any>
  tokenId: string
}
const ModalSellNft = ({
  handleCloseModal,
  handleOpenModal,
  onSubmit,
  open,
  tokenId,
}: Props) => {
  const { isActive } = useWeb3React()
  const pageBlockContext = useContext(PageBlockContext)
  return (
    <Modal
      open={open}
      // onClose={() => {
      //   handleCloseModal()
      // }}
      closeAfterTransition
      // BackdropComponent={Backdrop}
      // BackdropProps={{
      //   timeout: 500,
      // }}
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
            List Your Item
          </Typography>

          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values) =>
              pageBlockContext
                ?.openPageBlock({
                  func: onSubmit(tokenId, values.price),
                  text: 'Listing...',
                  success: 'List NFT success',
                  error: 'List NFT error!',
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

                {/* Price */}
                <InputGroup title='Price'>
                  <MyTextField
                    variant='standard'
                    name='price'
                    placeholder='Enter price for one piece'
                  ></MyTextField>
                </InputGroup>
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
                    List item
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
