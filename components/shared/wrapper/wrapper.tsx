import React, { ReactNode } from 'react'
import { Stack, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'

type Props = {
  children: ReactNode
  isChecked?: boolean
}

export const Wrapper = ({ children, isChecked }: Props) => {
  return (
    <Box
      sx={{
        border: '2px solid',
        borderColor: `${isChecked ? 'primary.main' : 'border.main'}`,
        borderRadius: '12px',
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'primary.main',
        },
      }}
    >
      {children}
    </Box>
  )
}
