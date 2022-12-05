import { Box, styled, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import PhoneIcon from '@mui/icons-material/Phone'

import {
  buttonBaseClasses,
  selectClasses,
  svgIconClasses,
  tabClasses,
} from '@mui/material'
import theme from '@/utils/theme'
export interface ListTab {
  name: string
  icon?: any
}
const StyledTabs = styled((props: any) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
  />
))(({ theme }) => ({
  minHeight: 'inherit',
  borderBottom: '1px solid',
  borderColor: theme.palette.border.main,
  overflow: 'inherit',
  [`& .MuiTabs-scroller`]: {
    overflow: 'inherit !important',
  },
  [`& .${buttonBaseClasses.root}`]: {
    // paddingRight: '45px',
    paddingLeft: '0',
    textTransform: 'none',
    minHeight: 'inherit',
  },
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    bottom: '-2px',
    height: '3px',
    borderRadius: '6px',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    borderRadius: '6px',

    backgroundColor: theme.palette.common.white,
  },
}))
const StyledTab = styled((props: any) => <Tab disableRipple {...props} />)(
  ({ themes }) => ({
    textTransform: 'none',
    color: theme.palette?.myColor?.grey,
    '&.Mui-selected': {
      color: '#fff',
    },
    '& svg': {
      width: '14px',
      height: '14px',
      stroke: theme.palette?.myColor?.grey,
      fill: theme.palette?.background?.paper,
    },
    '& .MuiSvgIcon-root': {
      width: '14px',
      height: '14px',
      stroke: theme.palette?.myColor?.grey,
    },
    '&.Mui-selected .MuiSvgIcon-root': {
      stroke: '#fff',
    },
    '&.Mui-selected svg': {
      stroke: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  })
)
export const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
  padding: '34px 0',
}))
type Props = {
  handleChange?: () => void
  list: ListTab[]
  children: any
  listAmount?: number[]
  spacing?: number
  [key: string]: any
}
const MyTab = ({
  children,
  handleChange,
  list,
  listAmount,
  spacing = 45,
  ...props
}: Props) => {
  const [value, setValue] = useState<string>('0')
  useEffect(() => {
    // console.log(value)
  }, [value])
  return (
    <Box {...props}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <StyledTabs
            value={value}
            onChange={(event: React.SyntheticEvent, newValue: string) => {
              setValue(() => newValue)
            }}
            aria-label='icon label tabs example'
          >
            {list &&
              list.map((item, index) => (
                <StyledTab
                  sx={{ paddingRight: `${spacing}px` }}
                  key={index}
                  value={index.toString()}
                  icon={item.icon ? item.icon : null}
                  iconPosition='start'
                  label={`${item.name} (${
                    listAmount ? listAmount[index].toString() : '0'
                  })`}
                />
              ))}
          </StyledTabs>
        </Box>
        {children}
      </TabContext>
    </Box>
  )
}

export default MyTab
