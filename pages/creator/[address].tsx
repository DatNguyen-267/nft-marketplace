import { MainLayout } from '@/components/layout'
import ModalSellNft from '@/components/page-components/creator/modal-sale-nft'
import Loading from '@/components/shared/modal/loading'
import NftWrapper from '@/components/shared/nft'
import PublicNftFooter from '@/components/shared/nft/footer/public'
import PublicNftHeader from '@/components/shared/nft/header/public'
import { MARKETPLACE_ADDRESS, NFT_ADDRESS } from '@/constants/address'
import useMarketplace from '@/hooks/useMarketplace'
import useNFT from '@/hooks/useNFT'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { NftApi } from 'apis'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const CreatorPage = () => {
  // State
  const router = useRouter()
  const { account, chainId } = useWeb3React()
  const [yourTokens, setYourTokens] = useState<any[]>()

  const [openModalSell, setOpenModalSell] = useState<boolean>(false)
  const [creatorAddress, setCreatorAddress] = useState<string>()

  const [notFoundCreator, setNotFoundCreator] = useState<boolean>(false)
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null)

  const handleOpenSellModal = () => setOpenModalSell(true)
  const handleCloseSellModal = () => setOpenModalSell(false)

  const { getYourTokens, getTokenUri, getOwner } = useNFT()
  const { createAskOrder } = useMarketplace()
  useEffect(() => {
    if (router.isReady) {
      console.log(router)
      if (router.query) {
        console.log(router.query.address?.toString())
        resetState()
        if (router.query.address) setCreatorAddress(router.query.address as string)
        else {
          setNotFoundCreator(true)
        }
      } else {
        setNotFoundCreator(true)
      }
    }
  }, [router])

  useEffect(() => {
    console.log(yourTokens)
  }, [yourTokens])
  useEffect(() => {
    if (!creatorAddress && router.isReady) {
      setCreatorAddress(() => router.query.address?.toString())
    } else if (creatorAddress) getData()
  }, [creatorAddress])
  const resetState = () => {
    setYourTokens(undefined)
    setNotFoundCreator(false)
    setOpenModalSell(false)
    setCreatorAddress(() => undefined)
  }
  const getData = async () => {
    try {
      let listYourToken: any[] = []
      let listTokenUri: any[] = []
      let listTokenMetadata: any[] = []
      console.log('***get data***')
      // Lấy token Id
      const listTokenId = await getYourTokens(creatorAddress)
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
      console.log(error)
      setNotFoundCreator(true)
    }
  }
  const handleSell = async (tokenId: string, price: string) => {
    console.log('price', price)
    console.log('tokenId', tokenId)

    if (tokenId && price) {
      try {
        const receitpSell = await createAskOrder(NFT_ADDRESS, tokenId, price)
        setYourTokens(undefined)
        getData()
        console.log(receitpSell)
      } catch (error) {
        console.log(error)
        throw error
      }
    } else return new Error('invalid input')
  }
  return (
    <>
      {notFoundCreator && <Typography variant='h1'>Creator not exists</Typography>}
      {!notFoundCreator && (
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
                    <Box sx={{ height: '100%' }}>
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
                        {account === creatorAddress && (
                          <>
                            {!item.isOwner && (
                              <Button
                                variant='contained'
                                color='primary'
                                sx={{
                                  padding: 2,
                                }}
                                onClick={() => {
                                  setSelectedTokenId(_.get(item, 'tokenId').toString())
                                  handleOpenSellModal()
                                }}
                              >
                                List Item
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
                          </>
                        )}
                      </NftWrapper>
                    </Box>
                  </Grid>
                )
              })}
          </Grid>
        </Container>
      )}
      <ModalSellNft
        tokenId={selectedTokenId}
        onSubmit={handleSell}
        open={openModalSell}
        handleCloseModal={handleCloseSellModal}
        handleOpenModal={handleOpenSellModal}
      ></ModalSellNft>
    </>
  )
}

CreatorPage.Layout = MainLayout
export default CreatorPage
