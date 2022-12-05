import ButtonLinkWithIcon from '@/components/shared/button/direction-button'
import { MainLayout } from '@/components/layout'
import Loading from '@/components/shared/modal/loading'
import YesNoModal from '@/components/shared/modal/yes-no-modal'
import MyTab, { ListTab } from '@/components/shared/tab/my-tab-list'
import useMarket from '@/hooks/ZeroX/useMarket'
import { Activity, NftData, Profile } from '@/models/index'
import { NftService, ProfileService, ContractService } from '@/services/index'
import { StyledSvgIcon } from '@/styles/custome-mui'
import { AIOZ_ADDRESS, COLLECTION_STANDARD } from '@/utils/address'
import { convertIpfsUrl, toEther, truncateAddress } from '@/utils/convert'
import { Icon, ImagesViewPage } from '@/utils/images'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import { initializeConnector, useWeb3React } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { NftApi } from 'apis'
import { ActivityApi } from 'apis/activity'
import { PageBlockContext } from 'context/page-block-context'
import { ethers } from 'ethers'
import useOrder from '@/hooks/ZeroX/useOrder'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import AuctionTimeEnd from '../../components/page-components/view/auction-time-end'
import HighestBid from '../../components/page-components/view/highest-bid'
import ModalBid from '../../components/page-components/view/modal-bid'
import { StyledTabPanel } from '../../components/page-components/view/tab-panel'
import ActivityNft from '../../components/page-components/view/tabs/activity-nft'
import Bidder from '../../components/page-components/view/tabs/bidder'
import Owner from '../../components/page-components/view/tabs/owner'
import User from '../../components/page-components/view/user'
import { NftMetadata } from '@/models/ipfs'

export const [metaMask, hooks] = initializeConnector<MetaMask>(
  (actions: any) => new MetaMask({ actions })
)

type Props = {}
const LIST_TAB: ListTab[] = [
  {
    name: 'Bids',
  },
  { name: 'Owners' },
  {
    name: 'Activities',
  },
]
interface Status {
  isOwner: boolean
  isBid: boolean
  isSale: boolean
  hasOrderBid: boolean
}

