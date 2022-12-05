import { Box, Stack, Typography } from '@mui/material'
import SaleHeading from '@/components/page-components/creator/header/sale-header'
import React from 'react'
import Link from 'next/link'
import { NftData } from '@/models/nft'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { convertIpfsUrl } from '@/utils/convert'
import { Icon, Images } from '@/utils/images'
import { StyledSvgIcon } from '@/styles/custome-mui'

type Props = {
  nftData: NftData
}

const NftLiveAuction = ({ nftData }: Props) => {
  return (
    <Box>
      <Stack>
        {
          <SaleHeading
            status='Bid'
            auctionTime={
              nftData.bid && nftData.bid.auctionTime ? nftData.bid.auctionTime : undefined
            }
          ></SaleHeading>
        }
        <Link passHref href={`view/${nftData.nft._id}`}>
          <Box
            component='a'
            sx={{
              cursor: 'pointer',
              backgroundColor: 'common.black',
              position: 'relative',
              paddingBottom: '100%',
              overflow: 'hidden',
              height: 0,
              '& .lazy-load-image-background': {
                position: 'relative',
                paddingBottom: '100%',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
              },
            }}
          ></Box>
        </Link>
      </Stack>
    </Box>
  )
}

export default NftLiveAuction
