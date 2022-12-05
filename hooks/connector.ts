import { useWeb3React, Web3ReactHooks } from '@web3-react/core'
import { getName } from 'pages/login/utils'
import React, { useLayoutEffect, useState } from 'react'
import { hooks as coinbaseHooks, coinbaseWallet } from '@/connectors/coinbaseWallet'
import { hooks as metaMaskHooks, metaMask } from '@/connectors/metaMask'
import { hooks as walletConnetHooks, walletConnect } from '@/connectors/walletConnect'

const useConnector = () => {
  const [web3ReactHooks, setWeb3ReactHooks] = useState<Web3ReactHooks>(metaMaskHooks)
  const { connector } = useWeb3React()
  useLayoutEffect(() => {
    if (connector) {
      const connectorName = getName(connector)
      if (connectorName === 'MetaMask') setWeb3ReactHooks(metaMaskHooks)
      else if (connectorName === 'Coinbase Wallet') setWeb3ReactHooks(coinbaseHooks)
      else if (connectorName === 'WalletConnect') setWeb3ReactHooks(walletConnetHooks)
    }
  }, [connector])
  return { web3ReactHooks }
}

export default useConnector
