import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRef } from 'react';

// Mock data
const items = [
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

function Slider() {

  const sliderRef = useRef(null)

  const sliderNextItem = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 424,
        behavior: 'smooth'
      })
    }
  }

  const sliderPrevItem = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -424,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Box sx={{ p: '0 0  24px' }}>
      <Typography sx={{ fontSize: '56px', fontWeight: '600', p: '32px 0 32px 91px', color: 'rgba(0,0,0,.85)' }}>All brand.</Typography>
      <Box
        ref={ sliderRef }
        sx={{
          display: 'flex',
          overflowX: 'scroll',
          // scrollSnapType: 'x mandatory',
          gap: 3,
          p: '12px 91px 12px 91px',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none' // Ẩn scroll bar ở Chrome
          }
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              flex: '0 0 auto',
              scrollSnapAlign: 'start',
              width: '400px',
              height: '500px',
              borderRadius: 4,
              bgcolor: 'lightgray',
              display: 'flex',
              fontWeight: 'bold',
              transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
              backgroundImage: `url(${item.products.image})`,
              backgroundSize: 'cover',
              boxShadow: '1px 1px 10px rgb(220, 220, 220)',
              '&:hover': {
                boxShadow: '2px 2px 8px rgb(201, 200, 200)',
                transform: 'scale(1.02)',
                transformOrigin: 'center',
                cursor: 'pointer'
              }
            }}
          >
            <Box sx={{ color: `${item.products.textColor} !important`, p: '36px 32px' }}>
              <Typography sx={{ fontWeight: '600', fontSize: '32px' }}>{item.brand}</Typography>
              <Typography sx={{ fontWeight: '600', fontSize: '16px', pt: '10px', pb: '6px' }}>{item.products.description}</Typography>
              <Typography sx={{}}>From {Number(item.products.price).toLocaleString('vi-VN')}đ</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 2, p: '16px 32px', justifyContent: 'right' }}>
        <Box
          sx={{
            bgcolor: '#f5f6fa',
            width: '40px',
            height: '40px',
            borderRadius: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(0,0,0,.85)',
            '&:hover': {
              bgcolor: '#eeeeee'
            }
          }}
          onClick={sliderPrevItem}
        >
          <ChevronLeftIcon/>
        </Box>
        <Box
          sx={{
            bgcolor: '#f5f6fa',
            width: '40px',
            height: '40px',
            borderRadius: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(0,0,0,.85)',
            '&:hover': {
              bgcolor: '#eeeeee'
            }
          }}
          onClick={sliderNextItem}
        >
          <ChevronRightIcon />
        </Box>
      </Box>
    </Box>
  )
}

export default Slider