import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import searchIcon from '~/assets/search.png'
import TextField from '@mui/material/TextField'
import closeIcon from '~/assets/x-white.png'
import closeIconBlack from '~/assets/x.png'
import logoIcon from '~/assets/logo2.png'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import ProductCardDetail from '~/pages/ProductPage/ProductList/ProductCardDetail/ProductCardDetail'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import '~/App.css'

function Search({ open, toggleDrawer, productList }) {

  const [searchValue, setSearchValue] = useState('')
  const [searchProduct, setSearchProduct] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchRecent, setSearchRecent] = useState(JSON.parse(localStorage.getItem('searchRecent')) || [])
  const navigate = useNavigate()
  const location = useLocation()
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams()

  const handleClick = (product) => {
    let updatedRecent = [...searchRecent]

    // Xoá nếu đã tồn tại (để không bị trùng)
    updatedRecent = updatedRecent.filter(item => item !== searchValue)

    // Thêm mới vào đầu
    updatedRecent.unshift(searchValue)

    if (searchRecent.length > 5) {
      updatedRecent.pop()
    }
    localStorage.setItem('searchRecent', JSON.stringify(updatedRecent))
    setSearchRecent(updatedRecent)

    const selectedProduct = {
      ...product,
      colors: product.colors.map(color => ({
        ...color,
        imageDetail: color.imageDetail.map(image =>
          `${image}`
        )
      })),
      id: product._id
    }
    setSelectedProduct(selectedProduct)
    // navigate('/product')
  }

  const handleEnter = (data) => {
    let updatedRecent = [...searchRecent]

    // Xoá nếu đã tồn tại (để không bị trùng)
    updatedRecent = updatedRecent.filter(item => item !== searchValue)

    // Thêm mới vào đầu
    updatedRecent.unshift(searchValue)

    if (searchRecent.length > 5) {
      updatedRecent.pop()
    }
    localStorage.setItem('searchRecent', JSON.stringify(updatedRecent))
    setSearchRecent(updatedRecent)

    if (location.pathname === '/product') {
      const newParams = new URLSearchParams()
      newParams.set('search', data)
      setSearchParams(newParams, { replace: false })
      return
    }
    navigate(`/product?search=${encodeURIComponent(data)}`)
  }

  useEffect(() => {
    setSearchValue('')
  }, [open])

  useEffect(() => {
    const searchProduct = productList.filter(product => {
      if (searchValue.length < 2) return false
      return product.name.toLowerCase().includes(searchValue.toLowerCase())
    })
    setSearchProduct(searchProduct.slice(0, 5))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        transitionDuration={150}
        ModalProps={{
          BackdropProps: {
            sx: {
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(0, 0, 0, 0.2)'
            }
          }
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100vw',
            bgcolor: 'white',
            overflow: 'hidden',
            height: '60%',
            boxShadow: '4px 4px 15px rgb(80, 80, 80)'
          }
        }}
      >
        <Box
          className='fade-in'
          sx={{
            bgcolor: 'white',
            width: '100%',
            py: '8px',
            mx: 'auto',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              height: '70px',
              display: 'flex',
              flex: 1,
              mx: '48px'
            }}
          >
            {/* Logo */}
            <Box sx={{ flex: 1, minWidth: '250px' }}>
              <img className='boom-small' src={logoIcon} style={{ width: '70px', height: '70px' }} />
            </Box>
            {/* Search */}
            <Box
              sx={{ flex: 8, display: 'flex', alignItems: 'center' }}
            >
              <TextField
                placeholder='Search'
                type="text"
                value={searchValue}
                className='slide-from-right'
                onChange={e => setSearchValue(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleEnter(e.target.value)
                    toggleDrawer()
                  }
                }}
                autoFocus
                sx={{
                  width: '100%',
                  height: '40px',
                  input: {
                    color: 'black',
                    width: 'calc(100% - 45px)',
                    fontSize: '18px',
                    paddingRight: '8px',
                    py: 0
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none'
                    },
                    '&:hover fieldset': {
                      border: 'none'
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none'
                    }
                  }
                }}
                InputProps={{
                  sx: {
                    bgcolor: 'rgba(242, 242, 242, 0.9)',
                    borderRadius: 40,
                    padding: 0,
                    '&:hover ': {
                      bgcolor: 'rgb(228, 228, 228)'
                    }
                  },
                  endAdornment: (
                    <Box
                      onClick={() => {
                        handleEnter(searchValue)
                        toggleDrawer()
                      }}
                      sx={{
                        width: '40px',
                        height: '40px',
                        bgcolor: 'rgba(242, 242, 242, 0.9)',
                        borderRadius: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '&:hover': {
                          cursor: 'pointer',
                          bgcolor: 'rgb(202, 202, 202)'
                        }
                      }} >
                      <img src={searchIcon} alt="search" style={{ height: '16px', width: 'auto' }} />
                    </Box>
                  )
                }}
              />
            </Box>
            {/* Close button */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'end', minWidth: '250px' }}>
              <Box
                className='boom-small'
                sx={{
                  bgcolor: '#333336',
                  width: '36px',
                  height: '36px',
                  borderRadius: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  // mr: '-70px',
                  '&:hover svg': {
                    color: 'white',
                    transition: 'color 0.3s cubic-bezier(0.42, 0, 0.58, 1)'
                  }
                }}
                onClick={toggleDrawer}
              >
                <img src={closeIcon} style={{ width: '20px', height: '20px' }} />
              </Box>
            </Box>
          </Box>

          {/* Content */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flex: 9,
              width: '100%',
              py: '24px',
              ml: '48px'
            }}
          >
            <Box sx={{ display: 'flex', flex: 1 }}>
              {searchValue.length >= 2 ? (
                <Box
                  className='fade-in-up'
                  sx={{
                    minWidth: '250px',
                    pr: '72px',
                    gap: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                  <Typography sx={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'rgba(116, 116, 116, 0.9)'
                  }}>Recent Searches</Typography>
                  {searchRecent.map((value, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        '& p': {
                          color: 'black',
                          fontSize: '20px',
                          fontWeight: '500'
                        },
                        '& p:hover': {
                          cursor: 'pointer',
                          opacity: .5
                        },
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Typography
                        onClick={() => setSearchValue(value)}
                      >{value}</Typography>
                      <img
                        onClick={() => {
                          const updatedRecent = [...searchRecent]
                          updatedRecent.splice(idx, 1)
                          localStorage.setItem('searchRecent', JSON.stringify(updatedRecent))
                          setSearchRecent(updatedRecent)
                        }}
                        src={closeIconBlack}
                        style={{
                          width: '20px', height: '20px',
                          '&:hover': {
                            cursor: 'pointer',
                            opacity: .5
                          }
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box sx={{ minWidth: '250px' }}></Box>
              )}
              <Box sx={{
                display: 'flex',
                flexDirection: searchValue.length >= 2 ? 'row' : 'column',
                width: '100%',
                gap: 2,
                // overflowX: 'scroll',
                flex: 1
              }}>
                {searchValue.length >= 2 ? (
                  searchProduct.map((product, idx) => (
                    <Box
                      className="fade-in-right"
                      onClick={() => {
                        handleClick(product)
                        toggleDrawer()
                      }}
                      key={idx}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: '#f6f6f6',
                        p: '16px',
                        borderRadius: '16px',
                        width: '210px',
                        height: '100%',
                        transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
                        '&:hover': {
                          boxShadow: '2px 2px 15px rgb(201, 200, 200)',
                          transform: 'scale(1.01)',
                          transformOrigin: 'center',
                          cursor: 'pointer'
                        }
                      }}
                    >
                      {/* img */}
                      <Box sx={{
                        width: '100%',
                        height: '170px',
                        display: 'flex',
                        justifyContent: 'center'
                        // flex: 1
                      }}>
                        <img
                          src={product.colors[0].imageDetail[0]}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      </Box>
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                          {/* stock */}
                          <Box>
                            <Typography
                              sx={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#d33918',
                                my: '4px'
                              }}
                            >
                              {product.stock > 0 ? 'Just in' : 'Sold out'}
                            </Typography>
                          </Box>
                          {/* Name */}
                          <Box>
                            <Typography
                              sx={{
                                fontSize: '20px',
                                fontWeight: '600'
                              }}
                            >
                              {product.name}
                            </Typography>
                          </Box>
                          {/* Type */}
                          <Box>
                            <Typography
                              sx={{ fontSize: '16px', color: '#7e7e85', pb: '4px' }}
                            >
                              {product.type.slice(0, 1).toUpperCase() + product.type.slice(1)}
                            </Typography>
                          </Box>
                        </Box>
                        {/* Price */}
                        <Box>
                          <Typography
                            sx={{ fontWeight: '600', fontSize: '18px', color: '#000000c2' }}
                          >
                            {Number(product.price).toLocaleString('vi-VN')}đ
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )))
                  :
                  (
                    <Box className='fade-in-up' sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Typography sx={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'rgba(116, 116, 116, 0.9)'
                      }}>Recent Searches</Typography>
                      {searchRecent.map((value, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            '& p': {
                              color: 'black',
                              fontSize: '20px',
                              fontWeight: '500'
                            },
                            '& p:hover': {
                              cursor: 'pointer',
                              opacity: .5
                            },
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Typography
                            onClick={() => setSearchValue(value)}
                          >{value}</Typography>
                          <img
                            onClick={() => {
                              const updatedRecent = [...searchRecent]
                              updatedRecent.splice(idx, 1)
                              localStorage.setItem('searchRecent', JSON.stringify(updatedRecent))
                              setSearchRecent(updatedRecent)
                            }}
                            src={closeIconBlack}
                            style={{
                              width: '20px', height: '20px',
                              '&:hover': {
                                cursor: 'pointer',
                                opacity: .5
                              }
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  )
                }
              </Box>
              <Box sx={{ minWidth: '250px', mr: '96px', display: searchValue.length >= 2 ? 'none' : 'block' }}></Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
      {selectedProduct && (
        <ProductCardDetail
          product={selectedProduct}
          open={Boolean(selectedProduct)}
          onClose={() => {
            setSelectedProduct(null)
          }}
        />
      )}
    </>
  )
}

export default Search
