import { Button } from '@mui/material'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  [key: string]: any
  sx?: any
}

const CloseButton = ({ children, sx, ...props }: Props) => {
  return (
    <Button
      {...props}
      variant="outlined"
      sx={{
        ...sx,
        minWidth: '100px',
        padding: '6px 24px',
        fontSize: '14px',
        color: 'myColor.grey',
        borderColor: 'myColor.grey',
        borderRadius: '10px',
        '&:hover': {
          color: 'common.white',
        },
      }}
    >
      {children}
    </Button>
  )
}

export default CloseButton
