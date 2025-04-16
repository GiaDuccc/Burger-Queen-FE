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
import { fetchAllProductFilter, fetchAllProductPageAPI } from '~/apis'
import ProductList from './ProductList/ProductList'
import Filter from './Filter/Filter'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import '~/App.css'
import CircularProgress from '@mui/material/CircularProgress'

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
    gray: '#a7a7a7',
    yellow: '#ffeb00',
    cream: '#fff8dc',
    gold: '#FFD700',
    pink: '#f188ff',
    copper: '#B87333',
    lightPink: '#FFB6C1',
    darkPink: '#FF69B4'
  }
  return colorMap[colorName] || '#00e7c5'
}

function ProductPage () {
  // state lưu danh sách sản phẩm
  const [productList, setProductList] = useState([])
  // Theo dõi biến ref (mục đích cho cuộn lên khi đổi trang)
  const contentRef = useRef(null)
  // lưu biến lần đầu load tránh vào lần đầu bị cuộn lên
  const [isFirstLoad, setIsFirstLoad] = useState(true)
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

  const [filterOptions, setFilterOptions] = useState([])

  // Hàm handle khi next trang
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const currentParams = Object.fromEntries(searchParams.entries())
      currentParams.page = currentPage + 1
      setSearchParams(currentParams, { replace: false })
      // setCurrentPage(prev => prev + 1)
    }
  }

  // Hàm handle khi prev trang
  const handlePrevPage = () => {
    if (currentPage > 1) {
      const currentParams = Object.fromEntries(searchParams.entries())
      currentParams.page = currentPage - 1
      setSearchParams(currentParams, { replace: false })
    }
  }

  useEffect( () => {
    const brandSet = new Set()
    const colorSet = new Set()
    const typeSet = new Set()
    const stockSet = (['Just in', 'Sold out'])
    const priceSet = (['Just in', 'Sold out'])

    fetchAllProductFilter().then(data => {
      data.forEach(product => {
        brandSet.add(product.brand.toLowerCase())
        product.color.forEach(c => colorSet.add(c.toLowerCase()))
        typeSet.add(product.type.toLowerCase())
      })
      setFilterOptions([
        { Brand: Array.from(brandSet).sort() },
        { Color: Array.from(colorSet).sort() },
        { Type: Array.from(typeSet).sort() },
        { Stock: Array.from(stockSet).sort() },
        { Price: Array.from(priceSet).sort() }
      ])
    })

  }, [isFirstLoad])

  useEffect(() => {
    setIsLoading(true)

    const allParams = Object.fromEntries(searchParams.entries())
    const { page, limit, ...filters } = allParams
    const cacheKey = searchParams.toString()

    if (productCache[cacheKey]) {
      setProductList(productCache[cacheKey])
      setIsLoading(false)
    } else {

      fetchAllProductPageAPI(currentPage, 12, filters).then(data => {
        const products = data.data.products.map(product => ({
          image: product.image?.map?.(i => `/allProduct/${product.name}/`+i.split('.')[0] + '.png'),
          colors: product.color.map(c => c + `-${getColorHex(c)}`),
          name: product.name,
          type: product.type,
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
  }, [searchParams])

  useEffect(() => {

    const allParams = Object.fromEntries(searchParams.entries())
    const { page, limit, ...filters } = allParams
    if (!productCache[currentPage + 1] && currentPage < totalPages) {
      fetchAllProductPageAPI(currentPage + 1, 12, filters).then(data => {
        const nextProducts = data.data.products.map(product => ({
          image: ['/assets/anh1.png', '/assets/anh3.png'],
          colors: product.color.map(c => c + `-${getColorHex(c)}`),
          name: product.name,
          type: product.type,
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


  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries())
    currentParams.page = pageFromURL
    setSearchParams(currentParams, { replace: false })
    setIsFirstLoad(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Chạy 1 lần duy nhất
  
  // Chạy khi đổi trang hoặc filter để scroll
  useEffect(() => {
    if (!isFirstLoad && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [currentPage])

  useEffect(() => {
    // console.log(productList)
    console.log(isFirstLoad)
    // console.log(totalPages)
    // console.log('productCache', productCache)
    // console.log('searchParams', searchParams)
  }, [isFirstLoad])

  return (
    <Container disableGutters maxWidth={false} sx={{ bgcolor: 'white', width: '100%', height: 'fit-content' }}>
      <Header />
      <Slogan />
      <HeroSection video={productHeroSection} title={'My product.'} descTitle={'Connects you to your\nevery adventure.'} />
      {/* <Box sx={{ height: '1000px', bgcolor: '#000' }}></Box> */}
      {/* Product list & Filter */}
      <Box
        ref={contentRef}
        id="productContent"
        sx={{
          p: '0 84px 128px',
          height: 'fit-content',
          width: '100%'
        }}
      >
        <Box>
          <Typography sx={{ color: 'rgba(0,0,0,.85)', fontSize: '48px', fontWeight: '600', p: '24px 8px', display: 'inline-block' }} >
            All products.
          </Typography>
          <Typography sx={{ display: 'inline-block', color: '#7e7e85', fontSize: '48px', fontWeight: '600' }} >Choose for you</Typography>
        </Box>
        <Box
          // key={currentPage}
          className="ProductList_Filter"
          sx={{ display: 'flex', gap: 3, heigth: '100%' }}>

          {/* Filter */}
          <Filter filterOptions={filterOptions} />

          {/* Products list */}
          {isLoading ?
            (<div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', flex: 8 }}>
              <CircularProgress />
            </div>)
            :
            (<Box
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
                      transition: 'all 0.2s cubic-bezier(0.42, 0, 0.58, 1)',
                      transformOrigin: 'center',
                      color: 'rgba(0,0,0,.5)',
                      '&:hover': {
                        color: 'white',
                        bgcolor: 'rgba(0,0,0,.85)',
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
                      transition: 'all 0.2s cubic-bezier(0.42, 0, 0.58, 1)',
                      transformOrigin: 'center',
                      color: 'rgba(0,0,0,.5)',
                      '&:hover': {
                        color: 'white',
                        bgcolor: 'rgba(0,0,0,.85)',
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
            </Box>)
          }

        </Box>
      </Box>
    </Container>
  )
}

export default ProductPage