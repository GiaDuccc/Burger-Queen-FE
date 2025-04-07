// import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
// import Header from '~/components/Header/Header'
import Header from '~/components/Header/Header'
import Slogan from '~/components/Slogan/Slogan'
import HeroSection from '~/components/HeroSection/HeroSection'

function HomePage () {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{
        bgcolor: 'white',
        width: '100%',
        height: '3000px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        <Slogan />
        <HeroSection />
      </Container>
    </>
  )
}

export default HomePage