import { hooks } from '@/connectors/metaMask'
import { truncateAddress } from '@/utils/convert'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import SearchIcon from '@mui/icons-material/Search'
import {
  Avatar,
  Button,
  ButtonBase,
  Container,
  Divider,
  IconButton,
  InputBase,
  Link as MuiLink,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'

import AccountBoxIcon from '@mui/icons-material/AccountBox'
import CollectionsIcon from '@mui/icons-material/Collections'
import Logout from '@mui/icons-material/Logout'
import { Box } from '@mui/system'
import { ProfileContext } from 'context/profile-context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getName } from 'pages/login/utils'
import { StyledSvgIcon } from '@/styles/custome-mui'
import { Icon } from '@/utils/images'
import { useAppDispatch } from '@/redux/hook'
import { authActions } from '@/redux/slices/auth'
export interface IHeaderProps {}
const navbar = [
  {
    name: 'Home',
    list: [],
    type: 'link',
    src: '/',
  },
  {
    name: 'Create',
    list: [],
    type: 'link',
    src: '/create',
  },
]

export default function Header(props: IHeaderProps) {
  // const { useAccounts, useChainId, useIsActive, useProvider } = hooks
  const { connector, account, accounts, isActive } = useWeb3React()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const handleLogout = async () => {
    dispatch(authActions.logout())
    if (connector?.deactivate) {
      void connector.deactivate()
    } else {
      void connector.resetState()
    }
  }
  return (
    <Box
      sx={{
        marginBottom: '25px',
      }}
    >
      <Container maxWidth='xl'>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='center'
          flexWrap='wrap'
          sx={{
            width: '100%',
            minHeight: '100px',
            // padding: { xs: '1rem', sm: '1rem', md: '1rem', lg: '0 40px' },
            // maxWidth: { lg: '1920px' },
          }}
        >
          {/* Icon */}
          <Link href='/' passHref>
            <Box
              component='img'
              src='https://testnet.aioz.art/assets/images/logo-art.svg'
              sx={{ cursor: 'pointer' }}
            />
          </Link>

          {/* Search */}
          {/* <Box
            sx={{
              marginLeft: '40px',
              display: { xs: 'none', sm: 'none', md: 'flex' },
            }}
          >
            <Stack
              direction='row'
              alignItems='center'
              sx={{
                border: '1px solid',
                borderColor: 'border.main',
                borderRadius: '8px',
                padding: '14px 20px',
                width: { md: '450px', xl: '500px' },
                height: '48px',
              }}
            >
              <IconButton
                disableRipple={true}
                sx={{ marginRight: '20px', width: '20px', height: '20px' }}
              >
                <SearchIcon sx={{ color: 'white' }}></SearchIcon>
              </IconButton>
              <InputBase
                sx={{
                  fontSize: '12px',
                  lineHeight: '14px',
                  color: 'common.white',
                  width: '100%',
                  fontWeight: 400,
                  letterSpacing: '0.05rem',
                  '&::placeholder': {
                    color: 'white',
                  },
                }}
                placeholder='Search items, collections, and accounts'
              ></InputBase>
            </Stack>
          </Box> */}

          {/* Navbar */}
          <Stack
            direction='row'
            sx={{
              marginLeft: '50px',
              fontSize: '14px',
            }}
            alignItems='center'
          >
            {navbar &&
              navbar.map((item, index) => {
                if (item.type == 'link')
                  return (
                    <Link passHref href={item.src} key={index}>
                      <MuiLink
                        sx={{
                          lineHeight: '17px',
                          fontWeight: '300',
                          fontSize: '14px',
                          color: 'common.white',
                          letterSpacing: '0.04em',
                          marginRight: '50px',
                          cursor: 'pointer',
                        }}
                      >
                        {item.name}
                      </MuiLink>
                    </Link>
                  )
              })}
          </Stack>

          {/* Sign In and Wallet */}

          <Stack flexGrow={1} justifyContent='right' direction='row' alignItems='center'>
            {isActive && accounts ? (
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
                onClick={handleOpenMenu}
              >
                <Typography variant='body2' sx={{ cursor: 'pointer' }}>
                  {truncateAddress(accounts[0], 'MATCH44')}
                </Typography>
                <Button variant='text' sx={{ padding: 0, marginBottom: 0 }}>
                  <Avatar
                    src={
                      'https://pbs.twimg.com/profile_images/1517186685385117703/LNuU39QI_400x400.jpg'
                    }
                    sx={{
                      bgcolor: 'primary.main',
                      width: '32px',
                      height: '32px',
                      marginLeft: '4px',
                      fontSize: '14px',
                    }}
                  >
                    OP
                  </Avatar>
                </Button>
              </Stack>
            ) : (
              <Link
                href={`/login?from=${router.asPath.slice(1, router.asPath.length)}`}
                passHref
              >
                <Button
                  variant='text'
                  sx={{
                    fontSize: '14px',
                    lineHeight: '18px',
                    fontWeight: 500,
                    fontFamily: 'Rubik, sans-serif',
                    color: 'common.white',
                    textAlign: 'center',
                  }}
                  endIcon={
                    <StyledSvgIcon
                      component={Icon.Wallet}
                      sx={{ width: '24px', height: '23px' }}
                    ></StyledSvgIcon>
                  }
                >
                  Sign in
                </Button>
              </Link>
            )}
            {isActive && accounts && (
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem sx={{ padding: 0 }}>
                  <Link href={`/creator/${account}`} passHref>
                    <Stack
                      direction='row'
                      alignItems='center'
                      sx={{
                        margin: '8px 16px',
                        padding: 0,
                        width: '100%',
                      }}
                    >
                      <ListItemIcon>
                        <CollectionsIcon fontSize='small' />
                      </ListItemIcon>
                      My Collectibles
                    </Stack>
                  </Link>
                </MenuItem>
                <Divider />
                <MenuItem sx={{ padding: 0 }}>
                  <ButtonBase onClick={handleLogout}>
                    <Stack
                      direction='row'
                      alignItems='center'
                      sx={{
                        margin: '8px 16px',
                        padding: 0,
                        width: '100%',
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize='small' />
                      </ListItemIcon>
                      Logout
                    </Stack>
                  </ButtonBase>
                </MenuItem>
              </Menu>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
