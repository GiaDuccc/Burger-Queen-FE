import Header from '~/components/Header/Header'
import Slogan from '~/components/Slogan/Slogan'
import HeroSection from '~/components/HeroSection/HeroSection'
import nikeVideoHeroSection from '~/assets/videoHeroSection/Nike. Just Do It. Nike VN.mp4'
import Container from '@mui/material/Container'
import NavBar from '~/components/NavBar/NavBar'
import Slider from '~/components/Slider/Slider_v2'
import { useState } from 'react'
import Footer from '~/components/Footer/Footer'
import '~/App.css'

function BalenciagaPage() {
  const brand = window.location.pathname.slice(1)
  const [types, setTypes] = useState([])

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <Container disableGutters maxWidth={false} sx={{
      bgcolor: 'white',
      width: '100%',
      height: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
      scrollBehavior: 'smooth'
    }}>
      <Header />
      {/* <Box className='slide-from-right' sx={{
        transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
        minHeight: types ? '150px' : 0
      }}> */}
      <NavBar brand={brand} scrollToSection={(id) => scrollToSection(id)} setTypes={(types) => setTypes(types)} />
      {/* </Box> */}
      <Slogan />
      <HeroSection
        video={nikeVideoHeroSection} title={'BALENCIAGA'} descTitle={'It\'s Different.'}
      />

      {types?.map((type, idx) => (
        <Slider key={idx} brand={brand} id={type} name={type.slice(0, 1).toUpperCase() + type.slice(1)} type={type} />
      ))}

      <Footer />
    </Container>
  )
}

export default BalenciagaPage