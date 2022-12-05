import { Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactElement } from 'react'

type Props = {
  title: string
  subTitle?: string
  note?: string
  children: ReactElement
  size?: 'small' | 'medium' | 'large'
  sx?: any
  [key: string]: any
}

const InputGroup = ({ title, subTitle, note, children, sx, size, ...props }: Props) => {
  return (
    <Stack sx={{ margin: '20px 0', ...sx }} {...props}>
      <Box>
        <Typography
          variant={size === 'small' ? 'subtitle1' : 'h3'}
          sx={{ display: 'inline-block' }}
        >
          {title}
        </Typography>
        {note && (
          <Typography
            sx={{ display: 'inline-block', marginLeft: '12px' }}
            variant='body1'
          >
            ({note})
          </Typography>
        )}
        {subTitle && (
          <Typography variant='subtitle1' mt={1} color='myColor.cement'>
            {subTitle}
          </Typography>
        )}
      </Box>
      {children}
    </Stack>
  )
}

export default InputGroup
