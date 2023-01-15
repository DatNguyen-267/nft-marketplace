import { Box, Skeleton, Stack } from '@mui/material'
import { NftApi } from 'apis/nft'
import Image from 'next/image'
import { ReactNode, useState } from 'react'

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
  const [fetchImgError, setFetchImgError] = useState<any>(null)
  return (
    <Stack
      justifyContent='space-between'
      sx={{
        border: '1px solid',
        borderRadius: '6px',
        borderColor: 'border.dark',
        padding: '0px 0 12px 0',
        height: ' 100%',
        overflow: 'hidden',
      }}
    >
      <Stack>
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
          <Image
            src={srcImg ? NftApi.getUrlImage(srcImg) : ''}
            layout='fill'
            objectFit='cover'
            objectPosition='center'
            onError={(err) => setFetchImgError(err)}
            onLoadingComplete={() => setFetchImgError(null)}
          ></Image>
          {fetchImgError && (
            <Skeleton
              variant='rectangular'
              animation='wave'
              sx={{
                zIndex: '999',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '100%',
              }}
            />
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            margin: '10px 8px 0 8px',
          }}
        >
          {footer}
        </Box>
      </Stack>
      <Stack
        sx={{
          margin: '10px 8px 0 8px',
        }}
      >
        {children}
      </Stack>
    </Stack>
  )
}

export default NftWrapper
