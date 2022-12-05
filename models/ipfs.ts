export interface IPFS {
  image: string
  name: string
  description: string
}
export interface NftMetadata {
  contract: Contract
  id: Id
  tokenUri: TokenUri
  metadata: Metadata
  timeLastUpdated: number
}

export interface Metadata {
  name: string
  description: string
  image: string
}

interface TokenUri {
  raw: string
  gateway: string
}

interface Id {
  tokenId: string
  tokenType: string
}

interface Contract {
  address: string
}
