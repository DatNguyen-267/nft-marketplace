import { hooks } from '@/connectors/metaMask'
import { getPreviousPath } from '@/utils/router'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect } from 'react'

type Props = {
  children?: any
}

const ProtectRouter = ({ children }: Props) => {
  // const router = useRouter()
  // const { useAccounts, useIsActive, useProvider } = hooks
  // const accounts = useAccounts()
  // const isActive = useIsActive()
  // useEffect(() => {
  //   console.log('protect router mounted')
  // }, [])
  // useLayoutEffect(() => {
  //   console.log('2. use layout router mounted')
  //   if (accounts && router.pathname === '/login') {
  //     console.log(router)
  //     if (router.query && router.query.from) {
  //       router.push(router.query.from.toString())
  //     } else router.push('/')
  //     // router.push('/')
  //   }
  // }, [router, accounts, isActive])
  return <></>
}

export default ProtectRouter
