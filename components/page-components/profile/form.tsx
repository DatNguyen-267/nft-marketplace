import InputGroup from '@/components/shared/input/input-group'
import MySelectField from '@/components/shared/input/my-select-field'
import MyTextField from '@/components/shared/input/my-text-field'
import { StyledSvgIcon } from '@/styles/custome-mui'
import { Icon } from '@/utils/images'
import {
  Box,
  Button,
  ButtonBase,
  Grid,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'

type Props = {}

const ProfileForm = (props: Props) => {
  return (
    <Box>
      <InputGroup title='Display Name' sx={{ marginTop: '0' }}>
        <Stack>
          <MyTextField
            variant='standard'
            name='displayName'
            placeholder='Enter price for one piece'
            InputProps={{
              endAdornment: <Box></Box>,
            }}
          ></MyTextField>
        </Stack>
      </InputGroup>

      <InputGroup title='Custom URL' sx={{ margin: '0', marginTop: '40px' }}>
        <Stack>
          <MyTextField
            variant='standard'
            name='customUrl'
            placeholder=' Enter your custom URL'
            InputProps={{
              startAdornment: (
                <Typography variant='subtitle1' color='myColor.forgy'>
                  Rarible.com/{' '}
                </Typography>
              ),
            }}
          ></MyTextField>
        </Stack>
      </InputGroup>

      <InputGroup title='Bio' sx={{ margin: '0', marginTop: '40px' }}>
        <Stack>
          <MyTextField
            variant='standard'
            name='bio'
            placeholder='Tell about yourself in a few words'
            InputProps={{
              endAdornment: <Box></Box>,
            }}
          ></MyTextField>
        </Stack>
      </InputGroup>

      <InputGroup
        sx={{ margin: '0', marginTop: '40px' }}
        title='Twitter Username'
        subTitle='Link your Twitter account to gain more trust on the marketplace'
      >
        <Stack>
          <MyTextField
            variant='standard'
            name='twitterUsername'
            placeholder='Enter price for one piece'
            InputProps={{
              startAdornment: <Typography>@ </Typography>,
              endAdornment: (
                <Button variant='text'>
                  <Typography variant='subtitle1' color='primary'>
                    LINK
                  </Typography>
                </Button>
              ),
            }}
          ></MyTextField>
        </Stack>
      </InputGroup>

      <InputGroup
        title='Personal site or portfolio'
        sx={{ margin: '0', marginTop: '40px' }}
      >
        <Stack>
          <MyTextField
            variant='standard'
            name='personalSiteOrPortfolio'
            placeholder='Enter price for one piece'
            InputProps={{
              startAdornment: <Typography>https://</Typography>,
            }}
          ></MyTextField>
        </Stack>
      </InputGroup>

      <InputGroup
        title='Email'
        subTitle='Your email for marketplace notifications'
        sx={{ margin: '0', marginTop: '40px' }}
      >
        <Stack>
          <MyTextField
            variant='standard'
            name='email'
            placeholder='Hidden email'
            InputProps={{
              endAdornment: (
                <ButtonBase>
                  <StyledSvgIcon
                    component={Icon.Lock}
                    sx={{
                      margin: '0 12px',
                      width: '12px',
                      height: '15px',
                      cursor: 'pointer',
                    }}
                  ></StyledSvgIcon>
                </ButtonBase>
              ),
            }}
          ></MyTextField>
        </Stack>
      </InputGroup>
      <Stack direction='row' alignItems='baseline'>
        <Typography variant='subtitle1' mt={1} color='myColor.cement' component='span'>
          You must sign message to view or manage your email. &nbsp;
        </Typography>
        <Button variant='text' sx={{ margin: '0', padding: '0' }}>
          <Typography variant='subtitle1' color='primary' component='span'>
            Sign message
          </Typography>
        </Button>
      </Stack>

      <Box mt={5}>
        <Typography variant='h3'>Verification</Typography>
        <Grid container columns={10}>
          <Grid item xs={7}>
            <Typography variant='subtitle1' mt={1} color='myColor.cement'>
              Proceed with verification process to get more visibility and gain trust on
              Rarible Marketplace. Please allow up to several weeks for the process
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}
          >
            <Button
              variant='contained'
              color='secondary'
              sx={{
                padding: '14px 30px',
              }}
            >
              Get verified
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default ProfileForm
