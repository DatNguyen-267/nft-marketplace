import { Box, Typography } from '@mui/material'

type Props = {
  tokenId?: string
  name?: string
  gateway?: string
}

const NftName = ({ tokenId, name, gateway }: Props) => {
  return (
    <Box>
      {name ? (
        <Typography
          variant='h2'
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
      ) : (
        <Typography component='span' variant='h2'>
          ...
        </Typography>
      )}
      <Typography variant='h2' component='span' color='primary'>
        {' #'}
        {tokenId}
      </Typography>
    </Box>
  )
}

export default NftName
