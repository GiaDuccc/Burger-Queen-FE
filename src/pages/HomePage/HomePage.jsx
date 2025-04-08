// import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
// import Header from '~/components/Header/Header'
import Header from '~/components/Header/Header'
import Slogan from '~/components/Slogan/Slogan'
import HeroSection from '~/components/HeroSection/HeroSection'
import Slider from '~/components/Slider/Slider'
import video1 from '~/assets/videoHeroSection/video1.mp4'

function HomePage () {
  return (
    <Container disableGutters maxWidth={false} sx={{
      bgcolor: 'white',
      width: '100%',
      height: '3000px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <Slogan />
      <HeroSection video={video1} />
      <Slider />
    </Container>
  )
}

export default HomePage