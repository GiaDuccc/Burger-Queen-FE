import Header from '~/components/Header/Header'
import HeroSection from '~/components/HeroSection/HeroSection'
import Slogan from '~/components/Slogan/Slogan'
import Container from '@mui/material/Container'
import productHeroSection from '~/assets/videoHeroSection/Product2.mp4'
import Box from '@mui/material/Box'

function ProductPage () {
  return (
    <Container disableGutters maxWidth={false} sx={{ bgcolor: 'white', width: '100vw', height: '3000px' }}>
      <Header />
      <Slogan />
      <HeroSection video={productHeroSection} title={'My product.'} descTitle={'Connects you to your\nevery adventure.'} />
      <Box>

      </Box>
      <h1 style={{ color: 'black' }}>HELOO ProductPage</h1>
    </Container>
  )
}

export default ProductPage