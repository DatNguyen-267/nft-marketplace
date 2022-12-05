import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { ImagesWallet } from '@/utils/images'
import { useWeb3React } from '@web3-react/core'
import { getAddChainParameters, SUPORT_CHAIN_IDs } from '@/connectors/chains'
import useConnector from '@/hooks/connector'
import { GnosisSafe } from '@web3-react/gnosis-safe'
import { WalletConnect } from '@web3-react/walletconnect'
import { Network } from '@web3-react/network'
import toast from 'react-hot-toast'
import { MetaMask } from '@web3-react/metamask'
import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
type Props = {
  // open: boolean
}

const SwitchNetworkModal = ({}: Props) => {
  const Icon = ImagesWallet.MetaMask
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const { accounts, chainId, isActive, connector, isActivating } = useWeb3React()

  useEffect(() => {
    if (chainId && accounts && isActive && !SUPORT_CHAIN_IDs.includes(chainId)) {
      handleOpen()
    } else {
      handleClose()
    }
  }, [chainId])

  return (
    <Box>
      <Dialog aria-labelledby='customized-dialog-title' open={open}>
        <Box sx={{ padding: 3 }}>
          <DialogTitle>
            <Stack direction='column' alignItems='center'>
              <Typography variant='h1'>Wrong Network</Typography>
              <Typography variant='body1' sx={{ marginTop: '20px' }}>
                Currently this page only supported in AIOZ Network
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  marginTop: '12px',
                  // , color: 'warning.main'
                }}
              >
                Please switch your network to continue.
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Stack direction='column' alignItems='center' mt={4}>
              <Button
                variant='contained'
                sx={{
                  padding: '10px 0',
                  fontSize: '14px',
                  width: '70%',
                  // maxWidth: '250px',
                  marginBottom: '12px',
                }}
                onClick={() => {
                  isActivating
                    ? undefined
                    : connector instanceof GnosisSafe
                    ? void connector
                        .activate()
                        .then(() => toast.success('Connected!'))
                        .catch((error) => toast.error(error.message))
                    : connector instanceof WalletConnect || connector instanceof Network
                    ? connector
                        .activate(chainId !== 4102 ? undefined : chainId)
                        .then(() => toast.success('Connected!'))
                        .catch((error) => toast.error(error.message))
                    : connector instanceof MetaMask || connector instanceof CoinbaseWallet
                    ? connector
                        .activate(getAddChainParameters(4102))
                        .then(() => toast.success('Connected!'))
                        .catch((error: any) =>
                          error.code === -32002
                            ? toast.error(
                                'Request already pending, please open your wallet to switch network'
                              )
                            : toast.error(error.message)
                        )
                    : undefined
                }}
              >
                Switch Network
              </Button>
              <Typography variant='body1'> Or </Typography>
              <Button
                variant='outlined'
                sx={{
                  padding: '10px 0',
                  fontSize: '14px',
                  width: '70%',
                  // maxWidth: '250px',
                  marginBottom: '12px',
                  marginTop: '12px',
                }}
                onClick={() => {
                  if (connector && connector.deactivate) {
                    void connector.deactivate()
                  } else {
                    void connector.resetState()
                  }
                }}
              >
                Disconect
              </Button>
            </Stack>
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  )
}

export default SwitchNetworkModal
