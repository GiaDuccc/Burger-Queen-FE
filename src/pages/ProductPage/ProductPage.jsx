/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import Header from '~/components/Header/Header'
import HeroSection from '~/components/HeroSection/HeroSection'
import Slogan from '~/components/Slogan/Slogan'
import Container from '@mui/material/Container'
import productHeroSection from '~/assets/videoHeroSection/Product2.mp4'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchAllProductPageAPI } from '~/apis'
import ProductList from './ProductList/ProductList'
import Filter from './Filter/Filter'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import '~/App.css'

// const products = [
//   {
//     image: [
//       'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/68ae7ea7849b43eca70aac1e00f5146d_9366/Giay_Stan_Smith_trang_FX5502_01_standard.jpg',
//       'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ab8e8332-0a72-44b7-9049-030819e196ab/W+AIR+MAX+DN8.png'
//     ],
//     colors: ['blue-#749cbe', 'white-#f5f5f7'],
//     name: 'Air Runner Max',
//     stock: 20,
//     price: 5589000
//   }
// ]

// bảng quy đổi từ màu -> mã màu
function getColorHex(colorName) {
  const colorMap = {
    red: '#f54a4a',
    blue: '#406dff',
    green: '#90c890',
    white: '#ffffff',
    black: '#2b3035',
    purple: '#b56fe9',
    orange: '#ff8939',
    brown: '#9b6d4e',
    grey: '#a7a7a7',
    yellow: '#ffeb00'
  }
  return colorMap[colorName] || '#000000'
}

function ProductPage() {
  // state lưu danh sách sản phẩm
  const [productList, setProductList] = useState([])
  // Theo dõi biến ref (mục đích cho cuộn lên khi đổi trang)
  const contentRef = useRef(null)
  // lưu biến lần đầu load tránh vào lần đầu bị cuộn lên
  const isFirstLoad = useRef(true)
  // state lưu khi đang fetch
  const [isLoading, setIsLoading] = useState(true)
  // state lưu trang product (dùng để lưu trang product đã qua và trang product mới để khi đổi trang không bị khựng)
  const [productCache, setProductCache] = useState({})

  // set param trên URL
  const [searchParams, setSearchParams] = useSearchParams()
  // Lấy ra page ở trên URL, nếu chưa có thì mặc định là 1 khi vừa vào trang lần đầu
  const pageFromURL = parseInt(searchParams.get('page')) || 1

  // set Current page bằng page trên param
  const currentPage = pageFromURL

  // state lưu tổng trang để làm mục trang phía cuối
  const [totalPages, setTotalPages] = useState(0)

  // Hàm handle khi next trang
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 }, { replace: false })
      // setCurrentPage(prev => prev + 1)
    }
  }

  // Hàm handle khi prev trang
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 }, { replace: false })
      // setCurrentPage(prev => prev - 1)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    // setSearchParams({ page: currentPage }, { replace: false })
    if (productCache[currentPage]) {
      setProductList(productCache[currentPage])
      setIsLoading(false)
    } else {
      fetchAllProductPageAPI(currentPage, 12).then(data => {
        const products = data.data.products.map(product => ({
          image: ['/assets/anh1.png', '/assets/anh3.png'],
          colors: product.color.map(c => c + `-${getColorHex(c)}`),
          name: product.name,
          stock: product.stock,
          price: product.price
        }))
        setProductList(products)
        setProductCache(prev => ({
          ...prev,
          [currentPage]: products
        }))
        setTotalPages(Math.ceil(data.data.total / 12))
        setIsLoading(false)
      })

    }
  }, [currentPage])

  useEffect(() => {
    if (!productCache[currentPage + 1] && currentPage < totalPages) {
      console.log('chay fetch 2')
      fetchAllProductPageAPI(currentPage + 1, 12).then(data => {
        const nextProducts = data.data.products.map(product => ({
          image: ['/assets/anh1.png', '/assets/anh3.png'],
          colors: product.color.map(c => c + `-${getColorHex(c)}`),
          name: product.name,
          stock: product.stock,
          price: product.price
        }))
        setProductCache(prev => ({
          ...prev,
          [currentPage + 1]: nextProducts
        }))
      })
    }
  }, [currentPage, totalPages])

  // useEffect(() => {
  //   // Khi URL thay đổi, update lại currentPage
  //   setCurrentPage(pageFromURL)
  // }, [pageFromURL])

  useEffect(() => {
    // console.log(totalPages)
    // console.log(`${currentPage}`, productCache[currentPage])
    // console.log(`${currentPage + 1}`, productCache[currentPage + 1])
    console.log('productCache:', productCache)

  })

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage])


  return (
    <Container disableGutters maxWidth={false} sx={{ bgcolor: 'white', width: '100%', height: 'fit-content' }}>
      <Header />
      <Slogan />
      <HeroSection video={productHeroSection} title={'My product.'} descTitle={'Connects you to your\nevery adventure.'} />
      {/* Product list & Filter */}
      <Box
        ref={contentRef}
        sx={{
          p: '0 84px 128px 84px',
          heigth: 'fit-content',
          width: '100%'
        }}
      >
        <Box>
          <Typography sx={{ color: 'rgba(0,0,0,.85)', fontSize: '48px', fontWeight: '600', p: '24px 8px', display: 'inline-block' }} >
            All products.
          </Typography>
          <Typography sx={{ display: 'inline-block', color: '#7e7e85', fontSize: '48px', fontWeight: '600' }} >Choose one</Typography>
        </Box>
        <Box
          key={currentPage}
          className="ProductList_Filter"
          sx={{ display: 'flex', gap: 3, heigth: '100%' }}>
          {/* Filter */}
          <Filter />

          {/* Products list */}
          <Box
            className="fade-in"
            sx={{
              flex: 8,
              height: 'fit-content'
            }}
          >
            <ProductList products={productList} />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
              {currentPage === 1 ?
                (<Box sx={{ width: '40px', height: '40px', bgcolor: 'white' }}></Box>)
                :
                (<Box
                  sx={{
                    bgcolor: '#f3f3f3',
                    // bgcolor: '#333336',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '36px',
                    transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
                    transformOrigin: 'center',
                    color: 'rgba(0,0,0,.5)',
                    '&:hover': {
                      color: 'rgba(0,0,0,.85)',
                      cursor: 'pointer',
                      boxShadow: '0.5px 0.5px 10px rgb(220, 220, 220)'
                    }
                  }}
                  onClick={handlePrevPage}
                >
                  <KeyboardArrowLeftIcon />
                </Box>)
              }

              <Typography sx={{ color: '#000', fontSize: '16px' }}>{currentPage}</Typography>
              {currentPage === totalPages ?
                (<Box sx={{ width: '40px', height: '40px', bgcolor: 'white' }}></Box>)
                :
                (<Box
                  sx={{
                    bgcolor: '#f3f3f3',
                    // bgcolor: '#333336',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '36px',
                    transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
                    transformOrigin: 'center',
                    color: 'rgba(0,0,0,.5)',
                    '&:hover': {
                      color: 'rgba(0,0,0,.85)',
                      cursor: 'pointer',
                      boxShadow: '0.5px 0.5px 10px rgb(220, 220, 220)'
                    }
                  }}
                  onClick={handleNextPage}
                >
                  <KeyboardArrowRightIcon />
                </Box>)
              }

            </Box>
          </Box>

        </Box>
      </Box>
    </Container>
  )
}

export default ProductPage