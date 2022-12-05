import YesNoModal from '@/components/shared/modal/yes-no-modal'
import useMarket from '@/hooks/ZeroX/useMarket'
import { FormSellNFT, NftData } from '@/models/index'
import { StyledButtonSvgIcon, StyledSvgIcon } from '@/styles/custome-mui'
import { ImagesCreatorPage } from '@/utils/images'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import { Menu, MenuItem, Stack, Typography } from '@mui/material'
import NftLabel from '@/components/page-components/creator/label'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import ModalSellNft from '../modal-sale-nft'

type Props = {
  isOwner: boolean
  status: 'Minted' | 'Acquired' | 'Sale'
  onSubmit: (values: FormSellNFT) => Promise<any>
  onReload: () => void
  data: NftData
}

const CollectiblesHeading = ({
  isOwner = false,
  status = 'Minted',
  data,
  onSubmit,
  onReload,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // Func open, close menu
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleCloseMenu = () => setAnchorEl(null)

  // Func Modal
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModalSell = () => setOpenModal((prev) => true)
  const handleCloseModal = () => setOpenModal((prev) => false)

  // Func open, close dialog remove nft
  const [openRemoveNft, setOpenRemoveNft] = useState<boolean>(false)
  const handleOpenYesNoModal = () => setOpenRemoveNft(true)
  const handleCloseYesNoModal = () => setOpenRemoveNft(false)
  const { delistNft } = useMarket()

  const handleRemoveOrder = async () => {
    try {
      await delistNft({
        idNft: data.nft._id,
        orderBids: data.orderBids,
        idOrder: data.order?._id,
        isAcquired: data.nft.isAcquired,
      })
      onReload()
      toast.success('Remove NFT from market success')
      handleCloseYesNoModal()
    } catch (error) {
      toast.error('Remove NFT from market error!')
    }
  }
  return (
    <>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          margin: '0 4px 0px 9px',
          minHeight: '30.3px',
        }}
      >
        <Stack direction='row' alignItems='center'>
          {status === 'Acquired' ? (
            <StyledSvgIcon
              component={ImagesCreatorPage.Money}
              sx={{
                marginRight: '6px',
              }}
            ></StyledSvgIcon>
          ) : status === 'Sale' ? (
            <NftLabel>Sale</NftLabel>
          ) : (
            <StyledSvgIcon
              component={ModeOutlinedIcon}
              sx={{
                marginRight: '6px',
                width: '15px',
                height: '15px',
              }}
            ></StyledSvgIcon>
          )}
          {status !== 'Sale' && (
            <Typography
              variant='subtitle2'
              sx={{ lineHeight: 'inhirit', color: 'common.white' }}
            >
              {status}
            </Typography>
          )}
        </Stack>

        <Stack direction='row' alignItems='center'>
          <StyledButtonSvgIcon
            sx={{
              marginRight: '6px',
            }}
          >
            <StyledSvgIcon
              component={ImagesCreatorPage.Heart}
              sx={{
                width: '14px',
                height: '12px',
              }}
            ></StyledSvgIcon>
          </StyledButtonSvgIcon>
          <Typography variant='body2' color='common.white'>
            134
          </Typography>

          {/* BUTTON MENU */}
          {isOwner && (
            <>
              {' '}
              <StyledButtonSvgIcon
                sx={{ marginLeft: '3px' }}
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <StyledSvgIcon component={ImagesCreatorPage.SmallMore}></StyledSvgIcon>
              </StyledButtonSvgIcon>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {status === 'Acquired' && (
                  <MenuItem
                    onClick={() => {
                      handleCloseMenu()
                      handleOpenModalSell()
                    }}
                  >
                    Sell this item
                  </MenuItem>
                )}
                {status === 'Minted' && (
                  <MenuItem
                    onClick={() => {
                      handleCloseMenu()
                      handleOpenModalSell()
                    }}
                  >
                    Sell this item
                  </MenuItem>
                )}
                {status === 'Sale' && (
                  <MenuItem onClick={handleOpenYesNoModal}>Remove from market</MenuItem>
                )}
                <MenuItem onClick={handleCloseMenu} disabled={isOwner}>
                  Report
                </MenuItem>
              </Menu>
            </>
          )}
        </Stack>

        {/* Dialog remove nft */}
      </Stack>
      <ModalSellNft
        open={openModal}
        onSubmit={onSubmit}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModalSell}
      ></ModalSellNft>
      <YesNoModal
        open={openRemoveNft}
        handleClose={handleCloseYesNoModal}
        question={`Are you accept remove nft ${data.nft.title} from market`}
        title='Remove NFT from market'
        handleAccept={handleRemoveOrder}
      ></YesNoModal>
    </>
  )
}

export default CollectiblesHeading
