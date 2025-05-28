import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function Footer() {
  return (
    <Box>
      <hr style={{
        border: 'none',
        borderTop: '1px solid #ccc',
        width: '90%'
      }} />
      <Box sx={{
        paddingTop: '2rem',
        height: 'auto',
        width: '100%',
        backgroundColor: 'white'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 20
        }}>
          <Box>
            <Box>
              <Typography variant='h2' sx={{ fontWeight: 'bold', fontSize: '48px' }}>Nice Store</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '13px', marginTop: '1rem', fontWeight: 'bold' }}>Luxury shoes help your foot comfortable</Typography>
            </Box>
          </Box>

          <Box>
            <Box>
              <Typography sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>Navigation</Typography>
            </Box>
            <Box sx={{ maginBottom: '0.5rem', display: 'block' }}>
              <Typography>Home</Typography>
              <Typography>About Us</Typography>
              <Typography>Services</Typography>
              <Typography>Features</Typography>
            </Box>
          </Box>

          <Box>
            <Box>
              <Typography sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>Information</Typography>
            </Box>
            <Box sx={{ maginBottom: '0.5rem', display: 'block' }}>
              <Typography>1900585801</Typography>
              <Typography>DynamicHypeClub@gmail.com</Typography>
            </Box>
          </Box>

          <Box>
            <Box>
              <Typography sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>Opening Hours</Typography>
            </Box>
            <Box sx={{ maginBottom: '0.5rem', display: 'block' }}>
              <Typography>MonDay - Thusday: 9.00-21.00</Typography>
              <Typography>Friday: 10.00-21.00</Typography>
              <Typography>Sasturday: .00-21.00</Typography>
              <Typography>Sunda</Typography>
            </Box>
          </Box>
        </Box>
        <Typography sx={{ textAlign: 'center', my: '3rem', fontWeight: 600 }}>Copyright @2025 | Web make by Cuong, Duc, Hien</Typography>
        {/* <Box sx={{
          marginLeft: '550px',
          width: '32px',
          height: '32px',
          display: 'flex',
          justifyContent: 'center',
          alignItem: 'center',
          gap: 2,
          marginTop: '50px',
          borderRadius: '50px'
        }}>
          <img
            src='https://cdn.jim-nielsen.com/ios/512/facebook-2019-05-21.png?rf=1024' alt='facebookIcon'
          />
          <img
            src='https://cdn-icons-png.freepik.com/256/15707/15707869.png?semt=ais_hybrid'
            alt='instagramIcon'
          />
          <img
            src='https://logos.logofury.com/logo_src/3a96be3599c2f454056db9858b954c60.jpeg'
            alt='tiktokIcon'
          />
          <img
            src='https://cdn.pixabay.com/photo/2023/04/25/00/48/youtube-7949229_1280.png'
            alt='youtubeIcon'
          />
        </Box> */}
      </Box>
    </Box>
  )
}

export default Footer