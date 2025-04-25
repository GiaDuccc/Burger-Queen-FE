import Box from '@mui/material/Box'

const categories = [
  { image: '/allProduct/Nike Sabrina 2 EP/Nike Sabrina 2 EP-0.avif', title: 'sneaker' },
  { image: '/allProduct/Nike Sabrina 2 EP/Nike Sabrina 2 EP-0.avif', title: 'classic' },
  { image: '/allProduct/Nike Sabrina 2 EP/Nike Sabrina 2 EP-0.avif', title: 'running' },
  { image: '/allProduct/Nike Sabrina 2 EP/Nike Sabrina 2 EP-0.avif', title: 'basketball' },
  { image: '/allProduct/Nike Sabrina 2 EP/Nike Sabrina 2 EP-0.avif', title: 'football' },
  { image: '/allProduct/Nike Sabrina 2 EP/Nike Sabrina 2 EP-0.avif', title: 'boot' }
];

function NavBar() {
  return (
    <Box sx={{
      display: 'flex',
      gap: 10,
      justifyContent: 'center',
      width: '100%',
      height: '100px',
      background: '#fafafc',
      position: 'relative',
      padding: '16px 0 24px'
    }}>
      {categories.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <a href='#'></a>
          <img
            src={item.image}
            style={{ width: '50px' }}
          />
          <span>{item.title}</span>
        </Box>
      ))}
    </Box>
  )
}

export default NavBar