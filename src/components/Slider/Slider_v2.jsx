import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useRef, useState } from 'react'
import { fetchLimitedProductsAPI } from '~/apis'
import theme from '~/theme'
import rightIcon from '~/assets/right.png'
import leftIcon from '~/assets/left.png'
import ProductCardDetail from '~/pages/ProductPage/ProductList/ProductCardDetail/ProductCardDetail'
import { useSearchParams } from 'react-router-dom'

function Slider({ id, name, type, brand }) {
  const [products, setProducts] = useState([])
  const sliderRef = useRef(null)
  const [productSelected, setProductSelected] = useState(null)
  const [, setSearchParams] = useSearchParams()

  useEffect(() => {
    (async () => {
      const data = await fetchLimitedProductsAPI(brand, type)
      setProducts(data)
      // console.log(data)
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]) // Gọi lại nếu type thay đổi

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
          gap: 3,
          p: '12px 91px 12px 91px',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none' // Ẩn scroll bar ở Chrome
          }
        }}
      >
        {products.map((item, index) => (
          <Box
            key={index}
            onClick={() => {
              setSearchParams({ slug: item.slug })
              setProductSelected(item)
            }}
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
              backgroundImage: `url("${theme.API_ROOT}${item.adImage}")`,
              backgroundSize: 'cover',
              boxShadow: '1px 1px 10px rgb(220, 220, 220)',
              mb: products.length > 3 ? '0' : '52px',
              '&:hover': {
                boxShadow: '2px 2px 8px rgb(201, 200, 200)',
                transform: 'scale(1.02)',
                transformOrigin: 'center',
                cursor: 'pointer'
              }
            }}
          >
            <Box sx={{
              p: '36px 32px',
              '& p': { color: '#fff', textShadow: '1px 1px 10px rgba(0,0,0, .85)' }
            }}>
              <Typography sx={{ fontWeight: '600', fontSize: '32px' }}>{item.name}</Typography>
              {/* <Typography sx={{ fontWeight: '600', fontSize: '16px', pt: '10px', pb: '6px' }}>{item.highLight}</Typography> */}
              <Typography sx={{ mt: '16px', fontSize: '18px' }}>From {Number(item.price).toLocaleString('vi-VN')}đ</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      {products.length > 3 && (
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
            <img src={leftIcon} style={{ width: '20px', userSelect: 'none' }} />
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
            <img src={rightIcon} style={{ width: '20px', userSelect: 'none' }} />
          </Box>
        </Box>
      )}
      {productSelected && (
        <ProductCardDetail open={Boolean(productSelected)} onClose={() => setProductSelected(null)} product={productSelected} />
      )}
    </Box>
  )
}

export default Slider