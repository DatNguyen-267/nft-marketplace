import { LayoutProps } from '@/models/common'

import { Box } from '@mui/material'
import Footer from './components/footer'
import Header from './components/header'

export function MainLayout({ children }: LayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        height: '100vh',
        margin: 0,
        padding: 0,
        color: 'common.white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header></Header>
      {children}
      <Footer></Footer>
    </Box>
  )
}
