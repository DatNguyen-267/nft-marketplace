import { Activity } from '@/models/index'
import { truncateAddress } from '@/utils/convert'
import { FormatTime, getTimeWithFormat } from '@/utils/time'
import { Avatar, Box, Stack, Typography } from '@mui/material'
type Props = {
  activity: Activity
  [key: string]: any
}

const ActivityNft = ({ activity, ...props }: Props) => {
  console.log(activity)
  return (
    <Box {...props} paddingBottom={2} paddingRight={2}>
      {activity && (
        <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
          <Stack direction='row' alignItems='center'>
            <Avatar
              sx={{ width: '40px', height: '40px' }}
              alt='Remy Sharp'
              src='/images/view/aioz_avatar.png'
            ></Avatar>
            <Box ml={1}>
              <Box>
                <Typography variant='body2' component='span'>
                  {activity.event}
                </Typography>{' '}
                <Typography variant='subtitle1' component='span'>
                  {activity.price} WAIOZ
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' component='span' color='myColor.cement'>
                  by{' '}
                </Typography>
                <Typography variant='subtitle1' component='span' color='myColor.white'>
                  {activity.profile && activity.profile.displayName
                    ? activity.profile.displayName
                    : truncateAddress(activity.by)}
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Typography variant='tinyBody' color='myColor.cement'>
            {getTimeWithFormat(activity.createdAt, FormatTime.format4)}
          </Typography>
        </Stack>
      )}
    </Box>
  )
}

export default ActivityNft
