import { ProfileFormData } from '@/models/profile'
import axiosClient from './axiosClient'

export const ProfileApi = {
  getProfileById(id: string) {
    return axiosClient.get(`/profiles/${id}`)
  },
  getProfileByAddress(address: string) {
    return axiosClient.get(`/profiles/address/${address}`)
  },
  postProfile(address: string) {
    return axiosClient.post('/profiles', { walletAddress: address })
  },
  putProfile(profileFormData: ProfileFormData) {
    return axiosClient.put('/profiles', profileFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  getProfileImage(path: string) {
    return axiosClient.post(`/profiles/avatar/${path}`)
  },
}
