import { MainLayout } from '@/components/layout'
import NftWrapper from '@/components/shared/nft'
import PublicNftFooter from '@/components/shared/nft/footer/public'
import PublicNftHeader from '@/components/shared/nft/header/public'
import useMarketplace from '@/hooks/useMarketplace'
import useNFT from '@/hooks/useNFT'
import { Tag, TAGS } from '@/models/nft'
import { hexToNumber } from '@/utils/convert'
import { Icon } from '@/utils/images'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { NftApi } from 'apis'
import _ from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { NFT_ADDRESS } from '../constants'
import { PageBlockContext } from '../context/page-block-context'
import { NextPageWithLayout } from './_app'
const Loading2 = Icon.Loading2
export type HomeTag = Tag | 'All'
const HOMETAGS: HomeTag[] = ['All', ...TAGS]
type Filter = {
  limit: number
  skip: number
  listTag: HomeTag[]
  actives: HomeTag[]
}
const SKIPAMOUNT = 8
interface SaleItem {
  askInfo: {
    price?: string
    seller?: string
  }
  tokenId?: number
  tokenUri?: string
  metadata: {
    name?: string
    description?: string
    image?: string
  }
}
const Home: NextPageWithLayout = () => {
  const { isActive, provider, chainId, account } = useWeb3React()

  const [saleTokens, setSaleTokens] = useState<SaleItem[]>()
  const { getTokenUri } = useNFT()

  const { viewAsksByCollection, buyTokenUsingWBNB } = useMarketplace()

  const pageBlockContext = useContext(PageBlockContext)

  useEffect(() => {
    getsaleTokens()
  }, [])
  useEffect(() => {
    console.log('listSaleToken *****', saleTokens)
  }, [saleTokens])
  const getsaleTokens = async () => {
    try {
      const raws = await viewAsksByCollection(NFT_ADDRESS, 0, 10)
      if (raws) {
        console.log(raws)
        let listSaleToken: SaleItem[] = _.fill(new Array(raws.tokenIds.length), {
          askInfo: { price: undefined, seller: undefined },
          tokenId: undefined,
          tokenUri: undefined,
          metadata: { name: undefined, description: undefined, image: undefined },
        })
        raws.tokenIds.forEach((item: any, index: number) => {
          listSaleToken[index] = {
            ...listSaleToken[index],
            askInfo: raws.askInfo[index],
            tokenId: hexToNumber(item),
          }
        })
        setSaleTokens([...listSaleToken])

        if (listSaleToken.length > 0) {
          let listTokenUri = await Promise.all(
            listSaleToken.map(async (item, index) => {
              if (item.tokenId) {
                const tokenUri: any = await getTokenUri(item.tokenId)
                listSaleToken[index] = {
                  ...listSaleToken[index],
                  tokenUri,
                }
                return tokenUri
              }
            })
          )
          setSaleTokens([...listSaleToken])

          let listTokenMetadata = await Promise.all(
            listTokenUri.map(async (item, index) => {
              const metadata = await NftApi.getMetadata(item)
              listSaleToken[index] = {
                ...listSaleToken[index],
                metadata: { ...metadata },
              }

              return metadata
            })
          )
          setSaleTokens([...listSaleToken])
        }
      }
    } catch (error) {}
  }
  // const handleBuy = async (tokenId?: number, price?: string) => {
  //   if (tokenId && price) {
  //     try {
  //       await NftService.buyItem(tokenId, price, MARKETPLACE_ADDRESS)
  //       toast.success('Buy item success')
  //     } catch (error) {
  //       console.log('buy fail', error)
  //       toast.error('Buy item fail!')
  //     }
  //   }
  // }
  const handleBuy = async (tokenId?: string, price?: string) => {
    if (tokenId && price) {
      try {
        if (tokenId && price) {
          await buyTokenUsingWBNB(NFT_ADDRESS, tokenId, price)
        }
      } catch (error) {
        console.log('buy fail', error)
      }
    }
  }
  return (
    <Box>
      {/* Explore */}
      <Container maxWidth='lg'>
        <Box>
          {/* Header - Filter */}
          <Stack direction='row' spacing={2}>
            <Typography variant='h1' color='primary.main'>
              EXPLORE
            </Typography>
          </Stack>
          <Grid container spacing={2} mt={2}>
            {saleTokens &&
              saleTokens.length > 0 &&
              saleTokens.map((item: any, index: number) => (
                <Grid item xs={4} key={index}>
                  <Box>
                    <NftWrapper
                      header={<PublicNftHeader status={'Fixed Price'} />}
                      footer={
                        <PublicNftFooter
                          tokenUri={_.get(item, `tokenUri`)}
                          tokenId={hexToNumber(_.get(item, 'tokenId'))?.toString()}
                          name={_.get(item, `metadata.name`)}
                          description={_.get(item, `metadata.description`)}
                          price={hexToNumber(
                            _.get(item, `askInfo.price._hex`)
                          )?.toString()}
                        />
                      }
                      isOwner={false}
                      srcImg={_.get(item, `metadata.image`)}
                    >
                      <Box mt={1}>
                        <Typography variant='h3'>Seller By:</Typography>
                        <Typography
                          mt={1}
                          variant='body1'
                          component='span'
                          color='info'
                          sx={{
                            wordWrap: 'break-word',
                          }}
                        >
                          {_.get(item, 'askInfo.seller')}
                        </Typography>
                      </Box>{' '}
                      {_.get(item, 'askInfo.seller') !== account ? (
                        <Button
                          variant='contained'
                          color='primary'
                          sx={{
                            marginTop: 2,
                            padding: 2,
                          }}
                          onClick={async () => {
                            pageBlockContext?.openPageBlock({
                              func: handleBuy(
                                _.get(item, 'tokenId'),
                                hexToNumber(_.get(item, 'askInfo.price._hex'))?.toString()
                              ),
                              text: 'Buying...',
                              success: 'Buy item success',
                              error: 'Buy item fail!',
                            })
                          }}
                        >
                          Buy Item
                        </Button>
                      ) : (
                        <Button
                          variant='contained'
                          disabled={true}
                          sx={{
                            opacity: 0.5,
                            marginTop: 2,
                            padding: 2,
                          }}
                        >
                          {' '}
                          Your Item
                        </Button>
                      )}
                    </NftWrapper>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

Home.Layout = MainLayout

export default Home
