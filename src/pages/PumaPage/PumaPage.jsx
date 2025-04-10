import Header from '~/components/Header/Header'
import HeroSection from '~/components/HeroSection/HeroSection'
import Slogan from '~/components/Slogan/Slogan'
import Container from '@mui/material/Container'

function PumaPage () {
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
      <HeroSection title={'Mac'} descTitle={'If you can dream it,\nMac can do it.'} />
      <h1 style={{ color: 'black' }}>Helo PumaPage</h1>
    </Container>
  )
}

export default PumaPage