import Header from '~/components/Header/Header'
import HeroSection from '~/components/HeroSection/HeroSection'
import Slogan from '~/components/Slogan/Slogan'
import Container from '@mui/material/Container'
import productHeroSection from '~/assets/videoHeroSection/Product2.mp4'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useState, useEffect } from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';

const products = [
  {
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c4c1acba-008a-4955-bcf8-dc17250523c5/W+AIR+MAX+DN8.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ab8e8332-0a72-44b7-9049-030819e196ab/W+AIR+MAX+DN8.png'
    ],
    colors: ['blue-#749cbe', 'white-#f5f5f7'],
    name: 'Air Runner Max',
    stock: 20,
    price: 5589000
  },
  {
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c4c1acba-008a-4955-bcf8-dc17250523c5/W+AIR+MAX+DN8.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ab8e8332-0a72-44b7-9049-030819e196ab/W+AIR+MAX+DN8.png'
    ],
    colors: ['blue-#749cbe', 'white-#f5f5f7'],
    name: 'Air Runner Max',
    stock: 20,
    price: 5589000
  },
  {
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c4c1acba-008a-4955-bcf8-dc17250523c5/W+AIR+MAX+DN8.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ab8e8332-0a72-44b7-9049-030819e196ab/W+AIR+MAX+DN8.png'
    ],
    colors: ['blue-#749cbe', 'white-#f5f5f7'],
    name: 'Air Runner Max',
    stock: 20,
    price: 5589000
  },
  {
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c4c1acba-008a-4955-bcf8-dc17250523c5/W+AIR+MAX+DN8.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ab8e8332-0a72-44b7-9049-030819e196ab/W+AIR+MAX+DN8.png'
    ],
    colors: ['blue-#749cbe', 'white-#f5f5f7'],
    name: 'Air Runner Max',
    stock: 20,
    price: 5589000
  },
  {
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c4c1acba-008a-4955-bcf8-dc17250523c5/W+AIR+MAX+DN8.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ab8e8332-0a72-44b7-9049-030819e196ab/W+AIR+MAX+DN8.png'
    ],
    colors: ['blue-#749cbe', 'white-#f5f5f7'],
    name: 'Air Runner Max',
    stock: 20,
    price: 5589000
  },
  {
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c4c1acba-008a-4955-bcf8-dc17250523c5/W+AIR+MAX+DN8.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ab8e8332-0a72-44b7-9049-030819e196ab/W+AIR+MAX+DN8.png'
    ],
    colors: ['blue-#749cbe', 'white-#f5f5f7'],
    name: 'Air Runner Max',
    stock: 20,
    price: 5589000
  },
  {
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c4c1acba-008a-4955-bcf8-dc17250523c5/W+AIR+MAX+DN8.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ab8e8332-0a72-44b7-9049-030819e196ab/W+AIR+MAX+DN8.png'
    ],
    colors: ['blue-#749cbe', 'white-#f5f5f7'],
    name: 'Air Runner Max',
    stock: 20,
    price: 5589000
  },
  {
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c4c1acba-008a-4955-bcf8-dc17250523c5/W+AIR+MAX+DN8.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ab8e8332-0a72-44b7-9049-030819e196ab/W+AIR+MAX+DN8.png'
    ],
    colors: ['blue-#749cbe', 'white-#f5f5f7'],
    name: 'Air Runner Max',
    stock: 20,
    price: 5589000
  },
  {
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c4c1acba-008a-4955-bcf8-dc17250523c5/W+AIR+MAX+DN8.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ab8e8332-0a72-44b7-9049-030819e196ab/W+AIR+MAX+DN8.png'
    ],
    colors: ['blue-#749cbe', 'white-#f5f5f7'],
    name: 'Air Runner Max',
    stock: 20,
    price: 5589000
  },
  {
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c4c1acba-008a-4955-bcf8-dc17250523c5/W+AIR+MAX+DN8.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ab8e8332-0a72-44b7-9049-030819e196ab/W+AIR+MAX+DN8.png'
    ],
    colors: ['blue-#749cbe', 'white-#f5f5f7'],
    name: 'Air Runner Max',
    stock: 20,
    price: 5589000
  },
  {
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c4c1acba-008a-4955-bcf8-dc17250523c5/W+AIR+MAX+DN8.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ab8e8332-0a72-44b7-9049-030819e196ab/W+AIR+MAX+DN8.png'
    ],
    colors: ['blue-#749cbe', 'white-#f5f5f7'],
    name: 'Air Runner Max',
    stock: 20,
    price: 5589000
  },
  {
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b40a9962-13f4-43a2-b9df-e5c528eaceec/W+NIKE+VOMERO+18.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/92428991-be08-45f1-9da8-3cf082c0a00e/W+NIKE+VOMERO+18.png'
    ],
    colors: ['white-#f5f5f7', 'black-#191a17'],
    name: 'Nike Vomero 18',
    stock: 0,
    price: 4259000
  },
  {
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/5e2e871e-2b9d-4bc2-9f46-0fe7be5099e4/AIR+JORDAN+4+RM.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d92dd77c-1578-4b35-a7c8-8a2f81b176a9/AIR+JORDAN+4+RM.png'
    ],
    colors: ['white-#f5f5f7', 'black-#191a17'],
    name: 'Air Jordan 4 RM',
    stock: 12,
    price: 3287199
  },
  {
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8c45455f-ce50-475d-9c18-6e210eaeb289/NIKE+SHOX+R4.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/91a85f86-cddd-4d41-a87f-b0e3d8ecdb88/NIKE+SHOX+R4.png'
    ],
    colors: ['white-#f5f5f7', 'black-#191a17'],
    name: 'Nike Shox R4',
    stock: 0,
    price: 1300000
  },
  {
    image: [
      'https://i.pinimg.com/736x/b5/c0/63/b5c063e55ff3106e9cba713252fe79c4.jpg',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0155b1cc-7add-484e-8518-2868112149d3/W+ZOOMX+VAPORFLY+NEXT%25+4.png'
    ],
    colors: ['blue-#749cbe', 'gray-#a8acaf'],
    name: 'Nike Vaporfly 4',
    stock: 8,
    price: 1050000
  }
]

