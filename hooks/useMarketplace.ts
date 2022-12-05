import { toWei } from '@/utils/convert'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { MARKETPLACE_ABI, MARKETPLACE_ADDRESS, NFT_ADDRESS } from '../constants'
import { ContractService } from '../services'
import useConnector from './connector'
import useNFT from './useNFT'
import useWrapperToken from './useWrapperToken'

const useMarketplace = () => {
  const { isActive, provider, chainId, account } = useWeb3React()
  const { web3ReactHooks } = useConnector()
  const { useAccounts } = web3ReactHooks
  const accounts = useAccounts()
  const { approve } = useNFT()
  const { exchangeTokenApprove } = useWrapperToken()
  async function createAskOrder(
    collectionAddress: string = NFT_ADDRESS,
    tokenId: string,
    price: string
  ) {
    if (provider && account) {
      try {
        const marketContract = new ethers.Contract(
          MARKETPLACE_ADDRESS,
          MARKETPLACE_ABI,
          provider.getSigner()
        )
        try {
          console.log('approve')
          const recieptApprove: any = await approve(MARKETPLACE_ADDRESS, tokenId)
          console.log(recieptApprove)
        } catch (error) {
          throw error
        }

        const transaction = await marketContract.createAskOrder(
          collectionAddress,
          parseInt(tokenId),
          toWei(price)
        )
        const transactionReceipt: any = await transaction.wait()
        console.log('createAskOrder Receipt:', transactionReceipt)
        return transactionReceipt
      } catch (error) {
        throw error
      }
    } else throw new Error('Please connect wallet')
  }
  async function buyTokenUsingWBNB(
    collectionAddress: string = NFT_ADDRESS,
    tokenId: string,
    price: string
  ) {
    if (provider && account && tokenId && price) {
      try {
        const marketContract = new ethers.Contract(
          MARKETPLACE_ADDRESS,
          MARKETPLACE_ABI,
          provider.getSigner()
        )
        // try {
        //   console.log('approve NFT')
        //   const recieptApprove: any = await approve(MARKETPLACE_ADDRESS, tokenId)
        //   console.log(recieptApprove)
        // } catch (error) {
        //   throw error
        // }
        try {
          console.log('approve CURRENCY EXCHANGE')
          const recieptApprove: any = await exchangeTokenApprove(
            MARKETPLACE_ADDRESS,
            price
          )
          console.log(recieptApprove)
        } catch (error) {
          throw error
        }
        console.log(collectionAddress)
        console.log(parseInt(tokenId))
        console.log(price)
        const transaction = await marketContract.buyTokenUsingWBNB(
          collectionAddress,
          parseInt(tokenId),
          price
        )
        const transactionReceipt: any = await transaction.wait()
        console.log('buyTokenUsingWBNB Receipt:', transactionReceipt)
        return transactionReceipt
      } catch (error) {
        throw error
      }
    } else throw new Error('Please connect wallet')
  }
  async function viewAsksByCollection(
    collectionAddress: string = NFT_ADDRESS,
    cursor: number = 0,
    size: number = 10
  ) {
    try {
      const marketContract = new ethers.Contract(
        MARKETPLACE_ADDRESS,
        MARKETPLACE_ABI,
        ContractService.getProvider()
      )
      const asks = await marketContract.viewAsksByCollection(
        collectionAddress,
        cursor,
        size
      )
      return asks
    } catch (error) {
      throw error
    }
  }
  async function viewAsksByCollectionAndSeller(
    collectionAddress: string = NFT_ADDRESS,
    sellerAdress: string = account as string,
    cursor: number = 0,
    size: number = 10
  ) {
    if (provider && account) {
      try {
        const marketContract = new ethers.Contract(
          MARKETPLACE_ADDRESS,
          MARKETPLACE_ABI,
          provider.getSigner()
        )
        const asks = await marketContract.viewAsksByCollectionAndSeller(
          collectionAddress,
          sellerAdress,
          cursor,
          size
        )
        return asks
      } catch (error) {
        throw error
      }
    } else throw new Error('Please connect wallet')
  }
  return {
    createAskOrder,
    buyTokenUsingWBNB,
    viewAsksByCollection,
    viewAsksByCollectionAndSeller,
  }
}

export default useMarketplace
