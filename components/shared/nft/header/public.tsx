import { StyledButtonSvgIcon, StyledSvgIcon } from '@/styles/custome-mui'
import { ImagesCreatorPage } from '@/utils/images'
import { convertTimeToString, countDownDateTime, MyTime } from '@/utils/time'
import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

type Props = {
  status: 'Bid' | 'Fixed Price'
  auctionTime?: number
}
const PublicNftHeader = ({ status = 'Fixed Price', auctionTime }: Props) => {
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
    <Stack direction='row' alignItems='baseline'>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          padding: '2px 4px 0px 9px',
          minHeight: '30.3px',
          width: '100%',
        }}
      >
        <Stack direction='row' alignItems='center'>
          <Typography variant='tinyBody' color='white'>
            {' '}
            Fixed Price
          </Typography>
        </Stack>
        <Stack direction='row' alignItems='center'>
          {/* <StyledButtonSvgIcon
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
            0
          </Typography> */}
        </Stack>
      </Stack>
    </Stack>
  )
}
export default PublicNftHeader
