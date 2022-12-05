import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { MainLayout } from '@/components/layout'
const Search = () => {
  return (
    <Box>
      <Container maxWidth='lg'>
        <Typography variant='h1' component='span' color='myColor.cement'>
          Search results for&nbsp;
        </Typography>
        <Typography variant='h1' component='span' color='myColor.white'>
          football
        </Typography>
      </Container>
    </Box>
  )
}

Search.Layout = MainLayout
export default Search
