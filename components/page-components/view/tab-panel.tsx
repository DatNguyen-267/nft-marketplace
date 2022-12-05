import TabPanel from '@mui/lab/TabPanel'
import { styled } from '@mui/material'

export const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
  padding: '16px 0',
  maxHeight: '180px',
  minHeight: '180px',
  overflowY: 'scroll',
  position: 'relative',

  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    backgroundImage: 'linear-gradient(180deg, rgba(18,18,18,0) 0%, #121212 100%);',
    height: '20px',
  },
}))
