import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import closeIcon from '~/assets/x-white.png'
import '~/App.css'
import { fetchGetOrder, fetchProductDetailsAPI } from '~/apis'
import theme from '~/theme'


export default function OrderDetail({ orderId, open, onClose }) {

  const [order, setOrder] = useState({})
  const [products, setProducts] = useState({})
  const [isLoadingOrder, setIsLoadingOrder] = useState(false)

  const statusColors = {
    pending: '#ffa706',
    delivering: '#0066ff',
    completed: '#4cd137',
    canceled: '#ff4f4f'
  }

  const getTotal = () => {
    let sum = 0
    order?.items?.forEach(product => {
      sum += Number(product.quantity) * Number(product.price)
    })
    return sum
  }


  const fetchOrder = async () => {
    setIsLoadingOrder(true)
    const orders = await fetchGetOrder(orderId)
    // console.log(orders)
    setOrder(orders)
    const products = await Promise.all(
      orders.items.map(order => fetchProductDetailsAPI(order.productId)) // truyền đúng ID
    )
    if (products) {
      setIsLoadingOrder(false)
      setProducts(products)
    }
    // console.log(products)
  }

  useEffect(() => {
    fetchOrder()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Modal
      className="Modal"
      open={open}
      sx={{
        overflowY: 'scroll',
        transition: 'opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          minHeight: '100vh',
          height: 'fit-content',
          outline: 'none',
          display: 'flex',
          justifyContent: 'center',
          backdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          alignItems: 'center'
        }}
      >
        <Box
          className="fade-in-up"
          onClick={(e) => e.stopPropagation()} // Ngăn click ra ngoài phần nội dung
          sx={{
            width: '85%',
            // minHeight: '100vh',
            height: isLoadingOrder ? '100vh' : 'fit-content',
            bgcolor: 'white',
            outline: 'none',
            borderRadius: '28px',
            my: '32px',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: '100px',
            py: '24px',
            pb: '64px',
            boxShadow: '4px 4px 15px rgb(138, 138, 138)',
            transition: 'height 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)'
          }}
        >
          {isLoadingOrder ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box className='spinner-large'></Box>
            </Box>
          ) : (
            <Box sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column'
            }}>
              {/* Close Button */}
              <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
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
                  onClick={onClose}
                >
                  <img src={closeIcon} style={{ width: '20px', height: '20px' }} />
                </Box>
              </Box>
              <Typography sx={{ color: 'rgba(0,0,0,.85)', fontWeight: '600', fontSize: '32px' }}>
                {`Order #${orderId.slice(0, orderId.length / 2)}`}
              </Typography>
              {/* Customer info */}
              <Box sx={{ display: 'flex', flexDirection: 'column', mt: '16px', mb: '32px', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', px: '8px' }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: '600', minWidth: '70px' }}>Name:</Typography>
                  <Typography sx={{ fontSize: '16px' }}>{order.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', px: '8px' }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: '600', minWidth: '70px' }}>Phone:</Typography>
                  <Typography sx={{ fontSize: '16px' }}>{order.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', px: '8px' }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Address:</Typography>

                  <Typography sx={{ fontSize: '16px' }}>{order.address}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', px: '8px' }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: '600', minWidth: '70px' }}>
                    {'Status: '}
                  </Typography>
                  <Typography style={{ fontSize: '16px', borderBottom: '1px solid black', paddingBottom: '0.5px', color: statusColors[order.status] }} >
                    {order.status}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', px: '8px' }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Payment:</Typography>

                  <Typography sx={{ fontSize: '16px' }}>{order?.payment}</Typography>
                </Box>

              </Box>

              <hr style={{
                width: '100%',
                border: 'none',
                borderTop: '1px solid #ccc',
                margin: '4px auto'
              }} />

              {/* Product Order */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', mt: '24px' }}>
                {order.items?.map((product, idx) => (
                  <Box
                    className='fade-in-up'
                    key={idx}
                    sx={{
                      display: 'flex',
                      height: 'fit-content',
                      gap: 2,
                      bgcolor: '#f6f6f6',
                      p: '20px',
                      borderRadius: '16px'
                    }}
                  >
                    {/* Img and quatity */}
                    <Box
                      sx={{
                        flex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        maxWidth: 'fit-content'
                      }}
                    >
                      <img
                        src={`${theme.API_ROOT}${product.image}`}
                        style={{ width: '110px', height: '110px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    </Box>
                    {/* Name & color & size */}
                    <Box
                      sx={{
                        flex: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.1
                      }}
                    >
                      <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>{product.name}</Typography>
                      {/* <Typography sx={{ fontSize: '16px', color: '#696969' }}>{product.type.slice(0, 1).toUpperCase() + product.type.slice(1)}</Typography> */}
                      <Typography sx={{ fontSize: '16px', color: '#696969' }}>
                        {'Color: '}
                        <span style={{
                          borderBottom: '1px solid black', paddingBottom: '0.5px',
                          color: products[idx].colors.find(item => item.color === product.color).colorHex
                        }} >
                          {product.color}
                        </span>
                      </Typography>
                      <Typography sx={{ fontSize: '16px', color: '#696969' }}>
                        {'Size: '}
                        <span style={{ borderBottom: '1px solid black', paddingBottom: '0.5px', color: 'black' }}>
                          {product.size}
                        </span>
                      </Typography>
                      <Typography sx={{ fontSize: '16px', color: '#696969' }}>
                        {'Quantity: '}
                        <span style={{ borderBottom: '1px solid black', paddingBottom: '0.5px', color: 'black' }}>
                          {product.quantity}
                        </span>
                      </Typography>
                    </Box>
                    {/* Total and Quantity*/}
                    <Box
                      sx={{
                        flex: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'end'
                      }}
                    >
                      <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
                        {(Number(product.price * product.quantity)).toLocaleString('vi-VN')}đ
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: '20px',
                width: '100%',
                '& p': {
                  color: 'rgba(0,0,0,.5)',
                  fontSize: '20px',
                  fontWeight: '600'
                }
              }}>
                <Typography>Delivery</Typography>
                <Typography>Free</Typography>
              </Box>

              {/* Subtotal */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                mt: '12px',
                '& p': {
                  fontSize: '24px',
                  fontWeight: '600'
                }
              }}>
                <Typography>Total</Typography>
                <Typography>{getTotal().toLocaleString('vi-VN')}đ</Typography>
              </Box>

            </Box>
          )}
        </Box>
      </Box >
    </Modal >
  )
}
