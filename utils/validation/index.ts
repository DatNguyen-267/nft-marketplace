import * as yup from 'yup'

export const Validation = {
  file: yup.mixed().required('The collectible image is required.'),
  price(field: string = 'Price') {
    return yup
      .string()
      .required(`${field} is required`)
      .test(
        field,
        `${field} must be a number, positive number and just allow decimal 18`,
        (value: any) => {
          if (value) return /^[0-9]*(\.[0-9]{0,18})?$/.test(value)
          else return false
        }
      )
  },
  tags: yup.array().min(1, 'Tag is required').required('Tag is required'),
}
