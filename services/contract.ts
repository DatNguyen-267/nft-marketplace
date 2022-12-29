import { ethers } from 'ethers'
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
      return balance.toString()
    } catch (error) {
      return '0'
    }
  },
  async getBalanceNativeToken(account: string) {
    try {
      if (!account) return '0'
      const provider = ContractService.getProvider()
      const balance = await provider.getBalance(account)
      console.log(balance.toString())
      return balance.toString()
    } catch (error) {
      return '0'
    }
  },
}
