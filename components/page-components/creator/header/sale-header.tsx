import { StyledButtonSvgIcon, StyledSvgIcon } from '@/styles/custome-mui'
import { ImagesCreatorPage } from '@/utils/images'
import { convertTimeToString, countDownDateTime, MyTime } from '@/utils/time'
import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
type Props = {
  status: 'Bid' | 'Fixed Price'
  auctionTime?: number
}
const SaleHeading = ({ status = 'Fixed Price', auctionTime }: Props) => {
  const [countDown, setCountDown] = useState<MyTime | null>(
    auctionTime ? countDownDateTime(auctionTime) : null
  )

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | null = null
    if (auctionTime && status === 'Bid') {
      interval = setInterval(() => {
        setCountDown(() => {
          const newCountDown = countDownDateTime(auctionTime)
          return newCountDown
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [auctionTime])
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      sx={{
        margin: '0 4px 0px 9px',
        minHeight: '30.3px',
      }}
    >
      <Stack direction='row' alignItems='center'>
        {status === 'Bid' ? (
          <>
            <StyledSvgIcon
              component={ImagesCreatorPage.Live}
              sx={{
                marginRight: '6px',
              }}
            ></StyledSvgIcon>
            <Typography
              variant='subtitle2'
              sx={{ lineHeight: 'inhirit', color: 'common.white' }}
            >
              {countDown &&
                convertTimeToString(
                  countDown.day,
                  countDown.hour,
                  countDown.minute,
                  countDown.second
                )}
            </Typography>
          </>
        ) : (
          <Typography variant='tinyBody' color='white'>
            {' '}
            Fixed Price
          </Typography>
          // <StyledSvgIcon
          //   component={ImagesCreatorPage.Clock}
          //   sx={{
          //     marginRight: '6px',
          //   }}
          // ></StyledSvgIcon>
        )}
      </Stack>
      <Stack direction='row' alignItems='center'>
        {/* {!isOwner && (
          <StyledButtonSvgIcon
            sx={{
              marginRight: '6px',
            }}
          >
            <StyledSvgIcon component={ImagesCreatorPage.Lock}></StyledSvgIcon>
          </StyledButtonSvgIcon>
        )} */}

        <StyledButtonSvgIcon
          sx={{
            marginRight: '6px',
          }}
        >
          <StyledSvgIcon
            component={ImagesCreatorPage.Heart}
            sx={{
              width: '14px',
              height: '12px',
            }}
          ></StyledSvgIcon>
        </StyledButtonSvgIcon>

        <Typography variant='body2' color='common.white'>
          134
        </Typography>
        {/* {isOwner && (
          <>
            {' '}
            <StyledButtonSvgIcon
              sx={{ marginLeft: '3px' }}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <StyledSvgIcon component={ImagesCreatorPage.SmallMore}></StyledSvgIcon>
            </StyledButtonSvgIcon>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleOpenModal}>Sell this item</MenuItem>
              <MenuItem onClick={handleClose}>Share</MenuItem>
              <MenuItem onClick={handleClose} disabled={isOwner}>
                Report
              </MenuItem>
            </Menu>
          </>
        )} */}
      </Stack>
    </Stack>
  )
}
export default SaleHeading
