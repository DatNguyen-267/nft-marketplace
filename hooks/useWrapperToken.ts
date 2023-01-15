import { MARKETPLACE_ABI, NFT_ABI, WBNB_ABI } from '@/constants/abi'
import { toWei } from '@/utils/convert'
import { useWeb3React } from '@web3-react/core'
import { ContractInterface, ethers } from 'ethers'
import { MARKETPLACE_ADDRESS, NFT_ADDRESS, wBNB_ADDRESS } from '../constants'
import useConnector from './connector'

const useWrapperToken = () => {
  const { isActive, provider, chainId } = useWeb3React()
  const { web3ReactHooks } = useConnector()
  const { useAccounts } = web3ReactHooks
  const accounts = useAccounts()

  async function exchangeTokenApprove(nftAddressGuy = MARKETPLACE_ADDRESS, wad: string) {
    if (provider && accounts) {
      try {
        const tokenContract = new ethers.Contract(
          wBNB_ADDRESS,
          WBNB_ABI,
          provider.getSigner()
        )
        const transaction = await tokenContract.approve(nftAddressGuy, toWei(wad))
        const transactionReceipt: any = await transaction.wait()
        console.log('approve receipt:', transactionReceipt)
        return transactionReceipt
      } catch (error) {
        throw error
      }
    } else throw new Error('Please connect wallet')
  }
  async function deposit(value: string) {
    if (provider && accounts) {
      try {
        const tokenContract = new ethers.Contract(
          wBNB_ADDRESS,
          WBNB_ABI,
          provider.getSigner()
        )
        const transaction = await tokenContract.deposit({
          value: ethers.utils.parseEther(value),
        })
        const transactionReceipt: any = await transaction.wait()
        console.log('deposit receipt:', transactionReceipt)
        return transactionReceipt
      } catch (error) {
        throw error
      }
    } else throw new Error('Please connect wallet')
  }
  return { exchangeTokenApprove, deposit }
}

export default useWrapperToken
