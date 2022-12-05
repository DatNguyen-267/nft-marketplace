import NftItem from '@/components/page-components/creator/nft-item'
import Loading from '@/components/shared/modal/loading'
import MyTab, { StyledTabPanel, ListTab } from '@/components/shared/tab/my-tab-list'
import { NftData } from '@/models/nft'
import { Box, Container, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { ImagesCreatorPage } from '@/utils/images'

const SalesIcon = ImagesCreatorPage.Sales
const LIST_TAB: ListTab[] = [
  { name: 'Items', icon: <SalesIcon /> },
  {
    name: 'User',
  },
  {
    name: 'Collectibles',
  },
]
type Props = {}
const SearchTab = (props: Props) => {
  const [NftDatas, setNftDatas] = useState<NftData[]>()
  const handleChangeTag = () => {}
  return (
    <Box>
      <Container maxWidth='lg'>
        <MyTab list={LIST_TAB} listAmount={[1, 2, 3, 4]} handleChange={handleChangeTag}>
          <StyledTabPanel value='0'>
            <Grid container columns={20} spacing='30px'>
              {!NftDatas && <Loading></Loading>}
              {NftDatas && NftDatas.findIndex((item) => item.nft.status === 'Sale') < 0 && (
                <Grid item>
                  <Typography>There are no items</Typography>
                </Grid>
              )}
              {NftDatas &&
                NftDatas.map((item, index) => {
                  return (
                    <Grid
                      item
                      sm={10}
                      md={5}
                      lg={4}
                      key={item.nft._id + index.toString()}
                    >
                      TEST
                    </Grid>
                  )
                })}
            </Grid>
          </StyledTabPanel>
          <StyledTabPanel value='1'>
            <Grid container columns={20} spacing='30px'></Grid>
          </StyledTabPanel>
          <StyledTabPanel value='2'>Item Three</StyledTabPanel>
        </MyTab>
      </Container>
    </Box>
  )
}

export default SearchTab
