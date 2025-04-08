import Header from '~/components/Header/Header'
import Slogan from '~/components/Slogan/Slogan'
import HeroSection from '~/components/HeroSection/HeroSection'
import nikeVideoHeroSection from '~/assets/videoHeroSection/Nike. Just Do It. Nike VN.mp4'
import Container from '@mui/material/Container'

function NikePage () {
  return (
    <Container disableGutters maxWidth={false} sx={{ bgcolor: 'white', width: '100vw' }}>
      <Header />
      <Slogan />
      <HeroSection video={nikeVideoHeroSection} />
      <h1>HELOO NikePage</h1>
    </Container>
  )
}

export default NikePage