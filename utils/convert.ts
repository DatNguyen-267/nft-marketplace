import { BigNumber, ethers } from 'ethers'

enum Match {
  MATCH44 = '^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$',
  MATCH410 = '^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{10})$',
  MATCH517 = '^(0x[a-zA-Z0-9]{5})[a-zA-Z0-9]+([a-zA-Z0-9]{17})$',
}
export const truncateAddress = (
  address: string,
  regex?: 'MATCH44' | 'MATCH410' | 'MATCH517'
) => {
  if (regex) {
    const match = address.match(new RegExp(Match[regex]))
    if (!match) return address
    return `${match[1]}...${match[2]}`
  } else {
    const match = address.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/)
    if (!match) return address
    return `${match[1]}...${match[2]}`
  }
}
export const truncateAddressLong = (
  address: string,
  amountLetterStart: number = 1,
  amountLetterEnd: number = 2
) => {
  if (!address) return 'No Account'
  const match = address.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{10})$/)
  if (!match) return address
  return `${match[1]}...${match[2]}`
}
export const toHex = (num: number) => {
  const val = Number(num)
  return '0x' + val.toString(16)
}

export const convertIpfsUrl = (ipfsUrl: string): string => {
  const res = 'https://ipfs.io/ipfs/' + ipfsUrl.replace('ipfs:/', '')
  return res
}

export const toEther = (wei?: string) => {
  if (wei) return parseFloat(ethers.utils.formatEther(wei).toString()).toString()
  return undefined
}
export const toWei = (ether: string) => {
  return ethers.utils.parseEther(ether).toString()
}

export const hexToNumber = (value: string) => {
  try {
    return parseInt(value, 16)
  } catch (error) {
    return undefined
  }
}
