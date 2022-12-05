import { Profile } from './profile'

export type Activity = {
  _id: string
  event: 'Sale' | 'List' | 'Minted' | 'Bid'
  tokenId: number
  cltAddress: string
  price: string
  by: string
  createdAt: number
  profile?: Profile
}
