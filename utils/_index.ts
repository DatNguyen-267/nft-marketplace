import { ethers } from 'ethers'

export * from './convert'
export * from './create-emotion-cache'
export * from './theme'
export * from '../styles/custome-mui'
export * from './images'
export * from './time'
export const validatePrice = (price: any) => {
  try {
    const convertedPrice = ethers.utils.parseEther(price).toString()
    if (parseFloat(convertedPrice) > 0) {
      return true
    } else return false
  } catch (error) {
    return false
  }
}
