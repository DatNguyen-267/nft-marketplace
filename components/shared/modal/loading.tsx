import { StyledSvgIcon } from '@/styles/custome-mui'
import { Images } from '@/utils/images'
import { Box, keyframes, Stack, SvgIcon } from '@mui/material'
import React from 'react'

type Props = {}
const myKeyframe = keyframes`
  from {
      transform:rotate(0deg);
  }
  to {
      transform:rotate(360deg);
  }
`
const Loading = (props: Props) => {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      sx={{
        width: '100%',
        minHeight: '150px',
        height: '100%',
      }}
    >
      <SvgIcon
        component={Images.Loading}
        sx={{
          width: '35px',
          height: '35px',
          animation: `${myKeyframe} 1s infinite ease`,
          animationDuration: '1s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
          circle: {
            fill: 'none',
          },
        }}
      />
    </Stack>
  )
}

export default Loading
