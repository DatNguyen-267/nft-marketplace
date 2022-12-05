import { Profile } from './profile'
import { Bid, Order } from './order'
import { IPFS, NftMetadata } from './ipfs'

export type NFTTags = [
  'Art' | 'Sports' | 'Unity' | 'Virtual Worlds' | 'Trading Cards' | 'Collectibles'
]
export type Tag =
  | 'Art'
  | 'Sports'
  | 'Unity'
  | 'Virtual Worlds'
  | 'Trading Cards'
  | 'Collectibles'
export const TAGS: Tag[] = [
  'Art',
  'Sports',
  'Unity',
  'Virtual Worlds',
  'Trading Cards',
  'Collectibles',
]
export type Status = 'Sale' | 'Acquire' | 'Minted'
export interface CreateNftData {
  erc721Token?: string
  erc721TokenId?: number
  erc1155Token?: string
  erc1155TokenId?: number
  isPutOnMarket?: boolean
  price?: string
  title: string
  description?: string
  file: File
  txHash?: string
  status: Status
  tags: NFTTags
}

export interface Nft {
  _id: string
  cltAddress: string
  createdAt: number
  creator: string
  erc721Token?: string
  erc721TokenId?: number
  isAcquired: boolean
  isPutOnMarket?: boolean
  price?: string
  status: Status
  tags: NFTTags
  title: string
  tokenId: number
  description?: string
  type: string
  viewsCount: number
  _v: number
}
export interface IpfsNftData {
  description?: string
  image: string
  name: string
  [key: string]: any
}
export interface ExtendOrder {
  order: Order
  profile?: Profile
}

export interface NftData {
  bid?: Bid
  orderBids?: Order[]
  order?: Order
  nft: Nft
  NftMetadata?: NftMetadata
  profileUserBids?: Profile[]
  highestBid?: string
}
