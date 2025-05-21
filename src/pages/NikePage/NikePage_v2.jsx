import Header from '~/components/Header/Header'
import Slogan from '~/components/Slogan/Slogan'
import HeroSection from '~/components/HeroSection/HeroSection'
import nikeVideoHeroSection from '~/assets/videoHeroSection/Nike. Just Do It. Nike VN.mp4'
import Container from '@mui/material/Container'
import NavBar from '~/components/NavBar/NavBar'
import Footer from '~/components/Footer/Footer'
import Slider from '~/components/Slider/Slider_v2'

// Mock data
const Products = [
  {
    brand: 'Nike',
    products: {
      name: 'Air Jordan 1',
      description: 'Classic basketball sneaker',
      price: 3500000,
      image: 'https://i.pinimg.com/736x/a1/cb/ad/a1cbade99c9b4dea5d658f0a5182949a.jpg',
      textColor: 'rgba(0,0,0,.85)'
    }
  },
  {
    brand: 'Adidas',
    products: {
      name: 'Ultraboost',
      description: 'High-performance running shoes',
      price: 4200000,
      image: 'https://i.pinimg.com/736x/97/26/61/972661f3a16b2b1a6bc89675da6049cd.jpg',
      textColor: 'white' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Biti\'s',
    products: {
      name: 'Biti\'s Hunter',
      description: 'High-performance running shoes',
      price: 4200000,
      image: 'https://vlpfashion.com/wp-content/uploads/2021/09/cac-mau-giay-bitis-hunter.jpg',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Puma',
    products: {
      name: 'RS-X',
      description: 'Retro sneakers with bold design',
      price: 2600000,
      image: 'https://i.pinimg.com/736x/f0/b5/05/f0b5056e165eb9c079d0ea3487d3c5f5.jpg',
      textColor: 'white' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Converse',
    products: {
      name: 'Chuck Taylor All Star',
      description: 'Iconic canvas high-tops',
      price: 1500000,
      image: 'https://i.pinimg.com/736x/fa/f4/af/faf4afad23fbe651fd40319f983a9e42.jpg',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Vans',
    products: {
      name: 'Old Skool',
      description: 'Skateboard shoes with stripe',
      price: 1600000,
      image: 'https://i.pinimg.com/736x/f7/85/a0/f785a0ee2a48474d9f86edc916987abc.jpg',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  }
]

const Sneaker = [
  {
    brand: 'Nike',
    products: {
      name: 'Nike Air Force 1',
      description: 'Men\'s Shoes',
      price: 3500000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png',
      textColor: 'rgba(0,0,0,.85)'
    }
  },
  {
    brand: 'Nike',
    products: {
      name: 'Nike P-6000',
      description: 'Men\'s Shoe',
      price: 4200000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fa1bceaf-21bc-44b5-853b-33eac3c34e2b/WMNS+NIKE+P-6000.png',
      textColor: 'white' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Nike',
    products: {
      name: 'Nike Killshot 2 Leather',
      description: 'Men\'s Shoes',
      price: 4200000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/73627869-5239-40d9-b41f-5dcdaba413e4/KILLSHOT+2+LEATHER.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Nike',
    products: {
      name: 'Tatum 2 \'Sidewalk Chalk\' PF',
      description: 'Retro sneakers with bold design',
      price: 2600000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/fcb3546d-f3aa-4374-8a29-a0af4c21d86b/JORDAN+TATUM+2+PF.png',
      textColor: 'white' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Nike',
    products: {
      name: 'Nike Air Max 1',
      description: 'Men\'s Golf Shoes',
      price: 1500000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a9e02dd4-062b-4625-8166-bb066f68bc14/NIKE+AIR+MAX+1+%2786+OG+G.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Nike',
    products: {
      name: 'Air Jordan 1 Low',
      description: 'Men\'s Shoes',
      price: 1600000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b268345c-8eb7-413c-ae5d-73db80f165e5/AIR+JORDAN+1+LOW.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  }
]

const Classic = [
  {
    brand: 'Classic',
    products: {
      name: 'Nike SB FC Classic',
      description: 'Skate Shoes',
      price: 3500000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0d81f2e7-5642-49d1-9121-10fc4fb2ebc3/NIKE+SB+FC+CLASSIC.png',
      textColor: 'rgba(0,0,0,.85)'
    }
  }
]

const Running = [
  {
    brand: 'Runnung',
    products: {
      name: 'Nike Vaporfly 4',
      description: 'Men\'s Road Racing Shoes',
      price: 3500000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5870c2a4-db94-4590-abb5-00f2119e6692/ZOOMX+VAPORFLY+NEXT%25+4+PRM.png',
      textColor: 'rgba(0,0,0,.85)'
    }
  },
  {
    brand: 'Runnung',
    products: {
      name: 'Nike Vomero 18',
      description: 'Women\'s Road Running Shoes',
      price: 4200000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a5ce41b6-b350-48ff-8838-f09a6b07b737/W+NIKE+VOMERO+18.png',
      textColor: 'white' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Runnung',
    products: {
      name: 'Nike Vomero 18',
      description: 'Men\'s Road Running Shoes',
      price: 4200000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bcc74905-983b-4bf5-8417-6c187b8758c8/NIKE+VOMERO+18.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Runnung',
    products: {
      name: 'Nike Vomero 18',
      description: 'Men\'s Road Running Shoes',
      price: 2600000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e3a103c4-e874-4a24-81d3-62b6f3fa58ca/NIKE+VOMERO+18.png',
      textColor: 'white' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Runnung',
    products: {
      name: 'Nike Vomero 18 SE',
      description: 'Men\'s Road Running Shoes',
      price: 1500000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1190bf7e-4cc2-4d48-9e7f-ba603bc83657/NIKE+VOMERO+18+SE.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Runnung',
    products: {
      name: 'Nike Vomero 18',
      description: 'Men\'s Road Running Shoes',
      price: 1600000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/98f29f0c-d5ca-407f-9dac-cdf4bb39a4c4/NIKE+VOMERO+18.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  }
]

const Basketball = [
  {
    brand: 'Basketball',
    products: {
      name: 'KD18 EP',
      description: 'Basketball Shoes',
      price: 3500000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3f37a7c6-dbf0-4b8f-9e23-2fb389288dcc/KD18+NRG+EP.png',
      textColor: 'rgba(0,0,0,.85)'
    }
  },
  {
    brand: 'Basketball',
    products: {
      name: 'KD18 EYBL EP',
      description: 'Basketball Shoes',
      price: 4200000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f06dba73-3e1e-47ad-8bf3-e09a7cf1cdaf/KD18+EYBL+EP.png',
      textColor: 'white' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Basketball',
    products: {
      name: 'Tatum 3 PF \'Tunnel Walk\'',
      description: 'Basketball Shoes',
      price: 4200000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/614ef248-504e-4309-b1c6-42d0de52a9cf/JORDAN+TATUM+3+PF.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Basketball',
    products: {
      name: 'KD18 EP',
      description: 'Basketball Shoes',
      price: 2600000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/40770976-bdb8-41f5-8155-78a49a9bdc90/KD18+EP.png',
      textColor: 'white' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Basketball',
    products: {
      name: 'Luka 4 PF \'Space Navigator\'',
      description: 'Basketball Shoes',
      price: 1500000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e840901d-6404-42e8-ac19-f26608d749f0/JORDAN+LUKA+4+PF.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Basketball',
    products: {
      name: 'Luka .77 PF',
      description: 'Basketball Shoes',
      price: 1600000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/12e877a0-c0ac-4527-9707-28b97145159c/JORDAN+LUKA+.77+PF.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  }
]

const Football = [
  {
    brand: 'Football',
    products: {
      name: 'Nike Mercurial Superfly 10 Elite',
      description: 'FG High-Top Football Boot',
      price: 3500000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f4fefcee-a7d7-46db-ae9f-d71e68b93e5d/ZM+SUPERFLY+10+ELITE+FG.png',
      textColor: 'rgba(0,0,0,.85)'
    }
  },
  {
    brand: 'Football',
    products: {
      name: 'Nike Mercurial Superfly 9 Elite',
      description: 'Firm-Ground High-Top Football Boot',
      price: 4200000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a3225aa6-56b1-4fb8-b61d-da2557571a51/ZOOM+SUPERFLY+9+ELITE+FG.png',
      textColor: 'white' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Football',
    products: {
      name: 'Nike Phantom GX 2 Elite',
      description: 'FG Low-Top Football Boot',
      price: 4200000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8937af70-c95a-4886-91f4-3ce7c86f5bc4/PHANTOM+GX+II+ELITE+FG.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Football',
    products: {
      name: 'KD18 EP',
      description: 'Football Shoes',
      price: 2600000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/40770976-bdb8-41f5-8155-78a49a9bdc90/KD18+EP.png',
      textColor: 'white' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Football',
    products: {
      name: 'Luka 4 PF \'Space Navigator\'',
      description: 'Football Shoes',
      price: 1500000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e840901d-6404-42e8-ac19-f26608d749f0/JORDAN+LUKA+4+PF.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Football',
    products: {
      name: 'Luka .77 PF',
      description: 'Football Shoes',
      price: 1600000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/12e877a0-c0ac-4527-9707-28b97145159c/JORDAN+LUKA+.77+PF.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  }
]

const Boot = [
  {
    brand: 'Boot',
    products: {
      name: 'Nike Mercurial Superfly 10 Elite',
      description: 'FG High-Top Boot Boot',
      price: 3500000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f4fefcee-a7d7-46db-ae9f-d71e68b93e5d/ZM+SUPERFLY+10+ELITE+FG.png',
      textColor: 'rgba(0,0,0,.85)'
    }
  },
  {
    brand: 'Boot',
    products: {
      name: 'Nike Mercurial Superfly 9 Elite',
      description: 'Firm-Ground High-Top Boot Boot',
      price: 4200000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a3225aa6-56b1-4fb8-b61d-da2557571a51/ZOOM+SUPERFLY+9+ELITE+FG.png',
      textColor: 'white' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Boot',
    products: {
      name: 'Nike Phantom GX 2 Elite',
      description: 'FG Low-Top Boot Boot',
      price: 4200000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8937af70-c95a-4886-91f4-3ce7c86f5bc4/PHANTOM+GX+II+ELITE+FG.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Boot',
    products: {
      name: 'KD18 EP',
      description: 'Boot Shoes',
      price: 2600000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/40770976-bdb8-41f5-8155-78a49a9bdc90/KD18+EP.png',
      textColor: 'white' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Boot',
    products: {
      name: 'Luka 4 PF \'Space Navigator\'',
      description: 'Boot Shoes',
      price: 1500000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e840901d-6404-42e8-ac19-f26608d749f0/JORDAN+LUKA+4+PF.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  },
  {
    brand: 'Boot',
    products: {
      name: 'Luka .77 PF',
      description: 'Boot Shoes',
      price: 1600000,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/12e877a0-c0ac-4527-9707-28b97145159c/JORDAN+LUKA+.77+PF.png',
      textColor: 'rgba(0,0,0,.85)' // Đặt màu chữ cho sản phẩm
    }
  }
]

function NikePage() {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <Container disableGutters maxWidth={false} sx={{
      bgcolor: 'white',
      width: '100%',
      height: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
      scrollBehavior: 'smooth'
    }}>
      <Header />
      <NavBar scrollToSection={(id) => scrollToSection(id)} />
      <Slogan />
      <HeroSection
        video={nikeVideoHeroSection} title={'NIKE'} descTitle={'Luxury shoes,\n help your life comfortable.'}
      />
      {/* <Slider id='Products' title='Nike-Products' items={Products} name={'Products'} />
      <Slider id='Sneaker' title='Nike-Sneaker' items={Sneaker} name={'Sneaker'} />
      <Slider id='Classic' title='Nike-Classic' items={Classic} name={'Classic'} />
      <Slider id='Running' title='Nike-Running' items={Running} name={'Running'} />
      <Slider id='Basketball' title='Nike-Basketball' items={Basketball} name={'Basketball'} />
      <Slider id='Football' title='Nike-Football' items={Football} name={'Football'} />
      <Slider id='Boot' title='Nike-Boot' items={Boot} name={'Boot'} /> */}

      {/* <Footer /> */}
    </Container>
  )
}

export default NikePage