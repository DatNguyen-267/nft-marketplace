import { MainLayout } from '@/components/layout'
import Loading from '@/components/shared/modal/loading'
import NftWrapper from '@/components/shared/nft'
import PublicNftFooter from '@/components/shared/nft/footer/public'
import PublicNftHeader from '@/components/shared/nft/header/public'
import { MARKETPLACE_ADDRESS, NFT_ADDRESS } from '@/constants/address'
import useMarketplace from '@/hooks/useMarketplace'
import useNFT from '@/hooks/useNFT'
import { Button, Container, Grid, Typography } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { NftApi } from 'apis'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const CreatorPage = () => {
  // State
  const router = useRouter()
  const { account, chainId } = useWeb3React()
  const [yourTokens, setYourTokens] = useState<any[]>()

  const { getYourTokens, getTokenUri, getOwner } = useNFT()
  const { createAskOrder } = useMarketplace()

  useEffect(() => {
    console.log(yourTokens)
  }, [yourTokens])
  useEffect(() => {
    getData()
  }, [account])
  const getData = async () => {
    try {
      let listYourToken: any[] = []
      let listTokenUri: any[] = []
      let listTokenMetadata: any[] = []

      // Lấy token Id
      const listTokenId = await getYourTokens()
      console.log('listTokenId', listTokenId)

      if (listTokenId) {
        // Khởi tạo danh sách
        listYourToken = _.fill(new Array(listTokenId.length), undefined)
        listTokenId.forEach((item, index) => {
          listYourToken[index] = {
            tokenId: listTokenId[index],
            tokenUri: undefined,
            metadata: undefined,
            isOwner: false,
          }
        })

        // Check owner

        await Promise.all(
          listTokenId.map(async (item, index) => {
            const owner: any = await getOwner(item)
            console.log(owner)
            listYourToken[index] = {
              ...listYourToken[index],
              isOwner: owner === MARKETPLACE_ADDRESS,
            }
          })
        )
        // Lấy token Uri

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
        // Lấy metadata
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
    try {
      const receitpSell = await createAskOrder(NFT_ADDRESS, tokenId, '0.002')
      getData()
      console.log(receitpSell)
    } catch (error) {}
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
                <Grid item xs={3} key={index}>
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
                    {!item.isOwner && (
                      <Button
                        variant='contained'
                        color='primary'
                        sx={{
                          padding: 2,
                        }}
                        onClick={() => {
                          try {
                            handleSell(_.get(item, 'tokenId'))
                          } catch (error) {
                            toast.error('Sell item fail!')
                          }
                        }}
                      >
                        Sell Item
                      </Button>
                    )}
                    {item.isOwner && (
                      <Button
                        variant='contained'
                        color='secondary'
                        sx={{
                          padding: 2,
                          fontSize: '16px',
                        }}
                        onClick={() => {}}
                      >
                        Delist item
                      </Button>
                    )}
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
