import { hooks } from '@/connectors/metaMask'
import { useWeb3React } from '@web3-react/core'
import { ProfileApi } from 'apis'
import { createContext, useEffect, useState } from 'react'
import { Profile } from '../models'

type Props = {
  children: any
}
export const ProfileContext = createContext<Profile | null>(null)
const ProfileContextWapper = ({ children }: Props) => {
  const [profile, setProfile] = useState<Profile | null>(null)
  // const { useChainId, useAccounts, useIsActive } = hooks
  // const chainId = useChainId()
  // const accounts = useAccounts()
  // const isActive = useIsActive()
  const { connector, accounts, isActive, chainId } = useWeb3React()

  const handleGetProfile = async () => {
    if (accounts) {
      try {
        try {
          const profile = await ProfileApi.getProfileByAddress(accounts[0])
          setProfile(profile.data)
        } catch (error) {
          const res = await postProfile(accounts[0])
          try {
            const newProfile: Profile = await ProfileApi.getProfileByAddress(
              accounts[0]
            ).then((res) => res.data)
            setProfile(newProfile)
          } catch (error) {
            throw error
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const postProfile = async (account: string) => {
    const respond = await ProfileApi.postProfile(account)
      .then((res) => {
        return res
      })
      .catch((error) => {
        throw error
      })
    return respond
  }

  return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>
}

export default ProfileContextWapper
