import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import tiktokIcon from '~/assets/tiktokIcon.jpeg'
import facebookIcon from '~/assets/facebookIcon.png'
import igIcon from '~/assets/ig.webp'
import xIcon from '~/assets/xIcon.png'

const socialMedia = [
  { name: 'tiktok', icon: tiktokIcon, link: '#' },
  { name: 'facebook', icon: facebookIcon, link: 'https://www.facebook.com/gia.duc.nguyenw?locale=vi_VN' },
  { name: 'instagram', icon: igIcon, link: 'https://www.instagram.com/gia.duc.nguyenw/' },
  { name: 'x', icon: xIcon, link: '#' }
]

function Footer() {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: '44px' }}>
      <Box sx={{
        paddingTop: '2rem',
        height: 'auto',
        width: '90%',
        backgroundColor: 'white',
        borderTop: '1px solid #ccc'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Box>
            <Box>
              <Typography variant='h2' sx={{ fontWeight: 'bold', fontSize: '48px' }}>NICE STORE</Typography>
            </Box>
          </Box>

          <Box>
            <Box>
              <Typography sx={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '16px' }}>Navigation</Typography>
            </Box>
            <Box sx={{
              maginBottom: '0.5rem', display: 'flex', flexDirection: 'column',
              '& a': {
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                mb: '4px'
              }
            }}>
              <a href='/'>Home</a>
              <a href='#'>About</a>
              <a href='#'>Services</a>
              <a href='#'>Features</a>
            </Box>
          </Box>

          <Box>
            <Box>
              <Typography sx={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '16px' }}>Information</Typography>
            </Box>
            <Box>
              <Typography>(+84) 123456789</Typography>
              <Typography>NiceStore@gmail.com</Typography>
            </Box>
          </Box>

          <Box>
            <Box>
              <Typography sx={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '16px' }}>Opening Hours</Typography>
            </Box>
            <Box sx={{ maginBottom: '0.5rem', display: 'block' }}>
              <Typography>MonDay - Friday: 7:00-21:00</Typography>
              <Typography>Weekend: 9:00 - 21:00</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', m: '44px 0 16px', gap: 3 }}>
          { socialMedia.map((items, idx) => (
            <a href={items.link} key={idx}>
              <img src={items.icon} style={{ width: '40px', borderRadius: '8px' }} />
            </a>
          ))}
        </Box>
        <Typography sx={{ textAlign: 'center', m: '8px 0 16px', fontWeight: 600, fontSize: '16px' }}>Copyright @2025 | Web make by Gia Duc</Typography>
      </Box>
    </Box>
  )
}

export default Footer