import axiosClient from './axiosClient'

export const ActivityApi = {
  getAllActivity() {
    return axiosClient.get('/activities')
  },
  getListActivity(cltAddress: string, tokenId: number) {
    return axiosClient.get('/nft', {
      params: {
        cltAddress,
        tokenId,
      },
    })
  },
}
