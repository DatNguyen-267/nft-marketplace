import { useEffect, useState } from 'react'
import { hooks, coinbaseWallet } from '@/connectors/coinbaseWallet'
import Card from '../Card'
import { ImagesWallet } from '@/utils/images'

const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks

export default function CoinbaseWalletCard() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()
  const isActive = useIsActive()
  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  const [error, setError] = useState<any>(undefined)

  return (
    <Card
      icon={ImagesWallet.CoinBase}
      connector={coinbaseWallet}
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
