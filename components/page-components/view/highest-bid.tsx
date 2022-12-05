import React, { useEffect } from 'react'
import { Avatar, Box, Button, Stack, SvgIcon, Typography } from '@mui/material'
import { StyledSvgIcon } from '@/styles/custome-mui'
import { ImagesViewPage } from '@/utils/images'
import { Profile, Order } from '@/models/index'
import { ethers } from 'ethers'
import { toEther, truncateAddress } from '@/utils/_index'
type Props = {
  altAvatar?: string
  profileBidder: Profile
  orderBid: Order
  [key: string]: any
}

const HighestBid = ({ altAvatar, profileBidder, orderBid, ...props }: Props) => {
  return (
    <Box {...props}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Stack direction='row' alignItems='center'>
          <Avatar
            sx={{ width: '40px', height: '40px' }}
            alt={altAvatar ? altAvatar : 'AIOZ art'}
            src={
              profileBidder && profileBidder.profilePicture
                ? profileBidder.profilePicture
                : '/images/view/aioz_avatar.png'
            }
          />
          <Box ml={1}>
            <Typography variant='subtitle1' component='span'>
              {toEther(orderBid.erc20TokenAmount).toString()} AIOZ
            </Typography>
            <Typography variant='body2' component='span'>
              {' '}
              for 1 edition
            </Typography>

            <Box>
              <Typography variant='body2' component='span'>
                by{' '}
              </Typography>
              <Typography variant='subtitle1' component='span' color='common.white'>
                {profileBidder.displayName
                  ? profileBidder.displayName
                  : truncateAddress(profileBidder.walletAddress)}
              </Typography>
            </Box>
          </Box>
        </Stack>

        {/* Highest price */}
        <Box>
          <Stack direction='row' alignItems='center'>
            <StyledSvgIcon component={ImagesViewPage.GroupView}></StyledSvgIcon>
            <Stack
              direction='column'
              justifyContent='center'
              alignItems='flex-end'
              ml={1}
            >
              <Typography variant='subtitle1' color='myColor.cement'>
                HIGHEST BID
              </Typography>
              <Typography variant='h1' color='myColor.foggy'>
                {toEther(orderBid.erc20TokenAmount).toString()}
              </Typography>
              <Typography variant='subtitle1' color='myColor.foggy'>
                ~24.52$
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default HighestBid
