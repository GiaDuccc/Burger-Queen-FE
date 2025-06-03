import Container from '@mui/material/Container'
import Header from '~/components/Header/Header'
import Slogan from '~/components/Slogan/Slogan'
import HeroSection from '~/components/HeroSection/HeroSection'
import video1 from '~/assets/videoHeroSection/home.mp4'
import Footer from '~/components/Footer/Footer'
import Slider from '~/components/Slider/Slider_v2'

const brand = ['nike', 'adidas', 'puma', 'new balance', 'vans', 'balenciaga']

function HomePage() {

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
      <HeroSection video={video1} title={'Nice store'} descTitle={'Every Step, Handled with Care.'} type='video' />
      { brand.map((item, idx) => (
        <Slider brand={item} id={item} name={item.slice(0, 1).toUpperCase() + item.slice(1)} type='' key={idx} />
      ))}
      <Footer />
    </Container>
  )
}

export default HomePage