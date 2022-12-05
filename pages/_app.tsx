import { EmptyLayout } from '@/components/layout'
import { LayoutProps } from '@/models/index'
import createEmotionCache from '@/utils/create-emotion-cache'
import theme from '@/utils/theme'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import DialogContextWapper from 'context/dialog-context'
import ProfileContextWapper from 'context/profile-context'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ReactElement, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'
import ProtectRouter from './protect-router'

import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import { coinbaseWallet, hooks as coinbaseWalletHooks } from '@/connectors/coinbaseWallet'
import { hooks as metaMaskHooks, metaMask } from '@/connectors/metaMask'
import { hooks as networkHooks, network } from '@/connectors/network'
import { hooks as walletConnectHooks, walletConnect } from '@/connectors/walletConnect'
import AppContextWapper from 'context/app-context'
import SwitchNetworkModal from '@/components/shared/modal/switch-network'
import PageBlockContextWapper from 'context/page-block-context'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
nProgress.configure({ showSpinner: false })
const clientSideEmotionCache = createEmotionCache()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: (props: LayoutProps) => ReactElement
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}
const TopProgressBar = dynamic(
  () => {
    return import('@/components/shared/progress-bar/TopProgressBar')
  },
  { ssr: false }
)

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  const [fisrtLoad, setFisrtLoad] = useState(true)
  useEffect(() => {
    setFisrtLoad(false)
  }, [])

  if (fisrtLoad) {
    return <div></div>
  }

  const connectors: [
    MetaMask | WalletConnect | CoinbaseWallet | Network,
    Web3ReactHooks
  ][] = [
    [metaMask, metaMaskHooks],
    [walletConnect, walletConnectHooks],
    [coinbaseWallet, coinbaseWalletHooks],
    [network, networkHooks],
  ]

  return (
    <Provider store={store}>
      <Web3ReactProvider connectors={connectors}>
        <CacheProvider value={emotionCache}>
          <TopProgressBar />
          {/* Context */}
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppContextWapper>
              <PageBlockContextWapper>
                <ProfileContextWapper>
                  <ProtectRouter />
                  {/*  */}
                  <Toaster position='top-center' reverseOrder={false} />
                  <DialogContextWapper>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </DialogContextWapper>

                  {/* Modal */}
                  <SwitchNetworkModal />
                  {/* <LoginModal /> */}
                </ProfileContextWapper>
              </PageBlockContextWapper>
            </AppContextWapper>
          </ThemeProvider>
        </CacheProvider>
      </Web3ReactProvider>
    </Provider>
  )
}

export default MyApp
