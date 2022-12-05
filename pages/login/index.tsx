import DiretionButton from '@/components/shared/button/direction-button'
import { MainLayout } from '@/components/layout'
import { hooks } from '@/connectors/coinbaseWallet'
import { ImagesWallet } from '@/utils/images'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Button, Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useWeb3React } from '@web3-react/core'
import MetaMaskCard from '../../components/page-components/login/connector-card/MetaMaskCard'
import CoinbaseWalletCard from '../../components/page-components/login/connector-card/CoinbaseWalletCard'
import WalletConnectCard from '../../components/page-components/login/connector-card/WalletConnectCard'
import { getName } from './utils'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AppContext } from 'context/app-context'
type Props = {}

const LIST_WALLET = [
  {
    name: 'CoinBase Wallet',
    icon: ImagesWallet.CoinBase,
  },
  {
    name: 'MetaMask',
    icon: ImagesWallet.MetaMask,
  },
  {
    name: 'Wallet Connect',
    icon: ImagesWallet.WalletConnect,
  },
]
const Login = (props: Props) => {
  const router = useRouter()
  const [isDelay, setIsdelay] = useState<boolean>(false)

  const { accounts, isActive } = useWeb3React()
  useEffect(() => {
    const id = setTimeout(() => {
      setIsdelay((prev) => true)
    }, 500)
    return () => {
      if (id) clearTimeout(id)
    }
  }, [])

  const handleProtect = async () => {
    if (accounts && isActive && router.pathname === '/login') {
      if (router.query && router.query.from) {
        await router.push(`/${router.query.from.toString()}`)
      } else await router.push('/')
    }
  }
  useLayoutEffect(() => {
    handleProtect()
  }, [router, accounts, isActive])
  return (
    <>
      {!isDelay && <Box></Box>}
      {isDelay && (
        <Box>
          <Container
            maxWidth='lg'
            sx={{ display: 'flex', alignItems: 'center', marginBottom: '60px' }}
          >
            <DiretionButton text='Go back' href='/' icon={<KeyboardBackspaceIcon />} />
          </Container>

          <Container maxWidth='lg'>
            <Box sx={{ marginLeft: { lg: '1rem' }, marginBottom: '32px' }}>
              <Typography variant='h1' sx={{ marginBottom: '16px' }}>
                Sign In
              </Typography>
              <Typography variant='body1' sx={{ maxWidth: '600px' }}>
                Choose one of available wallet providers to connect.
              </Typography>
            </Box>
            <Box sx={{ margin: '0 38px' }}>
              <Grid
                container
                columnSpacing='29px'
                rowSpacing={{ xs: '29px', md: '29', lg: '0' }}
                justifyContent='space-around'
              >
                <Grid item xs={12} md={6} lg={4}>
                  <MetaMaskCard></MetaMaskCard>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <CoinbaseWalletCard></CoinbaseWalletCard>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <WalletConnectCard></WalletConnectCard>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '50px',
            }}
          >
            <Button variant='outlined' color='primary' sx={{ padding: '15px 35px' }}>
              Show More Option
            </Button>
          </Container>
        </Box>
      )}
    </>
  )
}

Login.Layout = MainLayout
export default Login
