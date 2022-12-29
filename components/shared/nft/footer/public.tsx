import { toEther } from '@/utils/convert'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
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
          <Stack alignItems='center' direction='row' mt={1}>
            {/* <StyledSvgIcon
              component={ImagesCreatorPage.GroupLine}
              sx={{
                width: '20px',
                height: '20px',
              }}
            ></StyledSvgIcon> */}
            <Image
              width={22}
              height={22}
              src='https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png'
            ></Image>
            {/* <Typography variant='h3' component='span'>
              Price:
            </Typography>{' '} */}
            <Typography variant='h2' component='span' color='primary' ml={1 / 2}>
              {price ? toEther(price) : ''}
            </Typography>
          </Stack>
        )}
        <Box mt={1}>
          <Typography variant='subtitle1'>Description:</Typography>
          {description ? (
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
          ) : (
            <Typography component='span'>...</Typography>
          )}
        </Box>
        <Box mt={1}>
          <Typography variant='subtitle1'>TokenUri:</Typography>
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
