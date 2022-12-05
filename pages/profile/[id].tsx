import { MainLayout } from '@/components/layout'
import ProfileForm from '@/components/page-components/profile/form'
import { ProfileContext } from '@/context/profile-context'
import { ProfileFormData } from '@/models/profile'
import { SUPPORT_IMG } from '@/utils/file'
import { Validation } from '@/utils/validation'
import {
  Avatar,
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { ProfileApi } from 'apis/profile'
import { Form, Formik, yupToFormErrors } from 'formik'
import React, { memo, useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import * as yup from 'yup'

type Props = {}
const validationSchema = yup.object().shape({
  displayName: yup.string().required('Display name is required'),
  customUrl: yup.string(),
  bio: yup.string(),
  twitterUsername: yup.string(),
  personalSiteOrPortfolio: yup.string(),
  email: yup.string(),
  file: Validation.file,
})
const initialValues = {
  displayName: '',
  file: null,
  customUrl: '',
  bio: '',
  twitterUsername: '',
  personalSiteOrPortfolio: '',
  email: '',
}
const ProfileUser = (props: Props) => {
  const [fileReview, setFileReview] = useState<string>()
  const profile = useContext(ProfileContext)
  const { account } = useWeb3React()

  const onSubmit = async (values: any) => {
    if (account && profile) {
      let newProfile: ProfileFormData = {
        ...values,
        walletAddress: account,
      }
      try {
        const updateProfile = await ProfileApi.putProfile(newProfile)
        console.log(updateProfile)
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <Container maxWidth='md'>
      <Box>
        <Typography variant='h1'>Edit profile</Typography>
        <Typography variant='body1'>
          You can set preferred display name, create your branded profile URL and manage
          other personal settings
        </Typography>
      </Box>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values) => {
          onSubmit(values)
        }}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          setFieldError,
          handleChange,
          handleBlur,
        }) => (
          <Form>
            {/* <Box component='pre' sx={{ position: 'fixed', top: 0, right: 0 }}>
              {JSON.stringify({ values, errors, touched }, null, 4)}
            </Box> */}
            <Grid container columns={10} mt={7}>
              <Grid item xs={4}>
                <Typography variant='h3' mb={4}>
                  Profile picture
                </Typography>
                <Box
                  sx={{
                    width: '76%',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      paddingTop: '100%',
                      width: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='center'
                      sx={{
                        borderRadius: '100%',
                        backgroundColor: 'myColor.grey',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                      }}
                    >
                      <Typography
                        variant='h3'
                        textAlign='center'
                        color='black'
                        sx={{
                          maxWidth: '68%',
                        }}
                      >
                        We recommend an image of at least 400x400. Gifs work too.
                      </Typography>
                    </Stack>
                    {fileReview && (
                      <Avatar
                        src={fileReview}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                          width: '100%',
                          height: '100%',
                        }}
                      ></Avatar>
                    )}
                  </Box>
                  <Stack direction='row' justifyContent='center' mt={4}>
                    <UploadComponentMemorized
                      setFieldValue={setFieldValue}
                      setFieldError={setFieldError}
                      setFieldTouched={setFieldTouched}
                      setFileReview={setFileReview}
                    />
                  </Stack>
                  <Stack direction='row' justifyContent='center' mt={1 / 4}>
                    {errors.file && touched.file && (
                      <FormHelperText error={true}>{errors.file}</FormHelperText>
                    )}
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <ProfileForm />
                <Stack direction='row' justifyContent='center'>
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{
                      padding: '16px 106px',
                      marginTop: 60 / 8,
                    }}
                  >
                    Update profile
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

const UploadComponent = (props: any) => {
  const { setFieldValue, setFieldTouched, setFieldError, setFileReview } = props
  const { acceptedFiles, getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    maxSize: 100000000,
    accept: {
      'image/png': SUPPORT_IMG,
    },
    onError: (error) => {
      setFieldError('file', 'The collectible image must be PNG, GIF, WEBP, MP4 or MP3')
    },
    onDropAccepted: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        setFieldValue('file', acceptedFiles[0])

        let blob = new Blob([acceptedFiles[0]])
        const srcPreview = URL.createObjectURL(blob)
        setFileReview(() => srcPreview)
      }
    },
    onDropRejected(fileRejections, event) {
      if (fileRejections) {
        console.log(fileRejections)
        setFieldError('file', 'The collectible image must be PNG, GIF, WEBP, MP4 or MP3')
        setFieldTouched('file', true)
      }
    },
  })
  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
      <Button
        variant='contained'
        color='secondary'
        sx={{
          padding: '16px 30px',
        }}
        onClick={open}
      >
        Choose image
      </Button>
    </Box>
  )
}
const UploadComponentMemorized = memo(UploadComponent)
ProfileUser.Layout = MainLayout
export default ProfileUser
