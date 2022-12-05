import { useEffect, useState } from 'react'
import { hooks, metaMask } from '@/connectors/metaMask'
import { ImagesWallet } from '@/utils/images'
import Card from '../Card'

const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks

export default function MetaMaskCard() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()
  const isActive = useIsActive()
  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  const [error, setError] = useState<any>(undefined)

  return (
    <Card
      icon={ImagesWallet.MetaMask}
      connector={metaMask}
      chainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
    />
  )
}
