export interface FormSellNFT {
  typePutOnMarket: 'fixed-price' | 'timed-auction'
  price: string | ''
}

export interface FormCreateNFT extends FormSellNFT {
  file: File | null
  putOnMarket: boolean
  collectionOption: 'aioz-art'
  title: string | ''
  description: string | ''
}
