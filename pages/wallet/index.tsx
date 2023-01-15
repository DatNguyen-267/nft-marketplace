import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { MainLayout } from '../../components/layout'
import { MARKETPLACE_ADDRESS, NFT_ADDRESS, WBNB_ABI, wBNB_ADDRESS } from '../../constants'
import { ContractService } from '../../services'
import TextField from '@mui/material/TextField'
import useWrapperToken from '@/hooks/useWrapperToken'
import { toast } from 'react-hot-toast'

const WalletPage = () => {
  const { account, isActive } = useWeb3React()
  const [nativeBalance, setNativeBalance] = useState<string>()
  const [wBNBBalance, setwBNBBalance] = useState<string>()
  const [depositValue, setDepositValue] = useState<string>('0')
  const { deposit } = useWrapperToken()

  const getNativeBalance = async () => {
    if (account && isActive) {
      const balance = await ContractService.getBalanceNativeToken(account)
      setNativeBalance(balance)
    }
  }
  const getWBNBBalance = async () => {
    if (account && isActive) {
      const balance = await ContractService.getBalanceOf(wBNB_ADDRESS, account, WBNB_ABI)
      setwBNBBalance(balance)
    }
  }
  useEffect(() => {
    if (account && isActive) {
      getNativeBalance()
      getWBNBBalance()
    }
  }, [account, isActive])
  const handleDeposit = async () => {
    if (parseFloat(depositValue) > 0) {
      try {
        const txReceipt = await deposit(depositValue)
        console.log(txReceipt)
        toast.success('Deposit success')
        if (account && isActive) {
          getNativeBalance()
          getWBNBBalance()
        }
      } catch (error) {
        toast.success('Deposit error')
      }
    } else {
      toast.success('Deposit value is not valid')
    }
  }
  return (
    <Container maxWidth='lg'>
      <Grid container columns={2}>
        {/* deposit */}
        <Grid item xs={1}>
          <Stack direction='row' spacing={1}>
            <TextField
              value={depositValue}
              onChange={(e) => setDepositValue(e.currentTarget.value)}
              name='deposit'
              variant='standard'
              color='primary'
              type={'number'}
              fullWidth
            />
            <Button
              variant='contained'
              size='small'
              sx={{
                px: 4,
                py: 1,
              }}
              onClick={handleDeposit}
            >
              Deposit
            </Button>
          </Stack>
        </Grid>

        {/* wallet info */}
        <Grid item xs={1}>
          <Stack alignItems='center' flexGrow={1}>
            <Stack
              alignItems='center'
              p={4}
              pl={4}
              pr={4}
              sx={{
                border: '1px solid',
                borderColor: 'grey',
                borderRadius: '50px',
              }}
            >
              <Typography variant='h5' color='text.secondary' textTransform='uppercase'>
                Your Address
              </Typography>
              <Typography variant='h3' fontWeight={400} color='text.primary' mt={1}>
                {account}
              </Typography>
              <Typography
                variant='h5'
                color='text.secondary'
                textTransform='uppercase'
                mt={4}
              >
                Native token balance
              </Typography>
              {/* <Typography variant='h3' fontWeight={700} color='text.secondary' mt={1}>
            {nativeBalance} Wei
          </Typography> */}
              <Typography variant='h3' fontWeight={700} color='pink' mt={1}>
                {nativeBalance ? ethers.utils.formatEther(nativeBalance).toString() : '0'}{' '}
                AIOZ
              </Typography>
              <Typography
                variant='h5'
                color='text.secondary'
                mt={4}
                textTransform='uppercase'
              >
                WBNB balance
              </Typography>
              {/* <Typography variant='h3' fontWeight={700} color='text.secondary' mt={1}>
            {wBNBBalance} Wei
          </Typography> */}
              <Typography variant='h3' fontWeight={700} color='pink' mt={1}>
                {wBNBBalance ? ethers.utils.formatEther(wBNBBalance).toString() : '0'}{' '}
                WBNB
              </Typography>
              <Typography
                variant='h5'
                color='text.secondary'
                mt={4}
                textTransform='uppercase'
              >
                Marketplace address
              </Typography>
              <Typography variant='h3' fontWeight={400} color='text.secondary' mt={1}>
                {MARKETPLACE_ADDRESS}
              </Typography>
              <Typography
                variant='h5'
                color='text.secondary'
                mt={4}
                textTransform='uppercase'
              >
                WBNB address
              </Typography>
              <Typography variant='h3' fontWeight={400} color='text.secondary' mt={1}>
                {wBNB_ADDRESS}
              </Typography>
              <Typography
                variant='h5'
                color='text.secondary'
                mt={4}
                textTransform='uppercase'
              >
                Your Collection (MyToken) address
              </Typography>
              <Typography variant='h3' fontWeight={400} color='text.secondary' mt={1}>
                {NFT_ADDRESS}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

WalletPage.Layout = MainLayout

export default WalletPage
