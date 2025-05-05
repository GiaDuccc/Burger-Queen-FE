import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRef } from 'react';


function Slider({ id, items, name }) {

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
    <Box id={id} sx={{ p: '0 0  24px' }}>
      <Typography sx={{ fontSize: '56px', fontWeight: '600', p: '32px 0 32px 91px', color: 'rgba(0,0,0,.85)' }}>{name}</Typography>
      <Box
        ref={sliderRef}
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
        {Array.isArray(items) && items.map((item, index) => (
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
              <Typography sx={{ fontWeight: '600', fontSize: '32px' }}>{item.products.name}</Typography>
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
        </Box>
      </Box>
    </Box>
  )
}

export default Slider