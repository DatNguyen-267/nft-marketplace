import { countDownTime, fixTime, ImagesViewPage } from '@/utils/_index'
import { Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
type Props = {
  timeStamp?: number
}
type Time = {
  hour: number
  minute: number
  second: number
}

const AuctionTimeEnd = ({ timeStamp }: Props) => {
  const [countDown, setCountdown] = useState<Time | null>({
    hour: 0,
    minute: 0,
    second: 0,
  })
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | null = null
    if (timeStamp) {
      interval = setInterval(() => {
        setCountdown(() => countDownTime(timeStamp))
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timeStamp])
  return (
    <Stack direction='row' alignItems='center' justifyContent='center' mt={2}>
      <Typography variant='body1' textAlign='center'>
        Auction ends in
      </Typography>
      &nbsp;
      <Typography variant='h3' component='span' color='common.white'>
        {countDown &&
          fixTime(countDown?.hour) +
            ':' +
            fixTime(countDown?.minute) +
            ':' +
            fixTime(countDown?.second)}
      </Typography>
      &nbsp;
      <Image src={ImagesViewPage.Fire} />
    </Stack>
  )
}

export default AuctionTimeEnd
