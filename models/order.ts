import type { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { SignedNftOrderV4 } from '@traderxyz/nft-swap-sdk'

export interface Bid {
  _id?: string
  owner: string
  tokenId: number
  cltAddress: string
  minBidAmount: string
  startingDate: number
  auctionTime: number
  status?: number
  createdAt?: number
}
// export interface Order extends SignedNftOrderV4 {
//   _id: string
//   createdAt: number
//   status: number
//   type: string
// }
export interface Order {
  _id: string
  type: string
  erc721Token: string
  erc721TokenId: number
  direction: number
  erc20Token: string
  erc20TokenAmount: string
  maker: string
  erc1155TokenProperties?: any[]
  erc721TokenProperties?: any[]
  fees: any[]
  expiry: number
  nonce: string
  taker: string
  signature: Signature
  createdAt: number
  status: number
}

interface Signature {
  signatureType: number
  r: string
  s: string
  v: number
  _id: string
}
