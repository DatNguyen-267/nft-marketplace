import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import {
  Box,
  Checkbox,
  Chip,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
} from '@mui/material'
import { FastField, FastFieldProps } from 'formik'
import React, { memo } from 'react'
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />
type Props = {
  name: string
  bindValues?: string[]
  options: any[]
  [key: string]: any
  setFieldValue: (field: string, value: any) => void
}

const MyAutocompleteField = ({
  name,
  setFieldValue,
  options,
  bindValues,
  ...otherProps
}: Props) => {
  return (
    <FastField name={name}>
      {({ field, form, meta }: FastFieldProps<any>) => (
        <>
          <Autocomplete
            multiple
            {...otherProps}
            options={options}
            onChange={(e: any, newValue: string[]) => {
              if (newValue.length === 0 && bindValues) {
                setFieldValue(name, [...bindValues])
              } else if (bindValues) {
                setFieldValue(name, [
                  ...bindValues,
                  ...newValue.filter(
                    (value, index) =>
                      bindValues?.findIndex((item) => item !== value) !== -1
                  ),
                ])
              } else {
                setFieldValue(name, [...newValue])
              }
            }}
            renderInput={(params: any) => (
              <TextField variant='standard' {...params} placeholder='Tags' />
            )}
            renderTags={(tagValue: string[], getTagProps: any) => {
              return tagValue.map((option, index) => (
                <Chip
                  key={index}
                  label={option}
                  {...getTagProps({ index })}
                  disabled={
                    bindValues
                      ? bindValues.findIndex((item) => item === option) !== -1
                      : false
                  }
                  sx={{ backgroundColor: 'myColor.grey' }}
                />
              ))
            }}
          />
          {meta.touched && meta.error && (
            <FormHelperText error>{meta.error}</FormHelperText>
          )}
        </>
      )}
    </FastField>
  )
}

export default MyAutocompleteField
