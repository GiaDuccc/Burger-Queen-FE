import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import '~/App.css'

export default function ProductCardDetail({ product, open, onClose }) {

  const [opacity, setOpacity] = useState(1); // Đặt opacity ban đầu là 1 (hiển thị)

  // eslint-disable-next-line no-unused-vars
  const [productList, setProductList] = useState(
    product.colors.map((color, index) => {
      return {
        id: index,
        color: color.color.toLowerCase(),
        colorHex: color.colorHex,
        image: color.image,
        imageDetail: color.imageDetail,
        name: product.name,
        type: product.type,
        size: color.size.map(size => `${size.size} : ${size.quantity}`),
        stock: color.size.reduce((sum, item) => sum + Number(item.quantity), 0),
        price: product.price,
        highLight: product.highLight,
        desc: product.desc
      }
    })
  )
  const [activeProduct, setActiveProduct] = useState(productList[0])

  const [activeSize, setActiveSize] = useState(null)

  const [currentImage, setCurrentImage] = useState({ image: activeProduct.image, id: 0 })

  const handleClose = () => {
    setOpacity(0); // Khi nhấn nút, opacity sẽ thay đổi thành 0 (ẩn)
    setTimeout(() => {
      onClose()
    }, 400)
  }

  useEffect(() => {
    setActiveSize(null)
  }, [activeProduct])

  // useEffect(() => {
  //   console.log('activeProduct', activeProduct)
  //   console.log('currentImage', currentImage)
  // })

  return (
    <Modal
      className="Modal "
      open={open}
      sx={{
        overflowY: 'scroll',
        opacity: opacity,
        transition: 'opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
      }}
      onClick={handleClose}
    >
      <Box
        sx={{
          height: 'fit-content',
          outline: 'none',
          display: 'flex',
          justifyContent: 'center',
          backdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
      >
        <Box
          className="fade-in-up"
          onClick={(e) => e.stopPropagation()} // Ngăn click ra ngoài phần nội dung
          sx={{
            width: '85%',
            minHeight: '100vh',
            height: 'fit-content',
            bgcolor: 'white',
            outline: 'none',
            borderRadius: '28px',
            my: '32px',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
            px: '100px',
            py: '24px'
          }}
        >
          {/* Close Button */}
          <Box
            sx={{
              bgcolor: '#333336',
              width: '40px',
              height: '40px',
              borderRadius: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              mr: '-70px',
              '&:hover svg': {
                color: 'white',
                transition: 'color 0.3s cubic-bezier(0.42, 0, 0.58, 1)'
              }
            }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ color: '#d6d6d7' }} />
          </Box>
          {/* Content */}
          <Box sx={{
            display: 'flex',
            '& > div': { pt: '32px' }
          }}>

            {/* Left */}
            <Box sx={{
              flex: 0.5,
              display: 'flex',
              flexDirection: 'column',
              height: 'fit-content',
              position: 'sticky',
              top: 0,
              zIndex: 100
            }}>
              {activeProduct.imageDetail.map((image, index) => (
                <Box
                  onClick={() => setCurrentImage({ image: image, id: index })}
                  key={index}
                  sx={{
                    height: '70px',
                    width: '70px',
                    mb: '12px',
                    borderRadius: '6px',
                    border: 'solid 0.5px rgba(255, 255, 255, 0)',
                    transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
                    '&:hover': {
                      boxShadow: '1px 1px 10px rgb(201, 200, 200)',
                      transform: 'scale(1.02)',
                      transformOrigin: 'center',
                      cursor: 'pointer',
                      border: 'solid 1px #b6b6b6'
                    }
                  }}
                >
                  <img
                    src={image}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '6px',
                      boxShadow: '0.2px 0.2px 10px rgb(220, 220, 220)',
                      objectFit: 'cover'

                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* Mid */}
            <Box sx={{
              flex: 5,
              px: 3,
              height: 'fit-content',
              position: 'sticky',
              top: 0,
              zIndex: 100
            }}>
              <Box
                sx={{
                  width: '100%',
                  position: 'relative'
                }}
              >
                <img
                  src={currentImage.image}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)'
                  }}
                />
                {/* Button */}
                <Box sx={{
                  position: 'absolute',
                  display: 'flex',
                  gap: 2, p: '16px 32px',
                  justifyContent: 'right',
                  right: '-2%',
                  bottom: '2%'
                }}>
                  <Box
                    onClick={() => {
                      const prevId = currentImage.id === 0
                        ? activeProduct.imageDetail.length - 1
                        : currentImage.id - 1;
                      setCurrentImage({
                        image: activeProduct.imageDetail[prevId],
                        id: prevId
                      })
                    }}
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
                      boxShadow: '0.5px 0.5px 10px rgb(189, 189, 189)',
                      transition: 'all 0.2s cubic-bezier(0.42, 0, 0.58, 1)',
                      '&:hover': {
                        bgcolor: 'rgb(228, 227, 227)'
                        // transform: 'scale(1.03)',
                      }
                    }}
                  >
                    <ChevronLeftIcon />
                  </Box>
                  <Box
                    onClick={() => {
                      const nextId = currentImage.id === activeProduct.imageDetail.length - 1
                        ? 0
                        : currentImage.id + 1;
                      setCurrentImage({
                        image: activeProduct.imageDetail[nextId],
                        id: nextId
                      })
                    }}
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
                      boxShadow: '0.5px 0.5px 10px rgb(189, 189, 189)',
                      transition: 'all 0.2s cubic-bezier(0.42, 0, 0.58, 1)',
                      '&:hover': {
                        bgcolor: 'rgb(228, 227, 227)'
                      }
                    }}
                  >
                    <ChevronRightIcon />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Right */}
            <Box sx={{
              flex: 4,
              height: '100%'
            }}>
              {/* Title */}
              <Box>
                <Typography sx={{ color: '#d33918', fontSize: '18px', fontWeight: '600' }}>{activeProduct.stock > 0 ? 'Just in' : 'Sold Out'}</Typography>
                <Typography sx={{ fontWeight: '600', fontSize: '22px', pt: '4px' }} >{activeProduct.name}</Typography>
                <Typography sx={{ fontSize: '16px', color: '#7e7e85', pb: '4px' }} >{activeProduct.type.slice(0, 1).toUpperCase() + product.type.slice(1)}</Typography>
                <Typography sx={{ fontSize: '18px', fontWeight: '600', color: '#000000c2', pt: '8px' }}>{Number(activeProduct.price).toLocaleString('vi-VN')}đ</Typography>
              </Box>
              {/* Image List */}
              <Box
                sx={{ display: 'flex', gap: 1, pt: '32px' }}
              >
                {productList.map(product => (
                  <Box
                    onClick={() => {
                      setActiveProduct(product)
                      setCurrentImage({ image: product.image, id: 0 })
                    }}
                    key={product.id}
                    sx={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '4px',
                      transition: 'all 0.2s cubic-bezier(0.42, 0, 0.58, 1)',
                      opacity: product.stock > 0 ? '1' : '0.7',
                      border: activeProduct.id === product.id ? 'solid 1px #000' : 'solid 1px rgba(255,255,255, 0)',
                      transform: activeProduct.id === product.id ? 'scale(1.02)' : 'none',
                      // border: 'solid 0.5px rgba(255,255,255, 0)',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        transformOrigin: 'center',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <img
                      src={product.image}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        borderRadius: '4px',
                        boxShadow: '0.2px 0.2px 10px rgb(220, 220, 220)'
                      }}
                    />
                  </Box>
                ))}
              </Box>
              {/* Size */}
              <Box sx={{ pt: '32px' }} >
                <Typography sx={{ color: 'rgba(0,0,0, .85)', fontSize: '16px', fontWeight: '600', pb: 1 }}>Select Size</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {activeProduct.size.map((size, idx) => (
                    <Typography
                      onClick={(e) => {
                        if (size.split(':')[1] > 0) {
                          setActiveSize(() => activeSize !== size ? size : null)
                        }
                        else { e.preventDefault() }
                      }}
                      key={idx}
                      sx={{
                        border: activeSize === size ? 'solid 0.5px rgb(0, 0, 0)' : 'solid 0.5px rgba(255, 255, 255, 0)',
                        p: '8px 24px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        bgcolor: 'white',
                        boxShadow: '0.5px 0.5px 10px rgb(220, 220, 220)',
                        transition: 'all 0.2s cubic-bezier(0.42, 0, 0.58, 1)',
                        color: 'rgba(0,0,0, .85)',
                        opacity: size.split(':')[1] > 0 ? 'none' : '0.4',
                        '&:hover': {
                          boxShadow: size.split(':')[1] > 0 ? '1px 1px 10px rgb(201, 200, 200)' : '0.5px 0.5px 10px rgb(220, 220, 220)',
                          transform: 'scale(1.02)',
                          transformOrigin: 'center',
                          cursor: 'pointer'
                          // border: size.split(':')[1] > 0 ? 'solid 0.5px #b6b6b6' : 'solid 0.5px rgba(255, 255, 255, 0)'
                        }
                      }}
                    >
                      {size.split(':')[0]}
                    </Typography>
                  ))}
                </Box>
              </Box>
              {/* Add to Cart */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  mt: '32px',
                  transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
                  '& div': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: '16px',
                    transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
                    borderRadius: '32px',
                    boxShadow: '0.5px 0.5px 10px rgb(220, 220, 220)'
                  },
                  '& div:hover': {
                    cursor: 'pointer',
                    boxShadow: '1px 1px 10px rgb(201, 200, 200)',
                    transform: 'scale(1.02)',
                    transformOrigin: 'center'
                  },
                  '& p': {
                    fontSize: '16px',
                    fontWeight: '600'
                  }
                }}
              >
                <Box sx={{ bgcolor: 'black', color: 'white' }}>
                  <Typography>Add to Cart</Typography>
                </Box>
                <Box sx={{ color: 'rgba(0,0,0,.85)', display: 'flex', gap: 1 }}>
                  <Typography>Add Favourite</Typography>
                  <FavoriteBorderIcon />
                </Box>
              </Box>
              {/* HighLight and Desc */}
              <Box>
                {/* HighLight */}
                {activeProduct.highLight && (
                  <Box sx={{
                    display: 'flex',
                    textAlign: 'center',
                    mt: '48px'
                  }}>
                    <Typography sx={{
                      py: '24px',
                      px: '32px',
                      bgcolor: '#f5f5f5',
                      fontSize: '16px'
                    }}>
                      {activeProduct.highLight}
                    </Typography>
                  </Box>
                )}
                {/* Desc */}
                {activeProduct.desc && (
                  <Box sx={{ mt: '48px' }}>
                    <Typography sx={{
                      fontWeight: '600',
                      fontSize: '20px',
                      mb: '4px'
                    }}>
                      Description:
                    </Typography>
                    <Typography
                      sx={{ fontSize: '16px' }}
                    >
                      {activeProduct.desc}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
