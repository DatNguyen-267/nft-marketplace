import React, { useState } from 'react'
import { createContext } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
type Props = {
  children: any
}
type ModalDialogData = {
  title: string
  content: string
  handleAccept: () => void
}
type DialogContextType = {
  openModal: ({ title, content, handleAccept }: ModalDialogData) => void
}
export const DialogContext = createContext<DialogContextType | null>(null)

const DialogContextWapper = ({ children }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [handleAccept, setHandleAccept] = useState<() => void>(() => {})

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  const openModal = ({ title, content, handleAccept }: ModalDialogData) => {
    setOpen(true)
    setTitle(title)
    setContent(content)
    setHandleAccept(() => handleAccept)
  }
  return (
    <DialogContext.Provider value={{ openModal }}>
      <Box>
        <Dialog aria-labelledby='customized-dialog-title' open={open}>
          <Box sx={{ padding: 3 }}>
            <DialogTitle>
              <Typography variant='h2' align='center'>
                {title}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography align='center'>{content}</Typography>
            </DialogContent>
            <DialogActions>
              <Button
                variant='outlined'
                size='small'
                sx={{ padding: ' 10px 30px', marginRight: '12px' }}
                onClick={handleClose}
              >
                No
              </Button>
              <Button
                variant='contained'
                color='primary'
                size='small'
                sx={{ padding: ' 10px 30px' }}
                autoFocus
                onClick={handleAccept}
              >
                Yes
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        {children}
      </Box>
    </DialogContext.Provider>
  )
}

export default DialogContextWapper
