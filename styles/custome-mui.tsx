import { TabPanel, tabPanelClasses } from '@mui/lab'
import { Button, ButtonProps, Container, SvgIcon, Tab, Tabs } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  buttonBaseClasses,
  selectClasses,
  svgIconClasses,
  buttonClasses,
} from '@mui/material'
export const StyledSvgIcon = styled((props: any) => (
  <SvgIcon {...props} inheritViewBox={true} />
))(({ themes }) => ({
  width: 'auto',
  height: 'auto',
  // fill: 'white',
  color: 'white',
}))
export const StyledButtonSvgIcon = styled((props: ButtonProps) => (
  <Button variant='text' {...props} />
))(({ theme }) => ({
  width: 'auto',
  height: 'auto',
  margin: 0,
  padding: 0,
  minWidth: '0',
  [`& .${buttonClasses.startIcon}`]: {
    margin: '0',
  },
}))

// export const LargeContainer = styled(Container)(({ theme }) => ({
//   maxWidth: '1280px',
// }))
