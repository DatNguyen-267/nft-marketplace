import { hooks as coinbaseHooks, coinbaseWallet } from '@/connectors/coinbaseWallet'
import { hooks as metaMaskHooks, metaMask } from '@/connectors/metaMask'
import { hooks as walletConnetHooks, walletConnect } from '@/connectors/walletConnect'
import { useAppSelector } from '@/redux/hook'
import { authActions } from '@/redux/slices/auth'
import { LocalStorageServices } from '@/services/local-storage'
import { useWeb3React, Web3ReactHooks } from '@web3-react/core'
import { getName } from 'pages/login/utils'
import { createContext, useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
type Props = {
  children: any
}
interface IAppContext {
  tryConnectWalelt: boolean
}
export const AppContext = createContext<IAppContext | null>(null)

const AppContextWapper = ({ children }: Props) => {
  const [tryConnectWalelt, setTryConnectWalelt] = useState<boolean>(false)
  const { connector, accounts, isActive, chainId } = useWeb3React()

  const auth = useAppSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleTryConnectWallet = async () => {
    dispatch(authActions.checkStatus())
    const check = LocalStorageServices.isLogged()
    if (check) {
      metaMask.connectEagerly().catch((error) => {})
      coinbaseWallet.connectEagerly().catch((error) => {})
      walletConnect.connectEagerly().catch((error) => {})
    }
  }
  useLayoutEffect(() => {
    // attempt to connect eagerly on mount
    handleTryConnectWallet()
  }, [])

  return (
    <AppContext.Provider value={{ tryConnectWalelt }}>{children}</AppContext.Provider>
  )
}

export default AppContextWapper
