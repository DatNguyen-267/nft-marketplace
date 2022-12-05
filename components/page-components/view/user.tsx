import { Avatar, Box, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'

type Props = {
  title: string
  name: string
  [key: string]: any
}

const User = ({ title, name, ...props }: Props) => {
  return (
    <Stack direction='row' alignItems='center' {...props}>
      <Avatar
        sx={{ width: '40px', height: '40px' }}
        alt='Remy Sharp'
        src='/images/view/aioz_avatar.png'
      ></Avatar>
      <Box ml={1}>
        <Typography variant='body2' mb={1 / 4}>
          {title}
        </Typography>
        <Typography variant='subtitle1'>{name}</Typography>
      </Box>
    </Stack>
  )
}

export default User
