import { MARKETPLACE_ABI, NFT_ABI } from '@/constants/abi'
import { toWei } from '@/utils/convert'
import { useWeb3React } from '@web3-react/core'
import { NftApi } from 'apis'
import { ethers } from 'ethers'
import _ from 'lodash'
import { MARKETPLACE_ADDRESS, NFT_ADDRESS } from '../constants'
import { ContractService } from '../services'
import useConnector from './connector'

const useNFT = () => {
  const { isActive, provider, chainId, account } = useWeb3React()
  const { web3ReactHooks } = useConnector()
  const { useAccounts } = web3ReactHooks
  const accounts = useAccounts()

  async function mintNFT(addressTo: string = account as string, tokenUri: string) {
    if (provider && accounts) {
      console.log(provider)
      try {
        const nftContract = new ethers.Contract(
          NFT_ADDRESS,
          NFT_ABI,
          provider.getSigner()
        )
        const transaction = await nftContract.safeMint(addressTo, tokenUri)
        const transactionReceipt: any = await transaction.wait()
        console.log('mint receipt:', transactionReceipt)
        return transactionReceipt
      } catch (error) {
        throw error
      }
    } else throw new Error('Please connect wallet')
  }
  async function approve(spenderAddress = MARKETPLACE_ADDRESS, tokenId: string) {
    if (provider && accounts) {
      try {
        const tokenContract = new ethers.Contract(
          NFT_ADDRESS,
          NFT_ABI,
          provider.getSigner()
        )
        const transaction: any = await tokenContract.approve(spenderAddress, tokenId)
        const transactionReceipt: any = await transaction.wait()
        console.log('approve receipt:', transactionReceipt)
        console.log(transaction)
      } catch (error) {
        throw error
      }
    } else throw new Error('Please connect wallet')
  }
  async function getYourTokens() {
    if (account) {
      try {
        const tokenContract = new ethers.Contract(
          NFT_ADDRESS,
          NFT_ABI,
          ContractService.getProvider()
        )
        let listTokenId: number[] = []

        let tokenId = 0
        while (true) {
          try {
            const token = await tokenContract.ownerOf(tokenId)
            listTokenId.push(tokenId)
            tokenId++
          } catch (error) {
            break
          }
        }
        return listTokenId
      } catch (error) {
        throw error
      }
    }
  }
  async function getTokenUri(tokenId: number) {
    try {
      const tokenContract = new ethers.Contract(
        NFT_ADDRESS,
        NFT_ABI,
        ContractService.getProvider()
      )
      const tokenUri = await tokenContract.tokenURI(tokenId)
      return tokenUri
    } catch (error) {
      throw error
    }
  }

  return { mintNFT, approve, getYourTokens, getTokenUri }
}

export default useNFT
