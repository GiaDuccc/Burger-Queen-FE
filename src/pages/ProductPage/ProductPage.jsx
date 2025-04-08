import Header from '~/components/Header/Header'
import HeroSection from '~/components/HeroSection/HeroSection'
import Slogan from '~/components/Slogan/Slogan'
import Container from '@mui/material/Container'

function ProductPage () {
  return (
    <Container disableGutters maxWidth={false} sx={{ bgcolor: 'white', width: '100vw' }}>
      <Header />
      <Slogan />
      <HeroSection />
      <h1>HELOO NikePage</h1>
    </Container>
  )
}

export default ProductPage