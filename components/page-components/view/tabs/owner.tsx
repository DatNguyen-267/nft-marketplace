import { Profile } from '@/models/index'
import { truncateAddress } from '@/utils/convert'
import { FormatTime, getTimeWithFormat } from '@/utils/time'
import { Avatar, Box, Stack, Typography } from '@mui/material'
type Props = {
  profile: Profile
  [key: string]: any
}

const Owner = ({ profile, ...props }: Props) => {
  return (
    <Box {...props} paddingBottom={2} paddingRight={2}>
      <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
        <Stack direction='row' alignItems='center'>
          <Avatar
            sx={{ width: '40px', height: '40px' }}
            alt='Remy Sharp'
            src='/images/view/aioz_avatar.png'
          ></Avatar>
          <Box ml={1}>
            <Box>
              <Typography variant='subtitle1' component='span'>
                {profile && profile.displayName
                  ? profile.displayName
                  : truncateAddress(profile.walletAddress)}
              </Typography>
            </Box>
            <Box>
              {/* <Typography variant='body2' component='span' color='myColor.cement'>
                by{' '}
              </Typography>
              <Typography
                variant='subtitle1'
                component='span'
                color='myColor.white'
              ></Typography> */}
            </Box>
          </Box>
        </Stack>
        {/* <Typography variant='tinyBody' color='myColor.cement'></Typography> */}
      </Stack>
    </Box>
  )
}

export default Owner
