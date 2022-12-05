import { Images } from '@/utils/images'
import {
  Box,
  Dialog,
  DialogContent,
  keyframes,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material'
import { createContext, useState } from 'react'
import toast from 'react-hot-toast'
type Props = {
  children: any
}
const myKeyframe = keyframes`
  from {
      transform:rotate(0deg);
  }
  to {
      transform:rotate(360deg);
  }
`
type PageBlockContextType = {
  openPageBlock: ({
    func,
    text,
    success,
    error,
  }: {
    func: Promise<any>
    text: string
    success?: string
    error?: string
  }) => Promise<any>
}
export const PageBlockContext = createContext<PageBlockContextType | null>(null)

const PageBlockContextWapper = ({ children }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [text, setText] = useState<string | null>(null)

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const openPageBlock = async ({
    func,
    text,
    success,
    error,
  }: {
    func: Promise<any>
    text: string
    success?: string
    error?: string
  }) => {
    handleOpen()
    setText(text)
    await func
      .then(() => {
        console.log('done')
        if (success) toast.success(success)
        handleClose()
        setText(null)
      })
      .catch((promiseError) => {
        console.log('fail')
        if (promiseError) toast.error(promiseError)
        else if (error) toast.error(error)
        handleClose()
        setText(null)
      })
  }
  return (
    <PageBlockContext.Provider value={{ openPageBlock }}>
      <Box>
        <Dialog open={open}>
          <Box sx={{ padding: 3 }}>
            <DialogContent>
              <Stack direction='row' alignItems='center'>
                <SvgIcon
                  component={Images.Loading}
                  sx={{
                    width: '20px',
                    height: '20px',
                    marginRight: 1,
                    animation: `${myKeyframe} 1s infinite ease`,
                    animationDuration: '1s',
                    animationIterationCount: 'infinite',
                    animationTimingFunction: 'linear',
                    circle: {
                      fill: 'none',
                    },
                  }}
                />
                <Typography
                  align='center'
                  variant='body1'
                  fontWeight='400'
                  sx={{ pointerEvents: 'none' }}
                >
                  {text}
                </Typography>
              </Stack>
            </DialogContent>
          </Box>
        </Dialog>
        {children}
      </Box>
    </PageBlockContext.Provider>
  )
}

export default PageBlockContextWapper
