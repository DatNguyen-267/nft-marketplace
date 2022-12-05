import useMarket from '@/hooks/ZeroX/useMarket'
import { FormSellNFT } from '@/models/form'
import { NftData } from '@/models/nft'
import { StyledButtonSvgIcon, StyledSvgIcon } from '@/styles/custome-mui'
import { AIOZ_ADDRESS } from '@/utils/address'
import { convertIpfsUrl, toWei, truncateAddress } from '@/utils/convert'
import { ImagesCreatorPage } from '@/utils/images'
import { getTimeWithFormat } from '@/utils/time'
import { Box, Stack, Typography } from '@mui/material'
import { BigNumber, ethers } from 'ethers'
import Link from 'next/link'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import CollectiblesHeading from './header/collectibles-header'
import SaleHeading from './header/sale-header'

type Props = {
  isOwner: boolean
  tag: 'Collectibles' | 'On Sale' | 'Collections'
  data: NftData
  onReload?: () => void
}

const NftItem = ({
  isOwner = false,
  tag = 'Collectibles',
  data,
  onReload = () => {},
}: Props) => {
  const { sellNftWithAuctionTime, sellNftWithFixedPrice } = useMarket()

  // Func Submit sell nft
  const onSubmitSellNft = async (values: FormSellNFT): Promise<any> => {
    try {
      if (values.price) {
        if (values.typePutOnMarket === 'fixed-price')
          await sellNftWithFixedPrice({
            tokenId: data.nft.tokenId,
            price: values.price,
            tokenExchangeAddress: AIOZ_ADDRESS.WAIOZ,
            collectionAddress: data.nft.cltAddress,
          })
        else
          await sellNftWithAuctionTime({
            tokenId: data.nft.tokenId,
            price: values.price,
            collectionAddress: data.nft.cltAddress,
            expirationDate: values.expirationDate,
            startingDate: values.startingDate,
            minimunBid: toWei(values.minimumBid),
            tokenExchangeAddress: AIOZ_ADDRESS.WAIOZ,
          })
        onReload()
        return Promise.resolve()
      } else return Promise.reject()
    } catch (error) {
      console.log(error)
      return Promise.reject()
    }
  }
  return ()
  // return (
  //   <Box
  //     sx={{
  //       border: '1px solid',
  //       borderRadius: '6px',
  //       borderColor: 'border.dark',
  //       padding: '0px 0 12px 0',
  //       height: ' 100%',
  //     }}
  //   >
  //     <Stack>
  //       {/* Heading */}

  //       {tag === 'On Sale' ? (
  //         <SaleHeading
  //           status={data && data.bid ? 'Bid' : 'Fixed Price'}
  //           auctionTime={data && data.bid && data.bid.auctionTime}
  //         ></SaleHeading>
  //       ) : (
  //         <CollectiblesHeading
  //           status={
  //             data && data.nft && data.nft.status === 'Minted'
  //               ? 'Minted'
  //               : data.nft.status === 'Sale'
  //               ? 'Sale'
  //               : 'Acquired'
  //           }
  //           isOwner={isOwner}
  //           onSubmit={onSubmitSellNft}
  //           data={data}
  //           onReload={onReload}
  //         ></CollectiblesHeading>
  //       )}

  //       {/* Image */}
  //       <Link passHref href={`view/${data.nft._id}`}>
  //         <Box
  //           component='a'
  //           sx={{
  //             cursor: 'pointer',
  //             backgroundColor: 'common.black',
  //             position: 'relative',
  //             paddingBottom: '100%',
  //             overflow: 'hidden',
  //             height: 0,
  //             '& .lazy-load-image-background': {
  //               position: 'relative',
  //               paddingBottom: '100%',
  //               overflow: 'hidden',
  //               width: '100%',
  //               height: '100%',
  //             },
  //           }}
  //         >
  //           {data && data.ipfsData ? (
  //             <Box
  //               component={LazyLoadImage}
  //               src={`${convertIpfsUrl(data.ipfsData.image)}`}
  //               sx={{
  //                 position: 'absolute',
  //                 top: 0,
  //                 left: 0,
  //                 width: '100%',
  //                 height: '100%',
  //                 objectFit: 'contain',
  //                 objectPosition: 'center',
  //               }}
  //               effect='blur'
  //             ></Box>
  //           ) : (
  //             <Box></Box>
  //           )}
  //         </Box>

  //         {/* {data.image && (
  //           <Box
  //             component="div"
  //             sx={{
  //               // backgroundImage: `url(./images/creator/firmino1.png)`,
  //               backgroundImage: `url(https://ipfs.io/ipfs/${data.image ? data.image : 'null'})`,
  //               paddingTop: '100%',
  //               backgroundPosition: 'center',
  //               backgroundSize: 'contain',
  //               backgroundRepeat: 'no-repeat',
  //             }}
  //           ></Box>
  //         )} */}
  //         {/* {!data.image && (
  //           <Box
  //             component="div"
  //             sx={{
  //               backgroundImage: `url(./images/creator/firmino1.png)`,
  //               // backgroundImage: `url(https://ipfs.io/ipfs/${data.image ? data.image : 'null'})`,
  //               paddingTop: '100%',
  //               backgroundPosition: 'center',
  //               backgroundSize: 'contain',
  //               backgroundRepeat: 'no-repeat',
  //             }}
  //           ></Box>
  //         )} */}
  //       </Link>

  //       {/* Footer */}
  //       <Box
  //         sx={{
  //           margin: '10px 8px 0 8px',
  //         }}
  //       >
  //         {/* Name NFT */}
  //         <Link passHref href={`view/${data.nft._id}`}>
  //           <Box component='a'>
  //             <Typography
  //               variant='body1'
  //               sx={{
  //                 marginBottom: '4px',
  //                 cursor: 'pointer',
  //                 overflow: 'hidden',
  //                 textOverflow: 'ellipsis',
  //                 color: 'myColor.foggy',
  //                 display: '-webkit-box',
  //                 ['-webkit-line-clamp']: '2',
  //                 ['-webkit-box-orient']: 'vertical',
  //                 wordWrap: 'break-word',
  //               }}
  //             >
  //               {data.ipfsData ? data.ipfsData.name : 'Unknown'} {' #'}
  //               {data.nft.tokenId}
  //             </Typography>
  //           </Box>
  //         </Link>

  //         {/* Price NFT */}

  //         {data.nft.status === 'Sale' && (
  //           <Stack direction='row' alignItems='baseline'>
  //             {data.bid && data.highestBid && tag === 'Collectibles' ? (
  //               <Typography
  //                 variant='h3'
  //                 sx={{ fontSize: '10px', letterSpacing: '0.05em', lineHeight: '11px' }}
  //               >
  //                 Highest Bid {ethers.utils.formatEther(BigNumber.from(data.highestBid))}{' '}
  //                 WAIOZ
  //               </Typography>
  //             ) : (
  //               <>
  //                 <StyledButtonSvgIcon
  //                   variant='text'
  //                   sx={{
  //                     marginRight: '3px',
  //                   }}
  //                   startIcon={
  //                     <StyledSvgIcon
  //                       component={ImagesCreatorPage.GroupLine}
  //                       sx={{
  //                         width: '8px',
  //                         height: '12px',
  //                       }}
  //                     ></StyledSvgIcon>
  //                   }
  //                 ></StyledButtonSvgIcon>
  //                 <Typography variant='h3'>{data.nft.price}</Typography>
  //               </>
  //             )}
  //           </Stack>
  //         )}
  //         {data.nft.status != 'Sale' && (
  //           <Stack direction='row' alignItems='baseline'>
  //             <Typography variant='h3'>Not for sale</Typography>
  //           </Stack>
  //         )}

  //         {/* Infomation NFT */}
  //         {tag === 'Collectibles' && (
  //           <>
  //             {data.nft.status != 'Sale' && (
  //               <>
  //                 <Box component='a' href='#' sx={{ display: 'block' }}>
  //                   <Typography
  //                     variant='body2'
  //                     color='myColor.foggy'
  //                     sx={{
  //                       marginTop: '8px',
  //                       display: 'inline-block',
  //                       marginRight: '4px',
  //                     }}
  //                   >
  //                     {truncateAddress(data.nft.cltAddress, 'MATCH44')}
  //                   </Typography>
  //                   <StyledButtonSvgIcon
  //                     startIcon={
  //                       <StyledSvgIcon
  //                         component={ImagesCreatorPage.SmallLink}
  //                       ></StyledSvgIcon>
  //                     }
  //                   ></StyledButtonSvgIcon>
  //                 </Box>
  //                 <Typography
  //                   variant='tinyBody'
  //                   color='myColor.cement'
  //                   sx={{ marginTop: '8px', fontSize: '8px' }}
  //                 >
  //                   {getTimeWithFormat(data.nft.createdAt)} UTC
  //                 </Typography>
  //               </>
  //             )}
  //             {data.nft.status == 'Sale' && data.bid && (
  //               <>
  //                 <Typography
  //                   variant='body2'
  //                   color='myColor.foggy'
  //                   sx={{ marginTop: '8px', fontSize: '8px' }}
  //                 >
  //                   Min bid {data.bid.minBidAmount} WAIOZ
  //                 </Typography>
  //                 <Typography
  //                   variant='tinyBody'
  //                   color='myColor.cement'
  //                   sx={{ marginTop: '8px', fontSize: '8px' }}
  //                 >
  //                   End in {getTimeWithFormat(data.bid.auctionTime)} UTC
  //                 </Typography>
  //               </>
  //             )}
  //           </>
  //         )}
  //         {tag === 'On Sale' && data.bid && (
  //           <Typography variant='body2' color='myColor.foggy' sx={{ marginTop: '8px' }}>
  //             Bid {data.bid.minBidAmount} WAIOZ
  //           </Typography>
  //         )}
  //       </Box>
  //     </Stack>
  //   </Box>
  // )
}

export default NftItem