const filterOptions = [
  { Brand: ['Nike', 'Adidas', 'Bitis', 'Puma', 'New Balance', 'Converse'] },
  { Colour: ['Blue', 'Green', 'White', 'Black', 'Gray'] },
  { Stock: ['Blue', 'Green', 'White', 'Black', 'Gray'] },
  // { Collection: [
  //   { Nike: ['Air Force 1', 'Air Max'] },
  //   { Adidas: ['NMD', 'Campus'] },
  //   { Bitis: ['Hunter'] },
  //   { Puma: ['Suede', 'Classics Archive'] },
  //   { NewBalance: ['574'] },
  //   { Converse: ['Chuck Taylor All Star'] }
  // ] },
  { Price: ['Blue', 'Green', 'White', 'Black', 'Gray'] }
]

function ProductPage() {

  const [hoveredObject, setHoveredObject] = useState({ hoveredItem: null, hoveredColor: 0 })
  const [openFilterOption, setOpenFilterOption] = useState({ brand: false, colour: false, price: false, stock: false })

  // useEffect(() => {
  //   console.log('hoveredItem:', hoveredObject.hoveredItem)
  //   console.log('hoveredColor:', hoveredObject.hoveredColor)
  //   console.log(openFilterOption)
  // }, [hoveredObject])

  return (
    <Container disableGutters maxWidth={false} sx={{ bgcolor: 'white', width: '100%', height: 'fit-content' }}>
      <Header />
      <Slogan />
      <HeroSection video={productHeroSection} title={'My product.'} descTitle={'Connects you to your\nevery adventure.'} />
      {/* Product list & Filter */}
      <Box sx={{ p: '0 84px 0px 84px', heigth: 'fit-content', width: '100%' }}>
        <Box>
          <Typography sx={{ color: 'rgba(0,0,0,.85)', fontSize: '48px', fontWeight: '600', p: '24px 8px', display: 'inline-block' }} >
            All products.
            <Typography sx={{ display: 'inline-block', color: '#7e7e85', fontSize: '48px', fontWeight: '600' }} >Choose one</Typography>
          </Typography>
        </Box>
        <Box
          className="ProductList_Filter"
          sx={{ display: 'flex', gap: 3, heigth: '100%' }}>
          {/* Filter */}
          <Box
            className="Filter"
            sx={{
              position: 'sticky',
              top: 0,
              display: 'flex',
              flexDirection: 'column',
              color: 'rgba(0,0,0,.85)',
              gap: 2,
              flex: 2,
              height: '100%',
              pt: '16px',
              // px: '8px',
              '& div p': {
                fontSize: '24px',
                fontWeight: '600'
              }
            }}
          >
            <Box sx={{
              gap: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              p: '8px 8px 24px 8px',
              overflowY: 'scroll',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none' // IE/Edge
            }}>
              {filterOptions.map((filterOption, index) => {
                const key = Object.keys(filterOption)[0];
                return (
                  <Box
                    className="Filter-Option"
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.35s cubic-bezier(0.42, 0, 0.58, 1)',
                      maxHeight: openFilterOption[key.toLowerCase()] ? '450px' : '76px'
                    }}
                  >
                    <Box
                      onClick={() => setOpenFilterOption(prev => ({ ...prev, [key.toLowerCase()]: !prev[key.toLowerCase()] }))}
                      sx={{
                        p: '20px 16px',
                        fontSize: '20px',
                        bgcolor: 'white',
                        borderRadius: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        boxShadow: '1px 1px 10px rgb(220, 220, 220)',
                        transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
                        width: '100%',
                        '&:hover': {
                          boxShadow: '2px 2px 8px rgb(201, 200, 200)',
                          transform: 'scale(1.02)',
                          transformOrigin: 'center',
                          cursor: 'pointer'
                        }
                      }}
                    >
                      <Typography >{key}</Typography>
                      <Box sx={{
                        bgcolor: '#f3f3f3',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '36px'
                      }}>
                        <KeyboardArrowDownIcon sx={{
                          transition: 'transform 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
                          transform: openFilterOption[key.toLowerCase()] ? 'scaleY(-1)' : 'scaleY(1)',
                          transformOrigin: 'center'
                        }}/>
                      </Box>
                    </Box>
                    <Box sx={{
                      mt: '8px',
                      height: openFilterOption[key.toLowerCase()] ? '100%' : '0px',
                      // maxHeight: '400px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.32s cubic-bezier(0.42, 0, 0.58, 1)',
                      alignItems: 'center',
                      overflowY: 'scroll',
                      '&::-webkit-scrollbar': {
                        display: 'none'
                      },
                      scrollbarWidth: 'none', // Firefox
                      msOverflowStyle: 'none' // IE/Edge
                    }}>
                      <FormGroup sx={{ width: '90%', pb: '8px' }}>
                        {filterOption[key].map((item) => (
                          <Box key={item} sx={{
                            p: '2px 6px 2px 16px',
                            bgcolor: '#ffffff',
                            mt: '12px',
                            borderRadius: '12px',
                            boxShadow: '0.5px 0.5px 10px rgb(220, 220, 220)',
                            '&:hover': {
                              boxShadow: '1px 1px 10px rgb(201, 200, 200)',
                              transform: 'scale(1.01)',
                              transformOrigin: 'center',
                              cursor: 'pointer'
                            }
                          }}>
                            <FormControlLabel
                              label={item}
                              control={
                                <Checkbox
                                  disableRipple
                                  icon={<Box sx={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '16px',
                                    border: '0.5px solid #e6e6e6'
                                  }} />}
                                  checkedIcon={<Box sx={{
                                    width: '20px',
                                    height: '20px',
                                    bgcolor: '#59c561',
                                    borderRadius: '16px',
                                    border: '0.5px solid white',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}>
                                    <DoneIcon sx={{ fontSize: '14px' }} />
                                  </Box>
                                  }
                                  sx={{
                                    padding: '8px 6px',
                                    '&:hover': {
                                      backgroundColor: 'transparent'
                                    },
                                    '&.Mui-checked:hover': {
                                      backgroundColor: 'transparent'
                                    },
                                    '&:active': {
                                      boxShadow: 'none'
                                    },
                                    '&.Mui-focusVisible': {
                                      boxShadow: 'none'
                                    },
                                    '&:focus': {
                                      outline: 'none',
                                      boxShadow: 'none'
                                    }
                                  }}
                                />
                              }
                              labelPlacement="start"
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                m: '0px'
                              }}
                            />
                          </Box>
                        ))}
                      </FormGroup>
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Box>

          {/* Products list */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            color: 'black',
            flex: 8,
            gap: 3,
            height: '100%',
            py: '24px'
          }}>
            {products.map((product, index) => (
              <Box
                key={index}
                onMouseEnter={() => setHoveredObject(prev => ({ ...prev, hoveredItem: index }))}
                onMouseLeave={() => setHoveredObject({ hoveredItem: null, hoveredColor: 0 })}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'white',
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  boxShadow: '1px 1px 10px rgb(220, 220, 220)',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
                  '&:hover': {
                    boxShadow: '2px 2px 8px rgb(201, 200, 200)',
                    transform: 'scale(1.02)',
                    transformOrigin: 'center',
                    cursor: 'pointer'
                  }
                }}
              >
                <Box sx={{ height: '315px' }}>

                  {/* Ảnh khi chưa click color */}
                  <img src={product.image[0]}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: hoveredObject.hoveredItem === index ? 'none' : 'block' }} />

                  {/* Ảnh khi click color */}
                  {hoveredObject.hoveredItem === index && (
                    <img
                      src={product.image[hoveredObject.hoveredColor]}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  )}

                </Box>
                <Box sx={{ p: '16px 0' }}>
                  {/* Màu sắc... */}
                  <Box sx={{ display: 'flex', gap: 1.3, justifyContent: 'center' }}>
                    {product.colors.map((color, idx) => (
                      <Box
                        key={idx}
                        onMouseEnter={() => setHoveredObject(prev => ({ ...prev, hoveredColor: idx }))}
                        sx={{
                          bgcolor: color.split('-')[1],
                          width: '13px', height: '13px',
                          borderRadius: '16px',
                          border: '1px solid rgba(129, 125, 119, .6)'
                        }}
                      ></Box>
                    ))}
                  </Box>
                  <Box sx={{ p: '12px 0 0 16px' }}>
                    {/* Stock */}
                    <Typography sx={{ color: '#d33918', fontSize: '16px', fontWeight: '600' }}>{product.stock > 0 ? 'Just in' : 'Sold Out'}</Typography>
                    {/* Tên sản phẩm */}
                    <Typography sx={{ fontWeight: '600', fontSize: '20px', py: '4px' }} >{product.name}</Typography>
                    {/* Price */}
                    <Typography>{Number(product.price).toLocaleString('vi-VN')}đ</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default ProductPage