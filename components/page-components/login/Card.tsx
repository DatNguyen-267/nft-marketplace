import { getAddChainParameters } from '@/connectors/chains'
import { Box, ButtonBase, Stack, Typography } from '@mui/material'
import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { Web3ReactHooks } from '@web3-react/core'
import { GnosisSafe } from '@web3-react/gnosis-safe'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import Image from 'next/image'
import { getName } from '../../../pages/login/utils'
import { Accounts } from './Accounts'
import { Chain } from './Chain'
import { ConnectWithSelect } from './ConnectWithSelect'
import { Status } from './Status'
import React from 'react'
import toast from 'react-hot-toast'
import { fail } from 'assert'
import { useAppDispatch } from '@/redux/hook'
import { authActions } from '@/redux/slices/auth'
interface Props {
  connector: MetaMask | WalletConnect | CoinbaseWallet | Network | GnosisSafe
  chainId: ReturnType<Web3ReactHooks['useChainId']>
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActive?: ReturnType<Web3ReactHooks['useIsActive']>
  error?: Error | undefined
  setError: (error: Error | undefined) => void
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>
  provider?: ReturnType<Web3ReactHooks['useProvider']>
  accounts?: string[]
  icon: any
}

function Card({ connector, chainId, isActivating, setError, icon }: Props) {
  const dispatch = useAppDispatch()
  return (
    <ButtonBase
      sx={{
        borderRadius: '12px',
        backgroundColor: 'secondary.main',
        width: '100%',
        height: '100%',
      }}
      onClick={() => {
        isActivating
          ? undefined
          : connector instanceof GnosisSafe
          ? void connector
              .activate()
              .then(() => {
                setError(undefined)
                dispatch(authActions.login())
              })
              .catch((error) => toast.error(error.message))
          : connector instanceof WalletConnect || connector instanceof Network
          ? connector
              .activate(chainId !== 4102 ? undefined : chainId)
              .then(() => {
                setError(undefined)
                dispatch(authActions.login())
              })
              .catch((error) => toast.error(error.message))
          : connector
              .activate(getAddChainParameters(4102))
              .then(() => {
                setError(undefined)
                dispatch(authActions.login())
              })
              .catch((error) => toast.error(error.message))
      }}
    >
      {/* 4001  User rejected the request.*/}
      <Stack
        direction='column'
        alignItems='center'
        justifyContent='center'
        padding='50px'
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '120px',
          }}
        >
          <Image src={icon} alt='aioz-wallet'></Image>
        </Box>
        <Typography variant='h2' mt='20px' noWrap>
          {getName(connector)}
        </Typography>
        {/* <Chain chainId={chainId} /> */}
      </Stack>
    </ButtonBase>
  )
}
export default React.memo(Card)
