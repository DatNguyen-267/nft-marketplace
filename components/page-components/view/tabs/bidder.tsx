import useMarket from '@/hooks/ZeroX/useMarket'
import { NftData } from '@/models/nft'
import { Order } from '@/models/order'
import { AIOZ_ADDRESS } from '@/utils/address'
import { FormatTime, getTimeWithFormat } from '@/utils/time'
import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { PageBlockContext } from 'context/page-block-context'
import { useWeb3React } from '@web3-react/core'

type Props = {
  nftData: NftData
  signedOrder: Order
  price: string
  name?: string
  time: number
  isOwner: boolean
  [key: string]: any
  handleReloadPageData: () => void
}

const Bidder = ({
  nftData,
  signedOrder,
  price,
  name,
  time,
  isOwner,
  handleReloadPageData,
  ...props
}: Props) => {
  const { AcceptOrderBidNft } = useMarket()
  const router = useRouter()
  const pageBlockContext = useContext(PageBlockContext)
  const { isActive } = useWeb3React()

  const handleAccept = async () => {
    try {
      if (nftData.bid && nftData.orderBids && nftData.bid._id) {
        await AcceptOrderBidNft({
          idOrder: nftData.order?._id,
          collectionAddress: nftData.nft.cltAddress,
          signedOrder: signedOrder,
          tokenId: nftData.nft.tokenId,
          orderBids: nftData.orderBids,
          idBid: nftData.bid._id,
          idNft: nftData.nft._id,
        })
        handleReloadPageData()
        return Promise.resolve()
      } else return Promise.reject()
    } catch (error) {
      return Promise.reject()
    }
  }
  return (
    <Box {...props} paddingBottom={2} paddingRight={2}>
      <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
        <Stack direction='row' alignItems='center'>
          <Avatar
            sx={{ width: '40px', height: '40px' }}
            alt='Remy Sharp'
            src='/images/view/aioz_avatar.png'
          ></Avatar>
          <Box ml={1}>
            <Typography variant='subtitle1' component='span'>
              {price} wAIOZ{' '}
              <Typography variant='body2' component='span'>
                by
              </Typography>{' '}
              {name}
            </Typography>
            <Typography variant='body2' color='myColor.cement' mt={1 / 2}>
              {getTimeWithFormat(time, FormatTime.format4)}
            </Typography>
          </Box>
        </Stack>
        {isOwner && (
          <Button
            variant='contained'
            color='primary'
            size='small'
            sx={{ padding: '4px 6px' }}
            onClick={
              async () => {
                if (isActive) {
                  pageBlockContext
                    ?.openPageBlock({
                      func: handleAccept(),
                      text: 'Accepting...',
                      success: 'Accept bid NFT success.',
                      error: 'Accept bid NFT error',
                    })
                    .finally(() => {})
                }
              }
              // () =>
              //   toast.promise(handleAccept(), {
              //     loading: 'Accepting...',
              //     success: <b>Sell NFT success.</b>,
              //     error: <b>Sell NFT fail.</b>,
              //   })
            }
          >
            Accept
          </Button>
        )}
      </Stack>
    </Box>
  )
}

export default Bidder
