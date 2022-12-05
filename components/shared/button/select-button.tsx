import { StyledSvgIcon } from '@/styles/custome-mui'
import { Box, ButtonBase, Stack, SvgIcon, Typography } from '@mui/material'
import Image from 'next/image'
import { Wrapper } from '../wrapper/wrapper'
// import ImgUploadIcon from '../../public/images/create/add.svg'
import React from 'react'
export interface SelectButtonProps {
  mainText: string
  subText?: string
  // onclick: any
  isChecked: boolean
  image: any
  typeImage: string
  name: string
  value: string
  setFieldValue: (field: string, value: string) => void
  size: 'small' | 'large'
  [key: string]: any
}

function SelectButton({
  name,
  value,
  mainText,
  subText,
  isChecked,
  image,
  typeImage,
  setFieldValue,
  size = 'small',
  ...props
}: SelectButtonProps) {
  return (
    <ButtonBase {...props} onClick={() => setFieldValue(name, value)}>
      <Stack
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{
          border: '2px solid',
          borderColor: `${isChecked ? 'primary.main' : 'border.main'}`,
          borderRadius: '12px',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'primary.main',
          },
          minWidth: size === 'small' ? '120px' : '191px',
          minHeight: size === 'small' ? '120px' : '191px',
        }}
      >
        {typeImage && typeImage === 'svg' ? (
          <StyledSvgIcon
            component={image}
            viewBox={size === 'large' ? '0 0 64 64' : '0 0 28 28'}
            sx={{
              color: isChecked ? 'white' : 'text.secondary',
              // fill: isChecked ? 'white' : 'text.secondary',
            }}
          />
        ) : (
          <Image src={image} alt='aioz-image'></Image>
        )}

        <Typography
          variant={size === 'small' ? 'subtitle1' : 'h3'}
          sx={{
            width: 'min-content',
            marginTop: '13px',
            marginBottom: '4px',
            textAlign: 'center',
            wordWrap: 'break-word',
            color: subText ? 'white' : !isChecked ? 'text.secondary' : 'white',
          }}
        >
          {mainText}
        </Typography>
        <Typography variant='body1'>{subText}</Typography>
      </Stack>
    </ButtonBase>
  )
}
export default React.memo(SelectButton)
