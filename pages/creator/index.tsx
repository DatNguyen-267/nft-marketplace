import { MainLayout } from '@/components/layout'
import Loading from '@/components/shared/modal/loading'
import NftWrapper from '@/components/shared/nft'
import PublicNftFooter from '@/components/shared/nft/footer/public'
import PublicNftHeader from '@/components/shared/nft/header/public'
import { NFT_ADDRESS } from '@/constants/address'
import useMarketplace from '@/hooks/useMarketplace'
import useNFT from '@/hooks/useNFT'
import { NftData } from '@/models/index'
import { Button, Container, Grid, Typography } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { NftApi } from 'apis'
import _, { forEach } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const CreatorPage = () => {
  // State
  const router = useRouter()
  const { account, chainId } = useWeb3React()
  const [yourTokens, setYourTokens] = useState<any[]>()

  const { getYourTokens, getTokenUri } = useNFT()
  const { createAskOrder } = useMarketplace()

  useEffect(() => {
    getData()
  }, [account])
  const getData = async () => {
    try {
      let listYourToken: any[] = []
      let listTokenUri: any[] = []
      let listTokenMetadata: any[] = []
      const listTokenId = await getYourTokens()
      console.log('listTokenId', listTokenId)
      if (listTokenId) {
        listYourToken = _.fill(new Array(listTokenId.length), undefined)
        listTokenId.forEach((item, index) => {
          listYourToken[index] = {
            tokenId: listTokenId[index],
            tokenUri: undefined,
            metadata: undefined,
          }
        })
        listTokenUri = await Promise.all(
          listTokenId.map(async (item, index) => {
            const tokenUri: any = await getTokenUri(item)
            listYourToken[index] = {
              ...listYourToken[index],
              tokenUri,
            }
            return tokenUri
          })
        )
        setYourTokens([...listYourToken])

        listTokenMetadata = await Promise.all(
          listTokenUri.map(async (item, index) => {
            const metadata = await NftApi.getMetadata(item)
            listYourToken[index] = {
              ...listYourToken[index],
              metadata: { ...metadata },
            }

            return metadata
          })
        )
        setYourTokens([...listYourToken])
      }
      setYourTokens(() => [...listYourToken])
    } catch (error) {
      setYourTokens([])
    }
  }
  const handleSell = async (tokenId: string) => {
    const receitpSell = await createAskOrder(NFT_ADDRESS, tokenId, '0.002')
    console.log(receitpSell)
  }
  return (
    <>
      <Container maxWidth='lg'>
        <Grid container columns={12} spacing='30px'>
          {!yourTokens && <Loading></Loading>}
          {yourTokens && yourTokens.length === 0 && (
            <Grid item>
              <Typography>There are no items</Typography>
            </Grid>
          )}
          {yourTokens &&
            yourTokens.map((item, index) => {
              return (
                <Grid item xs={4} key={index}>
                  <NftWrapper
                    srcImg={_.get(item, 'metadata.image')}
                    header={<PublicNftHeader status={'Fixed Price'} />}
                    footer={
                      <PublicNftFooter
                        tokenUri={_.get(item, 'tokenUri')}
                        tokenId={_.get(item, 'tokenId')}
                        name={_.get(item, 'metadata.name')}
                        description={_.get(item, 'metadata.description')}
                      />
                    }
                  >
                    <Button
                      variant='contained'
                      color='primary'
                      sx={{
                        padding: 2,
                      }}
                      onClick={() => handleSell(_.get(item, 'tokenId'))}
                    >
                      Sell Item
                    </Button>
                  </NftWrapper>
                </Grid>
              )
            })}
        </Grid>
      </Container>
    </>
  )
}

CreatorPage.Layout = MainLayout
export default CreatorPage
