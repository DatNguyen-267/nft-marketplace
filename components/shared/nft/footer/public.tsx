import { NftData } from '@/models/nft'
import { StyledSvgIcon } from '@/styles/custome-mui'
import { toEther } from '@/utils/convert'
import { ImagesCreatorPage } from '@/utils/images'
import { ColorTheme } from '@/utils/theme'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import NftName from '../name'

type Props = {
  name?: string
  description?: string
  price?: string
  tokenId?: string
  tokenUri?: string
}

const PublicNftFooter = ({ name, tokenId, tokenUri, description, price }: Props) => {
  return (
    <Box>
      {/* Name NFT */}
      <NftName name={name} tokenId={tokenId} />
      {/* Price */}
      <Box>
        {price && (
          <Box mt={1}>
            <StyledSvgIcon
              component={ImagesCreatorPage.GroupLine}
              sx={{
                width: '20px',
                height: '20px',
                color: ColorTheme.primary,
              }}
            ></StyledSvgIcon>
            <Typography variant='h3' component='span'>
              {/* Price: */}
            </Typography>{' '}
            <Typography variant='h2' component='span' color='primary'>
              {price ? toEther(price) : ''}
            </Typography>
          </Box>
        )}
        <Box mt={1}>
          <Typography variant='subtitle1'>Description</Typography>
          <Typography
            mt={1}
            variant='body1'
            component='span'
            color='info'
            sx={{
              wordWrap: 'break-word',
            }}
          >
            {description}
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography variant='subtitle1'>TokenUri</Typography>
          <Typography
            mt={1}
            variant='body1'
            component='span'
            color='info'
            sx={{
              wordWrap: 'break-word',
            }}
          >
            {tokenUri}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default PublicNftFooter
