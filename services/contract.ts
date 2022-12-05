import { useWeb3React } from '@web3-react/core'
import { ethers, ContractInterface } from 'ethers'
import { MARKETPLACE_ADDRESS, NETWORK } from '../constants'

export const ContractService = {
  getContract(contractAddress: string, contractAbi: any) {
    let provider = new ethers.providers.JsonRpcProvider(NETWORK)
    const contract = new ethers.Contract(contractAddress, contractAbi, provider)
    return contract
  },
  getProvider() {
    return new ethers.providers.JsonRpcProvider(NETWORK)
  },
  async getBalanceOf(collectionAddress: string, walletAddress: string, abi?: any) {
    try {
      const contract = ContractService.getContract(
        collectionAddress,
        abi ? abi : MARKETPLACE_ADDRESS
      )
      const balance = await contract.balanceOf(walletAddress)
      return balance.toNumber()
    } catch (error) {
      throw error
    }
  },
}
