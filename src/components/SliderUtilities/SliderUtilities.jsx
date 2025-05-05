import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRef } from 'react';
// import addIcon from '/assets/add.png'


function SliderUtilities({ id, items, name }) {

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
              width: '350px',
              height: '300px',
              borderRadius: 4,
              bgcolor: 'white',
              display: 'flex',
              fontWeight: 'bold',
              transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
              backgroundImage: `url(${item.products.image})`,
              backgroundSize: 'cover',
              boxShadow: '1px 1px 10px rgb(220, 220, 220)',
              // '&:hover': {
              // boxShadow: '2px 2px 8px rgb(201, 200, 200)',
              transform: 'scale(1.02)',
              transformOrigin: 'center',
              cursor: 'pointer'
              // }
            }}
          >
            {/* ICON */}
            <Box sx={{ flexDirection: 'column' }}>
              <Box sx={{ p: '24px 24px 0px 24px', textAlign: 'center' }}>
                <img src={item.products.avatar} alt="icon" style={{ width: 50, height: 50 }} />
              </Box>

              <Box sx={{ color: `${item.products.textColor} !important`, p: '16px 24px' }}>
                <Typography sx={{ fontWeight: '600', fontSize: '32px' }}>{item.products.name}</Typography>
                <Typography sx={{ fontWeight: '600', fontSize: '16px', pt: '10px', pb: '6px' }}>{item.products.description}</Typography>
              </Box>
            </Box>
            {/* BUTTON DẤU CỘNG */}
            <Box
              sx={{
                bgcolor: '#222222',
                color: 'white',
                position: 'absolute',
                bottom: 16,
                right: 16,
                width: '40px',
                height: '40px',
                borderRadius: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#000000'
                }
              }}
            >
              {/* <img src={addIcon} style={{ width: '16px', height: '16px' }} /> */}
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

export default SliderUtilities