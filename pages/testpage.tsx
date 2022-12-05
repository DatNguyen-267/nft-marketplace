import InputMemorized from '@/components/shared/input/my-text-field'
import SelectMemorized from '@/components/shared/input/my-select-field'
import { Box, InputAdornment, Select, MenuItem, Container } from '@mui/material'
import { Field, Form, Formik, FastField } from 'formik'
import { TextField } from 'formik-mui'
import React, { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import MyAutocompleteField from '@/components/shared/input/my-autocomplete-field'
type Props = {}
let validationSchema = yup.object().shape({
  price: yup
    .number()
    .typeError('Must be number')
    .required('The collectible image is required.'),
  select: yup.string(),
  tags: yup.object().required('tags is required'),
})
const initialValues = {
  price: '',
  select: 'WAIOZ',
  tags: ['1'],
}
const TestPage = (props: Props) => {
  const { height, width } = useWindowDimensions()
  const ref = useRef()
  return (
    <>
      <Box>{width}</Box>
      <Container
        maxWidth='lg'
        sx={{ backgroundColor: 'pink', height: '40px' }}
      ></Container>
      <Container
        maxWidth='md'
        sx={{ backgroundColor: 'blueviolet', height: '40px' }}
      ></Container>
    </>
  )
}
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export default TestPage
