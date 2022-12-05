import { NftData } from '@/models/nft'
import { convertIpfsUrl } from '@/utils/convert'
import { Box, Stack } from '@mui/material'
import { NftApi } from 'apis/nft'
import Link from 'next/link'
import { ReactNode } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

type Props = {
  isOwner?: boolean
  header: ReactNode
  footer: ReactNode
  onReload?: () => void
  id?: string
  name?: string
  description?: string
  srcImg?: string
  price?: string
  children: React.ReactNode
}

const NftWrapper = ({
  isOwner = false,
  header,
  footer,
  onReload = () => {},
  id,
  name,
  description,
  srcImg,
  price,
  children,
}: Props) => {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderRadius: '6px',
        borderColor: 'border.dark',
        padding: '2px 0 12px 0',
        height: ' 100%',
      }}
    >
      <Stack>
        {/* Header */}

        {header}
        {/* Image */}
        <Box
          component='div'
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
        >
          <Box
            component={LazyLoadImage}
            src={srcImg ? NftApi.getUrlImage(srcImg) : undefined}
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
        </Box>

        {/* Footer */}
        <Box
          sx={{
            margin: '10px 8px 0 8px',
          }}
        >
          {footer}
        </Box>
        <Stack
          sx={{
            margin: '10px 8px 0 8px',
          }}
        >
          {children}
        </Stack>
      </Stack>
    </Box>
  )
}

export default NftWrapper
