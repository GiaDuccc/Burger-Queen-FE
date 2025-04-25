import Header from '~/components/Header/Header'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import settingsIcon from '~/assets/settings.png'
import logOutIcon from '~/assets/logout.png'

function Dashboard() {
  const navigate = useNavigate()

  function getCountryName(code) {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    return regionNames.of(code.toUpperCase()) || code
  }

  const user = JSON.parse(localStorage.getItem('user'))

  const logOut = () => {
    localStorage.removeItem('user')
    navigate('/sign-in')
  }

  return (
    <Container disableGutters maxWidth={false} sx={{
      bgcolor: 'white',
      width: '100%',
      height: '3000px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      {/* Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', mx: 'auto', mt: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ color: 'rgba(0,0,0,.85)', fontWeight: '600', fontSize: '32px' }}>
            {`Customer - ${user.lastName} ${user.firstName}`}
          </Typography>
          <Box sx={{
            display: 'flex',
            gap: 4,
            '& p': {
              color: 'rgb(105, 105, 105)',
              textDecoration: 'none',
              fontSize: '16px'
            },
            '& p:hover': {
              color: 'rgb(105, 105, 105)',
              textDecoration: 'underline',
              cursor: 'pointer'
            }
          }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Typography>Settings</Typography>
              {/* <SettingsIcon sx={{ fontSize: '16px' }} /> */}
              <img src={settingsIcon} style={{ width:'16px', height: '16px' }} />
            </Box>
            <Box
              onClick={() => logOut()}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Typography>Log Out</Typography>
              <img src={logOutIcon} style={{ width:'16px', height: '16px' }} />
            </Box>
          </Box>
        </Box>
        <hr style={{
          width: '100%',
          border: 'none',
          borderTop: '1px solid #ccc',
          margin: '4px auto'
        }} />
        {/* User Detail */}
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '32px', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Name:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{user.lastName + ' ' + user.firstName}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Date of Birth:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{new Date(user.dob).toLocaleDateString('vi-VN')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Email:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{user.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Phone:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{user.phone}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Address:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{`${user.address} ${getCountryName(user.country)}`}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Join date:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Active:</Typography>
            <Box sx={{
              width: '14px',
              height: '14px',
              bgcolor: user.isActive ? '#3dff4c' : '#ff3232',
              border: '1px solid rgb(141, 141, 141)',
              borderRadius: '16px'
            }}></Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Dashboard