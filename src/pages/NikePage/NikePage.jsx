import Header from '~/components/Header/Header'
import Slogan from '~/components/Slogan/Slogan'
import HeroSection from '~/components/HeroSection/HeroSection'
import nikeVideoHeroSection from '~/assets/videoHeroSection/Nike. Just Do It. Nike VN.mp4'
import Container from '@mui/material/Container'
import Footer from '~/components/Footer/Footer'
import NavBar from '~/components/NavBar/NavBar'


function NikePage () {
  return (
    <Container disableGutters maxWidth={false} sx={{
      bgcolor: 'white',
      width: '100%',
      height: 'fit-content',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <NavBar />
      <Slogan />
      <HeroSection video={nikeVideoHeroSection} title={'cho cuong'} descTitle={'If you can dream it,\nMac can do it.'} />
      <h1 style={{ color: 'black' }}>Helo NikePage</h1>
      <Footer />
    </Container>
  )
}

export default NikePage