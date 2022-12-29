import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { ColorPartial } from '@mui/material/styles/createPalette'
import { switchClasses } from '@mui/material/Switch'

import {
  alpha,
  inputAdornmentClasses,
  inputClasses,
  typographyClasses,
} from '@mui/material'

export const ColorTheme = {
  primary: '#1D58EC',
  primaryDark: '#081FA6',
  secondary: '#1F2C48',
  text: '#fff',
  subText: '#A5ABB6',
  white: '#fff',
  black: '#000',
  cement: '#A5ABB6',
  grey: '#4C576D',
  backgroundPaper: '#121212',
  soil: '#2D2D2D',
  foggy: '#EAEAEA',
}

interface CustomePaletteOptions {
  [key: string]: string
}
declare module '@mui/material/styles' {
  interface PaletteColor {
    linear?: string
  }
  interface SimplePaletteColorOptions {
    linear?: string
  }
  interface Palette {
    border?: Palette['primary']
    // test?: Palette['primary']
    myColor?: CustomePaletteOptions
  }
  interface PaletteOptions {
    border?: PaletteOptions['primary']
    // test?: PaletteOptions['primary']
    myColor?: CustomePaletteOptions | ColorPartial
  }
  interface TypographyVariants {
    tinyBody: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    tinyBody?: React.CSSProperties
    price?: React.CSSProperties
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    tinyBody: true
    price: true
  }
}
// declare module '@mui/material/Button' {
//   interface ButtonPropsVariantOverrides {
//     secondary: true
//   }
// }
// Create a theme instance.
export const theme = createTheme({
  typography: {
    fontFamily: 'Rubik, sans-serif',
    h5: {
      fontSize: '12px',
      lineHeight: '15px',
      fontWeight: '700',
      letterSpacing: '0.06em',
    },
    h4: {
      fontSize: '14px',
      lineHeight: '17px',
      fontWeight: '700',
      letterSpacing: '0.06em',
    },
    h3: {
      fontSize: '16px',
      lineHeight: '19px',
      fontWeight: '700',
      letterSpacing: '0.06em',
    },
    h2: {
      fontSize: '22px',
      lineHeight: '31px',
      fontWeight: '500',
      letterSpacing: '0.06em',
    },
    h1: {
      fontSize: '32px',
      lineHeight: '38px',
      fontWeight: '500',
      letterSpacing: '0.06em',
    },
    body1: {
      color: ColorTheme.subText,
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '17px',
      letterSpacing: '0.04em',
    },
    body2: {
      color: ColorTheme.subText,
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '14px',
      letterSpacing: '0.05em',
    },
    tinyBody: {
      color: ColorTheme.subText,
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: '12px',
      letterSpacing: '0.06em',
    },
    subtitle1: {
      color: ColorTheme.white,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '16.59px',
      letterSpacing: '0.06em',
    },
    subtitle2: {
      color: ColorTheme.subText,
      fontSize: '10px',
      fontWeight: '400',
      lineHeight: '12px',
      letterSpacing: '0.06em',
    },
    price: {
      fontSize: '24px',
      lineHeight: '28px',
      fontWeight: '500',
      letterSpacing: '0.06em',
      color: ColorTheme.text,
    },
  },
  palette: {
    action: {
      disabled: ColorTheme.white,
    },
    myColor: {
      red: red['600'],
      grey: ColorTheme.grey,
      cement: ColorTheme.cement,
      foggy: ColorTheme.foggy,
    },

    text: {
      primary: ColorTheme.text,
      secondary: ColorTheme.subText,
    },
    border: {
      main: ColorTheme.grey,
      dark: alpha(ColorTheme.soil, 0.95),
    },
    common: {
      white: ColorTheme.white,
      black: ColorTheme.black,
    },
    primary: {
      main: ColorTheme.primary,
      light: ColorTheme.primaryDark,
      contrastText: ColorTheme.text,
    },
    secondary: {
      main: ColorTheme.secondary,
      contrastText: ColorTheme.subText,
    },
    background: {
      paper: ColorTheme.backgroundPaper,
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
        disableGutters: false,
      },
      styleOverrides: {
        maxWidthXl: {
          maxWidth: '1500px',
          padding: 0,
          '@media (max-width: 600px)': {
            padding: '0 1rem',
          },
          '@media (min-width: 600px)': {
            padding: '0 40px',
          },
          '@media (min-width: 900px)': {
            padding: '0 40px',
          },
          '@media (min-width: 1200px)': {
            padding: '0 40px',
            maxWidth: '1540px',
          },
        },
        maxWidthLg: {
          maxWidth: '1280px',
          padding: 0,
          '@media (max-width: 600px)': {
            padding: '0 1rem',
          },
          '@media (min-width: 600px)': {
            padding: '0 40px',
          },
          '@media (min-width: 900px)': {
            padding: '0 40px',
          },
          '@media (min-width: 1200px)': {
            padding: '0 40px',
            maxWidth: '1320px',
          },
        },
        maxWidthMd: {
          maxWidth: '1070px',
          padding: 0,
          '@media (max-width: 600px)': {
            padding: '0 1rem',
          },
          '@media (min-width: 600px)': {
            padding: '0',
          },
          '@media (min-width: 900px)': {
            padding: '0',
          },
          '@media (min-width: 1200px)': {
            padding: '0',
            maxWidth: '1070px',
          },
        },
        root: {
          '@media (min-width: 600px) ': {
            padding: '0',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: ColorTheme.subText,
          cursor: 'pointer',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {},
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '6px',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      variants: [
        {
          props: {
            variant: 'contained',
            color: 'primary',
          },
          style: {
            backgroundImage: `linear-gradient(269.96deg, #081FA6 1.36%, #1D58EC 99.97%)`,
            letterSpacing: '0.06em',
            fontWeight: '500',
          },
        },
        {
          props: {
            variant: 'contained',
            color: 'primary',
            size: 'large',
          },
          style: {
            fontSize: '24px',
            lineHeight: '28.44px',
          },
        },
        {
          props: {
            variant: 'contained',
            color: 'primary',
            size: 'medium',
          },
          style: {
            fontSize: '20px',
            lineHeight: '23.7px',
          },
        },
        {
          props: {
            variant: 'contained',
            color: 'primary',
            size: 'small',
          },
          style: {
            fontSize: '12px',
            lineHeight: '14.22px',
            letterSpacing: '0.05em',
            fontWeight: 400,
            borderRadius: '2px',
            margin: 0,
          },
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            padding: '14px 27px',
            textTransform: 'none',
            backgroundColor: ColorTheme.secondary,
            color: ColorTheme.white,
            borderRadius: '6px',
            fontSize: '16px',
            lineHeight: '19px',
            fontWeight: '600',
            '&:hover': {
              background: ColorTheme.secondary,
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            letterSpacing: '0.06em',
            borderRadius: '6px',
            fontWeight: 500,
            borderColor: ColorTheme.cement,
            color: ColorTheme.cement,
            '&:hover': {
              borderColor: ColorTheme.white,
              color: ColorTheme.white,
            },
          },
        },
        {
          props: { variant: 'outlined', size: 'large' },
          style: {
            fontSize: '24px',
            fontWeight: 500,
            lineHeight: '28.44px',
          },
        },
        {
          props: { variant: 'outlined', size: 'medium' },
          style: {
            fontSize: '20px',
            lineHeight: '23.7px',
          },
        },
        {
          props: { variant: 'outlined', size: 'small' },
          style: {
            fontSize: '12px',
            lineHeight: '14.22px',
            letterSpacing: '0.05em',
            fontWeight: 400,
            borderRadius: '2px',
          },
        },
        {
          props: { variant: 'text' },
          style: {
            minWidth: '0%',
          },
        },
      ],
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 48,
          height: 24,
          padding: 0,
          display: 'flex',
          '&:active': {
            [`&.${switchClasses.thumb}`]: {
              width: 100,
            },
            [`&.${switchClasses.checked}`]: {
              transform: 'translateX(9px)',
            },
          },
          '& .MuiSwitch-switchBase': {
            padding: 4,
            [`&.${switchClasses.checked}`]: {
              transform: 'translateX(100%)',
              color: ColorTheme.backgroundPaper,
              [`& .${switchClasses.thumb}`]: {
                backgroundColor: ColorTheme.backgroundPaper,
              },
              [`& + .${switchClasses.track}`]: {
                opacity: 1,
                backgroundColor: ColorTheme.primary,
              },
            },
          },
          [`& .${switchClasses.thumb}`]: {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: '16px',
            height: '16px',
            borderRadius: '99px',
            backgroundColor: ColorTheme.primary,
            transition: 'width 200ms ease-out',
          },
          [`& .${switchClasses.track}`]: {
            opacity: 1,
            border: '1px solid ',
            borderColor: ColorTheme.primary,
            borderRadius: '12px',
            backgroundColor: ColorTheme.backgroundPaper,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          [`&.${inputClasses.root}`]: {
            fontSize: 'inherit',
          },
        },
        input: {
          [`&.${inputClasses.disabled}`]: {
            // ['-webkit-text-fill-color']: ColorTheme.white,
          },
          [`&.${inputClasses.input}`]: {
            padding: '0',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          marginBottom: '8px',
          [`& .${inputClasses.root}`]: {
            paddingTop: '12px',
            paddingBottom: '12px',
            '&:before': {
              borderBottom: '1px solid',
              borderColor: ColorTheme.cement,
            },
            [`&:hover:not(.${inputClasses.disabled}):before`]: {
              borderBottom: '1px solid',
              borderColor: ColorTheme.cement,
            },
            [`& .${inputAdornmentClasses.root}`]: {
              [`& .${typographyClasses.root}`]: {
                color: 'common.white',
              },
            },
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          overflowWrap: 'break-word',
          marginTop: '8px',
          marginBottom: '8px',
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          [`& ~ svg`]: {
            color: ColorTheme.white,
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: ColorTheme.cement,
        },
      },
    },
    MuiCollapse: {
      defaultProps: {
        timeout: {
          enter: 300,
          exit: 100,
        },
      },
      styleOverrides: {
        root: {
          animationDuration: '0.1s',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {},
        option: {},
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {},
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: ColorTheme.grey,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {},
        paper: {
          border: '1px solid',
          borderColor: 'rgba(45, 45, 45, 0.95)',
          boxShadow: 'box-shadow: rgba(255,255,255,0.4) 2px 3px 8px;',
          '&::before': {
            borderTop: '1px solid',
            borderLeft: '1px solid',
            top: '-1px !important',
            borderColor: 'rgba(45, 45, 45, 0.95)',
          },
        },
      },
    },
  },
})

export default theme
