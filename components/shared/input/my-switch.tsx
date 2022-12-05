import React from 'react'
import { Box, FormHelperText, TextField, Switch } from '@mui/material'
import { FastField, FastFieldProps } from 'formik'

type Props = {
  name: string
  [key: string]: any
}

const MySwitch = ({ name, ...otherProps }: Props) => {
  return (
    <FastField name={name}>
      {({ field, form, meta }: FastFieldProps<any>) => (
        <Box>
          <Switch
            {...otherProps}
            {...field}
            // error={Boolean(meta.error && meta.touched)}
            // helperText={meta.touched && meta.error}
          />
        </Box>
      )}
    </FastField>
  )
}

export default MySwitch
