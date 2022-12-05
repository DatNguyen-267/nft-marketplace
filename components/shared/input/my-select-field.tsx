import {
  Box,
  FormHelperText,
  MenuItem,
  Select,
  selectClasses,
  styled,
} from '@mui/material'
import { FastField, FastFieldProps } from 'formik'

type Props = {
  type: 'standard' | 'small'
  size?: 'small' | 'medium' | 'large'
  items: string[]
  [key: string]: any
}
const MySelectField = ({ type, items, size, ...otherProps }: Props) => {
  const StyleSelect = type === 'standard' ? SelectField : SelectFieldSmall
  return (
    <FastField name={name}>
      {({ field, form, meta }: FastFieldProps<any>) => (
        <Box>
          <StyleSelect
            {...field}
            {...otherProps}
            sx={{ fontSize: size === 'small' ? '12px' : '14px' }}
            error={Boolean(form.errors.select && form.touched.select)}
          >
            {items.map((value, index) => (
              <MenuItem
                key={index}
                value={value}
                sx={{ fontSize: size === 'small' ? '12px' : '14px' }}
              >
                <Box>{value}</Box>
              </MenuItem>
            ))}{' '}
          </StyleSelect>
          {meta.touched && meta.error && (
            <FormHelperText error>{meta.error}</FormHelperText>
          )}
        </Box>
      )}
    </FastField>
  )
}
const SelectField = styled(Select)(({ theme }) => ({
  padding: '0',
  width: ' 100%',
  [`&  > fieldset`]: {
    border: 'none',
    borderBottom: '1px solid',
    borderColor: theme.palette.border?.main,
    borderRadius: '0',
  },
  [`&:hover > fieldset`]: {
    // borderColor: `${theme.palette.border?.main}`,
  },
  [`&:focus > fieldset`]: {
    // borderColor: `${theme.palette.primary.main} !important`,
  },
  [`& .${selectClasses.select}`]: {
    paddingLeft: '0',
  },
  [`&:hover .${selectClasses.outlined} ~ fieldset`]: {
    // borderColor: '#333',
  },
}))
const SelectFieldSmall = styled(Select)(({ theme }) => ({
  [`&:hover > fieldset`]: {
    border: 'none',
  },
  [`& > fieldset`]: {
    border: 'none',
  },
}))

export default MySelectField
