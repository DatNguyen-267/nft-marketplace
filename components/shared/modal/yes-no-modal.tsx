import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import AcceptButton from '../button/accept-button'
import CloseButton from '../button/close-button'
type Props = {
  open: boolean
  title: string
  question: string
  handleClose: () => void
  handleAccept: () => void
}

const YesNoModal = ({ handleClose, handleAccept, open, title, question }: Props) => {
  return (
    <Box>
      <Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <Box sx={{ padding: 3 }}>
          <DialogTitle variant='h2'>{title}</DialogTitle>
          <DialogContent>
            {/* <Typography variant='h1'>{title}</Typography> */}
            <Typography>{question}</Typography>
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
              onClick={async () => {
                await handleAccept()
                handleClose()
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  )
}

export default YesNoModal
