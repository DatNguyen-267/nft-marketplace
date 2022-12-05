import React, { ReactElement, ReactNode } from 'react'
import { ButtonBase, Container, Stack, Typography, Button } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import Link from 'next/link'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'

type Props = {
  text?: string
  href: 'back' | string
  icon?: ReactElement
  sx?: any
}

const DirectionButton = ({ text, href, icon, sx }: Props) => {
  const Icon = icon
  const router = useRouter()
  const handleClick = () => {
    if (href === 'back') {
      router.back()
    } else if (href) router.push(href)
  }
  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'inline-block',
        }}
      >
        <Stack
          direction='row'
          alignItems='center'
          sx={{
            ...sx,
            color: 'text.secondary',
            cursor: 'pointer',
            '&:hover': {
              color: 'text.primary',
            },
          }}
        >
          <Button
            variant='text'
            startIcon={icon}
            disableRipple={true}
            sx={{
              // marginLeft: '18px',
              padding: '0',
              color: 'inherit',
              fontWeight: 500,
              fontSize: '14px',
              ':hover': {
                backgroundColor: 'none',
                transition: 'none',
              },
            }}
          >
            {text}
          </Button>
          {/* <Typography sx={{ marginLeft: '18px', color: 'inherit', fontWeight: 500, fontSize: '14px' }}>
        {text}
      </Typography> */}
        </Stack>
      </Box>
    </>
  )
}

export default DirectionButton
