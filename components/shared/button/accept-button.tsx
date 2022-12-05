import { Button } from '@mui/material'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  [key: string]: any
  sx?: any
}

const AcceptButton = ({ sx, children, ...props }: Props) => {
  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        ...sx,
        minWidth: '100px',
        fontSize: '14px',
        padding: '6px 24px',
        borderRadius: '10px',
        margin: 0,
        '&:hover': {
          color: 'common.white',
        },
      }}
    >
      {children}
    </Button>
  )
}

export default AcceptButton
