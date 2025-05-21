import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
// import Header from '~/components/Header/Header'
import Header from '~/components/Header/Header'
import Slogan from '~/components/Slogan/Slogan'
import HeroSection from '~/components/HeroSection/HeroSection'
import video1 from '~/assets/videoHeroSection/video1.mp4'
import SliderUtilities from '~/components/SliderUtilities/SliderUtilities'
import { useState } from 'react'

const Utilities = [
  {
    brand: 'Boot',
    products: {
      avatar: 'https://static.vecteezy.com/system/resources/previews/002/205/908/non_2x/checkout-payment-icon-free-vector.jpg',
      name: 'Monthly payments made easy',
      description: 'Includes 0% interest option',
      textColor: 'rgba(0,0,0,.85)'
    }
  },
  {
    brand: 'Boot',
    products: {
      avatar: 'https://media.istockphoto.com/id/1312921508/vector/free-delivery-truck-icon-fast-shipping-design-for-website-and-mobile-apps-vector-illustration.jpg?s=612x612&w=0&k=20&c=RiMC1uNjbKcoC-776hknwM02J8U9BtkjAQCkC-9PIoo=',
      name: 'Free shipping',
      description: 'Free delivery straight to your door',
      image: '',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Boot',
    products: {
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMnswhmwWfeiTERGW-ui8EOZyug3PDfa6uRA&s',
      name: 'Shop with the experts',
      description: 'shop with the online experts',
      price: 4200000,
      image: '',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Boot',
    products: {
      avatar: 'https://cdn-icons-png.freepik.com/512/1611/1611179.png',
      name: 'Save money',
      description: 'When you buy shoes you will get credit points for next time',
      price: 2600000,
      image: '',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Boot',
    products: {
      avatar: 'https://static.thenounproject.com/png/1950124-512.png',
      name: 'Custom shoes size',
      description: 'Choose the right shoe size for your feet',
      price: 1500000,
      image: '',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Boot',
    products: {
      avatar: 'https://cdn-icons-png.flaticon.com/512/3886/3886915.png',
      name: 'Personalized shopping',
      description: 'Shopping experience designed for you',
      price: 1600000,
      image: '',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  }
]

function HomePage() {

  const [isLoadingToPage, setIsLoadingToPage] = useState(true)

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  setTimeout(() => {
    setIsLoadingToPage(false)
  }, 1000)

  if (isLoadingToPage) {
    return (<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box className='spinner-large'></Box>
    </Box>)
  }

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
      <HeroSection video={video1} title={'Dynamic Hype Club'} descTitle={'Luxury shoes,\nhelp your foot comfortable'} />
      {/* <SliderUtilities id='Utilities' title='Utilities' items={Utilities} name={'Utilities'} /> */}

    </Container>
  )
}

export default HomePage