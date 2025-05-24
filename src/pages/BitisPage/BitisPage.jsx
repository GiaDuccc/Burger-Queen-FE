import Header from '~/components/Header/Header'
import HeroSection from '~/components/HeroSection/HeroSection'
import Slogan from '~/components/Slogan/Slogan'
import Container from '@mui/material/Container'
import { useState } from 'react'
import NavBar from '~/components/NavBar/NavBar'
import Footer from '~/components/Footer/Footer'
import Slider from '~/components/Slider/Slider_v2'

function BitisPage() {

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
      height: '3000px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <NavBar brand={brand} scrollToSection={(id) => scrollToSection(id)} setTypes={(types) => setTypes(types)} />
      <Slogan />
      <HeroSection title={'Biti\'s'} descTitle={'Embrace Vietnamese\'s step.'} />
      {types?.map((type, idx) => (
        <Slider brand={brand} key={idx} id={type} name={type.slice(0, 1).toUpperCase() + type.slice(1)} type={type} />
      ))}
      <Footer />
    </Container>
  )
}

export default BitisPage