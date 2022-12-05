import { Box, Button, Typography } from '@mui/material'
import { HomeTag } from 'pages'
import React, { ReactNode } from 'react'

type Props = {
  startIcon: any
  text: HomeTag
  isSelected: boolean
  handleSelect: (selectedTag: HomeTag) => void
}

const TagsButton = ({ startIcon, text, isSelected, handleSelect }: Props) => {
  return (
    <Button
      variant='outlined'
      // startIcon={startIcon}
      sx={{
        padding: '10px 16px',
        backgroundColor: !isSelected ? 'inherit' : 'myColor.grey',
        color: !isSelected ? 'inherit' : 'white',
        borderColor: !isSelected ? 'myColor.grey' : 'myColor.grey',
        '&:hover': {
          backgroundColor: !isSelected ? 'inherit' : 'myColor.grey',
          color: !isSelected ? 'inherit' : 'white',
          borderColor: !isSelected ? 'inherit' : 'myColor.grey',
        },
      }}
      onClick={() => handleSelect(text)}
    >
      <Typography variant='h3' textAlign='center'>
        {text}
      </Typography>
    </Button>
  )
}

export default TagsButton
