import { Metadata } from '@/models/ipfs'
import { Box, Typography } from '@mui/material'
import axiosClient from 'apis/axiosClient'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Props = {
  tokenId?: string
  name?: string
  gateway?: string
}

const NftName = ({ tokenId, name, gateway }: Props) => {
  return (
    <Box>
      <Typography
        variant='h1'
        sx={{
          marginBottom: '4px',
          cursor: 'pointer',
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
          // color: 'myColor.foggy',
          // display: '-webkit-box',
          // ['-webkit-line-clamp']: '2',
          // ['-webkit-box-orient']: 'vertical',
          // wordWrap: 'break-word',
        }}
        component='span'
      >
        {name}
      </Typography>
      <Typography variant='h1' component='span' color='primary'>
        {' #'}
        {tokenId}
      </Typography>
    </Box>
  )
}

export default NftName
