import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '~/components/Button/Button'

function ModalWarning({ open, onClose, cancel, handleDelete }) {
  return (
    <Modal
      className="Modal"
      open={open}
      sx={{
        overflow: 'hidden',
        transition: 'opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          height: '100%',
          outline: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}
      >
        <Box
          className="fade-in"
          onClick={(e) => e.stopPropagation()} // Ngăn click ra ngoài phần nội dung
          sx={{
            width: '30%',
            height: '22vh',
            bgcolor: 'white',
            outline: 'none',
            borderRadius: '28px',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            p: '28px',
            boxShadow: '4px 4px 15px rgb(138, 138, 138)',
            justifyContent: 'space-between'
          }}
        >
          {/* Content */}
          <Typography sx={{
            fontSize: '22px',
            fontWeight: '600'
          }}>Do you really want to delete this ?</Typography>
          {/* Button */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end' }}>
            <Button content='Cancel' width='110px' height='35px' borderRadius='16px' bgcolor='#ccc' fontSize='18px' onClick={cancel} />
            <Button content='Delete' width='110px' height='35px' borderRadius='16px' bgcolor='#ff3737' fontSize='18px' color='#fff' onClick={handleDelete}/>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalWarning
