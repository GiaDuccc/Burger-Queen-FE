import Container from '@mui/material/Container'
import Header from '~/components/Header/Header'
import Slogan from '~/components/Slogan/Slogan'
import HeroSection from '~/components/HeroSection/HeroSection'
import video1 from '~/assets/videoHeroSection/home.mp4'

function HomePage() {

  // const scrollToSection = (id) => {
  //   const element = document.getElementById(id)
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' })
  //   }
  // }

  return (
    <Container disableGutters maxWidth={false} sx={{
      bgcolor: 'white',
      width: '100%',
      // height: 'fi',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <Slogan />
      <HeroSection video={video1} title={'Nice store'} descTitle={'Every Step, Handled with Care.'} />
    </Container>
  )
}

export default HomePage