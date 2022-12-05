import { NFTStorage } from 'nft.storage'
import { MARKETPLACE_ABI, STORAGE_API_KEY } from '../constants'
import { ContractService } from './contract'
interface IPFS_REQEST {
  image: globalThis.Blob
  name: string
  description: string
}
export const NftService = {
  async createMetadata(
    file: File,
    title: string,
    description: string,
    NFT_STORAGE_API_KEY: string = STORAGE_API_KEY
  ) {
    try {
      const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
      const img = new Blob([file])
      const data: IPFS_REQEST = {
        image: img,
        name: title,
        description,
      }
      const cid = await client.store(data)
      return cid.url
    } catch (error) {
      throw error
    }
  },
  async getTokenUri(
    collectionAddress: string,
    tokenId: number,
    abi: any = MARKETPLACE_ABI
  ) {
    try {
      const contract = ContractService.getContract(collectionAddress, abi)
      const tokenUri: string = await contract.tokenURI(tokenId)
      return tokenUri
    } catch (error) {
      throw error
    }
  },
  async getOwner(collectionAddress: string, tokenId: number, abi: any = MARKETPLACE_ABI) {
    try {
      const contract = ContractService.getContract(collectionAddress, abi)
      const ownerAddress = await contract.ownerOf(tokenId)
      return ownerAddress
    } catch (error) {
      throw error
    }
  },
  async getCollectionName(collectionAddress: string, abi: any = MARKETPLACE_ABI) {
    try {
      const contract = ContractService.getContract(collectionAddress, abi)
      const collectionName = await contract.name()
      return collectionName
    } catch (error) {
      throw error
    }
  },
  async buyItem(
    tokenId: number,
    price: string,
    collectionAddress: any,
    abi: any = MARKETPLACE_ABI
  ) {
    const contract = ContractService.getContract(collectionAddress, abi)
    console.log(contract)
    const res = await contract.createMarketSale(tokenId)
    const approvalTxReceipt = await res?.wait()
    console.log(approvalTxReceipt)
  },
}
