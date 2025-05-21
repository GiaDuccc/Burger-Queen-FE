import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function Button({ onClick, className, width, flex, height, bgcolor, fontSize, content, borderRadius, color }) {
  return (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        width: width,
        flex: flex,
        bgcolor: bgcolor,
        height: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius,
        transition: 'all 0.2s cubic-bezier(0.42, 0, 0.58, 1)',
        '&:hover': {
          cursor: 'pointer',
          opacity: .7
        },
        '& p': {
          color: color,
          fontSize: fontSize,
          fontWeight: '600'
        }
      }}>
      <Typography>{content}</Typography>
    </Box>
  )
}

export default Button
