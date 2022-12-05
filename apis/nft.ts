import { CreateNftData, Tag } from '@/models/nft'
import qs from 'qs'
import axiosClient, { BaseURL } from './axiosClient'

const metadataUrl = 'https://testnet.explorer.aioz.network/api/token/nft/metadata/'
export const NftApi = {
  getUrlImage(cid: string) {
    const url = cid.split('ipfs://')
    return `https://ipfs.io/ipfs/${url[1]}`
  },

  getMetadata(tokenUri: string) {
    let url = tokenUri.replace('ipfs:/', '')
    return axiosClient
      .get(`https://ipfs.io/ipfs${url}`)
      .then((res) => res.data)
      .catch((err) => undefined)
  },
}
