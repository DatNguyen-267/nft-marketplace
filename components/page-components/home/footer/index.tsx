import { NftData } from '@/models/nft'
import { StyledSvgIcon } from '@/styles/custome-mui'
import { toEther } from '@/utils/convert'
import { Icon } from '@/utils/images'
import { Box, Stack, Typography } from '@mui/material'
type Props = {
  nftData: NftData
}

const ExploreNftFooter = ({ nftData }: Props) => {
  return (
    <Box>
      <Stack mt={2} direction='row' justifyContent='space-between'>
        <Stack>
          <Typography variant='body2'>{nftData.NftMetadata?.metadata.name}</Typography>
          <Typography variant='subtitle1' mt='6px'>
            {nftData.nft.title}
          </Typography>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={1 / 2}>
          <StyledSvgIcon
            component={Icon.GroupLine}
            sx={{
              width: '10px',
              height: '13px',
              color: 'primary.main',
            }}
          ></StyledSvgIcon>
          <Typography
            variant='price'
            sx={{
              color: 'primary.main',
            }}
          >
            {nftData.order && nftData.order.erc20TokenAmount
              ? toEther(nftData.order?.erc20TokenAmount)
              : '00'}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction='row' justifyContent='right'>
        <Typography variant='body2'>offer for</Typography>
      </Stack>
    </Box>
  )
}

export default ExploreNftFooter
