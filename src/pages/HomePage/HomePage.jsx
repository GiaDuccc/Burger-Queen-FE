// import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
// import Header from '~/components/Header/Header'
import Header from '~/components/Header/Header'
import Slogan from '~/components/Slogan/Slogan'
import HeroSection from './HeroSection'

function HomePage () {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{
        bgcolor: 'white',
        height: '3000px'
      }}>
        <Header />
        <Slogan />
        <HeroSection />
      </Container>
    </>
  )
}

export default HomePage