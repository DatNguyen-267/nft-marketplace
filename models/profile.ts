export interface Profile {
  _id: string
  profilePicture?: string
  walletAddress: string
  displayName?: string
  customUrl?: string
  bio?: string
  twitterUserName?: string
  persionalSite?: string
  email?: string
  isVerified?: boolean
  createdAt?: number
}

export type ProfileFormData = {
  profilePicture?: string
  walletAddress: string
  displayName?: string
  customUrl?: string
  bio?: string
  twitterUserName?: string
  persionalSite?: string
  email?: string
  file: File
}
