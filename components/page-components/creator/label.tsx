import { Box, Typography } from '@mui/material'
import React, { ReactNode } from 'react'
type Props = {
  children: ReactNode
}
const NftLabel = ({ children }: Props) => {
  return (
    <Box
      sx={{
        padding: '1px 10px',
        border: '1px solid',
        backgroundColor: '#C80000',
        borderColor: '#C80000',
        borderRadius: '3px',
      }}
    >
      <Typography variant="body2" color="common.white">
        {children}
      </Typography>
    </Box>
  )
}

export default NftLabel