const View = ({}: Props) => {
  const router = useRouter()
  const { isActive, account } = useWeb3React()
  const pageBlockContext = useContext(PageBlockContext)

  const [nftData, setNftData] = useState<NftData | null>(null)
  const [status, setStatus] = useState<Status | null>(null)
  const [listActivity, setListActivity] = useState<Activity[] | null>(null)
  const [ownerProfile, setOwnerProfile] = useState<Profile | null>(null)
  const [collectionName, setCollectionName] = useState<string | null>(null)
  const [bid, setBid] = useState<any | null>(null)
  const [openModalBid, setOpenModalBid] = useState(false)
  const [listProfileBidded, setlistProfileBidded] = useState<Profile[] | null>(null)
  const [imagePath, setImagePath] = useState<string | null>(null)
  const [openDialogDelist, setOpenDialogDelist] = useState<boolean>(false)

  const handleOpenDialogDelist = () => setOpenDialogDelist(true)
  const handleCloseDialogDelist = () => setOpenDialogDelist(false)

  const { delistNft } = useMarket()

  const handleOpenModalBid = () => setOpenModalBid((prev) => true)
  const handleCloseModalBid = () => setOpenModalBid((prev) => false)

  const {
    completeOrderAndPutToServer,
    completeOrder,
    createOrder,
    createOrderBidAndPostToServer,
  } = useOrder()

  console.log(nftData)
  useEffect(() => {
    getData()
  }, [router.query])
  useEffect(() => {
    if (nftData) {
      setStatus({
        ...status,
        isOwner:
          account &&
          isActive &&
          ownerProfile?.walletAddress &&
          ownerProfile?.walletAddress.toLowerCase() === account.toLowerCase()
            ? true
            : false,
        isBid: nftData.bid ? true : false,
        isSale: nftData.order ? true : false,
        hasOrderBid: nftData.orderBids && nftData.orderBids.length > 0 ? true : false,
      })
    }
  }, [nftData, account, isActive])

  const resetState = () => {
    setNftData(null)
    setStatus(null)
    setListActivity(null)
    setOwnerProfile(null)
    setCollectionName(null)
    setBid(null)
    setlistProfileBidded(null)
    setImagePath(null)
  }
  const reloadPageData = async () => {
    resetState()
    getData()
  }
  const getOnlyNftDataAndBidder = async () => {
    setNftData(null)
    setlistProfileBidded(null)
    setOwnerProfile(null)
    try {
      if (router.query && router.query.id) {
        const idNFT = router.query.id
        if (idNFT) {
          let nftData: NftData = await getNftData(idNFT.toString())
          const ownerAddress = await NftService.getOwner(
            nftData.nft.cltAddress,
            nftData.nft.tokenId
          )

          const ownerProfile = await ProfileService.getProfileByAddress(ownerAddress)

          // Get all bidder
          await getListProfiledBidder(nftData)

          // Change state
          setOwnerProfile(ownerProfile)
          setNftData(nftData)
        }
      }
    } catch (error) {
      throw error
    }
  }
  const getData = async () => {
    try {
      if (router.query && router.query.id) {
        const idNFT = router.query.id
        if (idNFT) {
          let nftData: NftData = await getNftData(idNFT.toString())
          console.log(nftData)
          const provider = ContractService.getProvider()
          // Get List Activities
          let newListActivity = await getListActivity(
            nftData.nft.cltAddress,
            nftData.nft.tokenId
          )
          console.log(newListActivity)
          // Get Profile of Activites
          if (newListActivity) {
            try {
              const getProfile = await Promise.all(
                newListActivity.map(async (item: Activity, index: number) => {
                  const profile = await ProfileService.getProfileByAddress(item.by)
                  newListActivity[index].profile = profile
                  try {
                    newListActivity[index].price = toEther(
                      newListActivity[index].price.toString()
                    )
                  } catch (error) {}
                })
              )
            } catch (error) {
              console.log(error)
            }
          }
          console.log(nftData.nft.cltAddress)
          const ownerAddress = await NftService.getOwner(
            nftData.nft.cltAddress,
            nftData.nft.tokenId
          )
          console.log(ownerAddress)
          const ownerProfile = await ProfileService.getProfileByAddress(ownerAddress)

          // Get all bidder
          await getListProfiledBidder(nftData)

          // Get collectionName, tokenUri, Ipfs
          const collectionName = await NftService.getCollectionName(
            nftData.nft.cltAddress
          )
          const tokenUri = await NftService.getTokenUri(
            nftData.nft.cltAddress,
            nftData.nft.tokenId,
            COLLECTION_STANDARD
          )
          const nftMetadata: NftMetadata = await NftService.getMetadataForNft(nftData)
          // const ipfs = await NftService.getIpfs(tokenUri)

          // set Value
          setImagePath(NftApi.getUrlImage(nftData.nft._id))
          setListActivity(newListActivity)
          setOwnerProfile(ownerProfile)
          setCollectionName(collectionName)
          setNftData({ ...nftData, NftMetadata: nftMetadata })
        }
      }
    } catch (error) {
      throw error
    }
  }
  const getNftData = async (idNFT: string) => {
    try {
      const res = await NftApi.getNftById(idNFT)
      return res.data
    } catch (error) {
      throw error
    }
  }
  const getListProfiledBidder = async (nftData: NftData) => {
    let newListProfileBidded: any[] = []
    try {
      if (nftData.orderBids && nftData.orderBids.length > 0) {
        const res = await Promise.all(
          nftData.orderBids.map(async (item, index) => {
            const profile: Profile = await ProfileService.getProfileByAddress(item.maker)
            newListProfileBidded.push(profile)
          })
        )
      }
      setlistProfileBidded(newListProfileBidded)
    } catch (error) {
      throw error
    }
  }

  const getListActivity = async (cltAddress: string, tokenId: number) => {
    try {
      const activities = await ActivityApi.getListActivity(cltAddress, tokenId)
      return activities.data
    } catch (error) {
      throw error
    }
  }
  const handlePlaceABid = async (price: string) => {
    console.log('place a bid', price)
    if (price && nftData) {
      try {
        const receipt = await createOrderBidAndPostToServer(
          nftData.nft.cltAddress,
          nftData.nft.tokenId,
          AIOZ_ADDRESS.WAIOZ,
          price
        )
        setBid(receipt)
        getOnlyNftDataAndBidder()
        console.log(receipt)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject()
      }
    }
    return Promise.reject()
  }
  const handleBuy = async () => {
    if (nftData && nftData.order) {
      try {
        let idsOrderBid: string[] = []
        if (nftData.orderBids) {
          nftData.orderBids.forEach((element) => {
            idsOrderBid.push(element._id)
          })
        }
        const receipt = await completeOrderAndPutToServer({
          signedOrder: nftData.order,
          tokenExchangeAddress: AIOZ_ADDRESS.WAIOZ,
          idOrder: nftData.order._id,
          idNft: nftData.nft._id,
          idBid: nftData.bid ? nftData.bid._id : undefined,
          idsOrderBid: idsOrderBid,
        })
        console.log(receipt)
        reloadPageData()
        return Promise.resolve()
      } catch (error) {
        return Promise.reject()
      }
    } else return Promise.reject()
  }

  const handleDelistItem = async () => {
    try {
      if (nftData) {
        console.log(nftData)
        await delistNft({
          idNft: nftData.nft._id,
          orderBids: nftData.orderBids,
          idOrder: nftData.order?._id,
          isAcquired: nftData.nft.isAcquired,
        })
        reloadPageData()
        toast.success('Delist item success')
      }
    } catch (error) {
      toast.error('Delist item error!')
    }
  }
  return (
    <>
      {!nftData && <Loading />}
      {nftData && (
        <Box>
          <Container
            maxWidth='lg'
            sx={{
              display: 'flex',
            }}
          >
            <ButtonLinkWithIcon
              href='back'
              icon={<KeyboardBackspaceIcon sx={{ color: 'inherit' }} />}
            />
            <Container maxWidth='md'>
              <Stack direction='row'>
                {/* Image */}
                <Box
                  sx={{
                    flex: '1',
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '16px',
                      maxWidth: '550px',
                      maxHeight: '550px',
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: 'common.black',
                        position: 'relative',
                        paddingBottom: '100%',
                        overflow: 'hidden',
                        height: 0,
                        borderRadius: '16px',
                        '& .lazy-load-image-background': {
                          position: 'relative',
                          paddingBottom: '100%',
                          overflow: 'hidden',
                          width: '100%',
                          height: '100%',
                        },
                      }}
                    >
                      {imagePath ? (
                        <Box
                          component={LazyLoadImage}
                          src={imagePath ? imagePath : ''}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            objectPosition: 'center',
                          }}
                          effect='blur'
                        ></Box>
                      ) : (
                        <Box></Box>
                      )}
                    </Box>
                  </Box>

                  {/*  */}
                  <Box>
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      mt={1}
                      mr={2}
                      ml={1}
                    >
                      <Stack direction='row'>
                        <Stack direction='row' mr={3} alignItems='center'>
                          <StyledSvgIcon
                            component={ImagesViewPage.Heart}
                            sx={{
                              width: '20.57px',
                              height: '18px',
                            }}
                          />
                          <Typography variant='subtitle1' ml='6px'>
                            5
                          </Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center'>
                          <StyledSvgIcon
                            component={ImagesViewPage.Eye}
                            sx={{
                              width: '20px',
                              height: '20px',
                            }}
                          />
                          <Typography variant='subtitle1' ml='6px'>
                            752 views
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack direction='row' alignItems='center'>
                        <StyledSvgIcon
                          component={ImagesViewPage.Reload}
                          sx={{
                            cursor: 'pointer',
                            marginRight: '12px',
                            width: '16px',
                            height: '16px',
                          }}
                        />
                        <StyledSvgIcon
                          component={ImagesViewPage.Share}
                          sx={{
                            cursor: 'pointer',
                            marginRight: '12px',
                            width: '14px',
                            height: '14px',
                          }}
                        />
                        <StyledSvgIcon
                          component={ImagesViewPage.More2}
                          sx={{
                            cursor: 'pointer',
                            width: '24px',
                            height: '24px',
                          }}
                        />
                      </Stack>
                    </Stack>
                    <Stack mt={1} mr={2} ml={1} direction='row'>
                      {nftData &&
                        nftData.nft.tags.map((item, index) => (
                          <Typography variant='body1' key={index} mr={1}>
                            #{item}
                          </Typography>
                        ))}
                    </Stack>
                  </Box>
                </Box>

                {/* Information Nft */}
                <Stack
                  sx={{
                    marginLeft: '60px',
                    maxWidth: '440px',
                    flex: '1',
                  }}
                >
                  <Typography>
                    Collection{' '}
                    {collectionName ? (
                      <Typography
                        component='span'
                        fontWeight='bold'
                        color='myColor.foggy'
                        sx={{ textTransform: 'uppercase' }}
                      >
                        {collectionName}
                      </Typography>
                    ) : (
                      'UNKNOWN'
                    )}
                  </Typography>

                  <Typography
                    variant='h2'
                    mb={1 / 2}
                    mt={1 / 2}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: 'myColor.foggy',
                      display: '-webkit-box',
                      ['-webkit-line-clamp']: '2',
                      ['-webkit-box-orient']: 'vertical',
                      wordWrap: 'break-word',
                    }}
                  >
                    {nftData.NftMetadata && nftData.NftMetadata.metadata
                      ? nftData.NftMetadata.metadata.name
                      : ''}{' '}
                    #{nftData && nftData.nft.tokenId}
                  </Typography>
                  <Typography variant='tinyBody' mb={1 / 2}>
                    {nftData &&
                      nftData.nft &&
                      truncateAddress(nftData.nft.cltAddress, 'MATCH517')}
                  </Typography>
                  <Typography variant='body1'>
                    {/* Two malfunctioned rockets exploded to pieces, third time is the charm?
                    Who z zz enough to test the next one? Elon pinging CryptoPunks to the
                    rescue. Taste of vict{' '} */}
                    {nftData.NftMetadata && nftData.NftMetadata.metadata
                      ? nftData.NftMetadata.metadata.description
                      : ''}{' '}
                    #
                    {/* <Typography variant='subtitle1' color='common.white' component='span'>
                      Read more
                    </Typography> */}
                  </Typography>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <User
                      title='Create by'
                      name='AIOZ Network'
                      sx={{ margin: '16px 0' }}
                    ></User>
                    {status && status.isSale && ownerProfile && (
                      <User
                        title='Seller'
                        name={
                          ownerProfile.displayName
                            ? ownerProfile.displayName
                            : truncateAddress(ownerProfile.walletAddress, 'MATCH44')
                        }
                        sx={{ margin: '16px 0' }}
                      ></User>
                    )}
                  </Stack>

                  <MyTab
                    list={LIST_TAB}
                    listAmount={
                      nftData
                        ? [
                            nftData.orderBids ? nftData.orderBids.length : 0,
                            1,
                            listActivity ? listActivity.length : 0,
                          ]
                        : [0, 0, 0]
                    }
                    handleChange={() => {}}
                    spacing={28}
                    sx={{ width: '100%', marginBottom: 2 }}
                  >
                    <StyledTabPanel value='0'>
                      {status && status.isBid ? (
                        <>
                          {status.hasOrderBid &&
                          nftData &&
                          nftData.orderBids &&
                          listProfileBidded ? (
                            nftData.orderBids.map((item, index) => (
                              <Bidder
                                nftData={nftData}
                                signedOrder={item}
                                key={index}
                                price={ethers.utils
                                  .formatEther(item.erc20TokenAmount)
                                  .toString()}
                                name={
                                  listProfileBidded[index] &&
                                  listProfileBidded[index].displayName
                                    ? listProfileBidded[index].displayName
                                    : truncateAddress(item.maker, 'MATCH44')
                                }
                                time={item.createdAt}
                                handleReloadPageData={reloadPageData}
                                isOwner={status ? status.isOwner : false}
                              ></Bidder>
                            ))
                          ) : (
                            <Stack
                              direction='row'
                              justifyContent='center'
                              alignItems='center'
                              mt={2}
                            >
                              <StyledSvgIcon component={ImagesViewPage.NoBid} />
                              <Typography variant='subtitle1' color='myColor.grey' ml={1}>
                                {' '}
                                No active bids yet.
                                <br /> Be the first to make a bid!
                              </Typography>
                            </Stack>
                          )}
                        </>
                      ) : (
                        <Stack
                          direction='row'
                          justifyContent='center'
                          alignItems='center'
                          mt={2}
                        >
                          {/* <StyledSvgIcon component={ImagesViewPage.NoBid}></StyledSvgIcon> */}
                          <Typography variant='subtitle1' color='myColor.grey'>
                            {' '}
                            No bids.
                          </Typography>
                        </Stack>
                      )}
                    </StyledTabPanel>
                    <StyledTabPanel value='1'>
                      {ownerProfile && <Owner profile={ownerProfile}></Owner>}
                    </StyledTabPanel>
                    <StyledTabPanel value='2'>
                      {listActivity &&
                        listActivity.map((item, index) => (
                          <ActivityNft activity={item} key={index}></ActivityNft>
                        ))}
                    </StyledTabPanel>
                  </MyTab>

                  {/* Highest Bid */}
                  {status &&
                    status.isSale &&
                    status.hasOrderBid &&
                    nftData &&
                    nftData.orderBids &&
                    listProfileBidded && (
                      <HighestBid
                        sx={{ marginTop: 2, marginBottom: 2 }}
                        orderBid={nftData.orderBids[0]}
                        profileBidder={listProfileBidded[0]}
                      ></HighestBid>
                    )}

                  {/* Action */}
                  {status ? (
                    <Stack sx={{}}>
                      {status.isOwner && status.isSale ? (
                        <Button
                          variant='outlined'
                          size='large'
                          sx={{
                            padding: '20px',
                            paddingTop: '20px',
                            paddingBottom: '20px',
                          }}
                          onClick={handleOpenDialogDelist}
                        >
                          Delist this item
                        </Button>
                      ) : (
                        <>
                          {status.isSale && nftData ? (
                            <Box>
                              <Grid container columns={2} spacing='30px' mt={'-10px'}>
                                <Grid item xs={status.isBid ? 1 : 2}>
                                  <Button
                                    sx={{
                                      width: '100%',
                                      paddingTop: '20px',
                                      paddingBottom: '20px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      flexWrap: 'wrap',
                                    }}
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    onClick={
                                      async () => {
                                        if (!isActive) {
                                          await router.push(
                                            `/login?from=${router.asPath}`
                                          )
                                          toast.error('Please connect wallet!')
                                        } else
                                          pageBlockContext
                                            ?.openPageBlock({
                                              func: handleBuy(),
                                              text: 'Buying...',
                                              success: 'Buy NFT success.',
                                              error: 'Buy NFT error',
                                            })
                                            .finally(() => {})
                                      }

                                      // toast.promise(handleBuy(), {
                                      //   loading: 'Buying...',
                                      //   success: <b>Buy NFT success.</b>,
                                      //   error: <b>Buy NFT fail.</b>,
                                      // })
                                    }
                                  >
                                    BUY FOR{' '}
                                    <Stack
                                      direction='row'
                                      alignItems='baseline'
                                      ml={1 / 2}
                                    >
                                      <StyledSvgIcon
                                        component={Icon.GroupLine}
                                        sx={{
                                          width: '11px',
                                          hegiht: '15px',
                                          marginRight: 1 / 2,
                                        }}
                                      />
                                      {nftData && nftData.order
                                        ? toEther(nftData.order?.erc20TokenAmount)
                                        : '0'}
                                    </Stack>
                                  </Button>
                                </Grid>
                                {status.isBid && (
                                  <Grid item xs={1}>
                                    <Button
                                      sx={{
                                        width: '100%',
                                        height: '100%',
                                        paddingTop: '20px',
                                        paddingBottom: '20px',
                                      }}
                                      variant='outlined'
                                      color='primary'
                                      size='large'
                                      onClick={() => {
                                        if (!isActive)
                                          router.push(`/login?from=${router.asPath}`)
                                        else handleOpenModalBid()
                                      }}
                                    >
                                      Place a bid
                                    </Button>
                                  </Grid>
                                )}
                              </Grid>
                              {status.isBid && (
                                <AuctionTimeEnd
                                  timeStamp={nftData.bid?.auctionTime}
                                ></AuctionTimeEnd>
                              )}
                            </Box>
                          ) : !status.isOwner && !status.isSale ? (
                            <Box>
                              <Button
                                variant='outlined'
                                size='large'
                                sx={{
                                  paddingTop: '20px',
                                  paddingBottom: '20px',
                                  width: '100%',
                                  marginTop: '30px',
                                }}
                              >
                                Not for Sale
                              </Button>
                            </Box>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </Stack>
                  ) : (
                    <Box></Box>
                  )}

                  {nftData && ownerProfile && collectionName && imagePath && (
                    <ModalBid
                      handleCloseModal={handleCloseModalBid}
                      handleOpenModal={handleOpenModalBid}
                      open={openModalBid}
                      onSubmit={handlePlaceABid}
                      nftData={nftData}
                      imagePath={imagePath}
                      seller={ownerProfile}
                      collectionName={collectionName}
                    ></ModalBid>
                  )}
                </Stack>
              </Stack>
            </Container>
          </Container>
          <YesNoModal
            open={openDialogDelist}
            handleClose={handleCloseDialogDelist}
            question={'Are you accept delist this nft!'}
            title='Delist item'
            handleAccept={handleDelistItem}
          ></YesNoModal>
        </Box>
      )}
    </>
  )
}

View.Layout = MainLayout
export default View
