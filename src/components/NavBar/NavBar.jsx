import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { getTypeAndNavbarImageFromBrand } from '~/apis'
import theme from '~/theme'

function NavBar({ scrollToSection, setTypes, brand }) {


  const [typesAndNavbarImages, setTypesAndNavbarImages] = useState([])

  const fetchTypeAndNavbarImage = async () => {
    await getTypeAndNavbarImageFromBrand(brand).then(data => {
      setTypesAndNavbarImages(data.sort())
      setTypes(data.map(type => type.type))
    })
  }

  useEffect(() => {
    fetchTypeAndNavbarImage()
  }, [])

  return (
    <Box
      className='fade-in-up'
      sx={{
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
        width: '100%',
        background: '#fafafc',
        position: 'relative',
        padding: '16px 0'
      }}
    >
      {typesAndNavbarImages.map((item, index) => (
        <Box
          onClick={() => scrollToSection(item.type)}
          key={index} sx={{
            display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s cubic-bezier(0.42, 0, 0.58, 1)',
            cursor: 'pointer',
            '&:hover div ': {
              transform: 'scale(1.1)',
              transformOrigin: 'center'
            }
          }}>
          <Box sx={{ mb: '8px', transition: 'all 0.2s cubic-bezier(0.42, 0, 0.58, 1)' }}>
            <img
              src={`${theme.API_ROOT}${item.navbarImage}`}
              style={{ width: '70px' }}
            />
          </Box>
          <span style={{ color: '#000' }} >{item.type.slice(0, 1).toUpperCase() + item.type.slice(1)}</span>
        </Box>
      ))}
    </Box>
  )
}

export default NavBar