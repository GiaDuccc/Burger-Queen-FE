import Header from '~/components/Header/Header'
import Slogan from '~/components/Slogan/Slogan'
import HeroSection from '~/components/HeroSection/HeroSection'
import nikeVideoHeroSection from '~/assets/videoHeroSection/Nike. Just Do It. Nike VN.mp4'
import Container from '@mui/material/Container'

function NikePage () {
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
      <HeroSection video={nikeVideoHeroSection} title={'Mac'} descTitle={'If you can dream it,\nMac can do it.'} />
      <h1 style={{ color: 'black' }}>Helo NikePage</h1>
    </Container>
  )
}

export default NikePage