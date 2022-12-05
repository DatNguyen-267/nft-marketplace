import { Bid } from '@/models/order'
import { SignedNftOrderV4 } from '@traderxyz/nft-swap-sdk'
import axiosClient from './axiosClient'

export const OrderApi = {
  getOrder() {
    return axiosClient.get('/nfts')
  },
  postOrder(data: SignedNftOrderV4) {
    return axiosClient.post('/orders', data)
  },
  postOrderBid(data: any) {
    return axiosClient.post('/orders/bid', data)
  },
  postBid(data: Bid) {
    return axiosClient.post('/bids', data)
  },
  deleteOrder(_id: string) {
    const url = `/orders/${_id}`
    return axiosClient.delete(url)
  },
  deleteBid(_id: string) {
    const url = `/bids/${_id}`
    return axiosClient.delete(url)
  },
}
