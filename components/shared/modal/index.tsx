import { Box } from '@mui/material'
import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  isOpen?: boolean
  handleOpen?: () => void
  handleClose?: () => void
}
const MyModal = ({ isOpen = false, children }: Props) => {
  return (
    <Box
      sx={{
        display: isOpen ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: '100vh',
        backgroundColor: 'red',
        zIndex: 999,
        opacity: '0.2',
      }}
    >
      <Box>{children ? children : <Box>Contetn</Box>}</Box>
    </Box>
  )
}

export default MyModal
