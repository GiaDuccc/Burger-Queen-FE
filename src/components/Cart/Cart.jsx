/* eslint-disable no-console */
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { addOrderToCustomer, fetchCreateOrder, fetchGetOrder, increaseQuantityAPI, decreaseQuantityAPI, removeProductFromOrderAPI, fetchProductDetailsAPI } from '~/apis'
import { useEffect, useState } from 'react'
import removeIcon from '~/assets/minus.png'
import addIcon from '~/assets/plus.png'
import trashIcon from '~/assets/trash.png'
import outOfStock from '~/assets/outOfStock.png'
import deliveryIcon from '~/assets/delivery.png'
import { useNavigate } from 'react-router-dom'
import closeIcon from '~/assets/x-white.png'


function ShoppingCart({ open, toggleDrawer }) {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const [orderData, setOrderData] = useState(null)
  const [products, setProducts] = useState([])
  const [quantitySelect, setQuantitySelect] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const getMaxQuantityByIdx = (idx) => {
    return products[idx].colors.find(c => c?.color === orderData.items[idx]?.color)
      ?.sizes.find(s => s.size.toString() === orderData.items[idx].size).quantity
  }

  const getTotal = () => {
    let sum = 0
    quantitySelect.forEach((quantity, idx) => {
      sum += Number(quantity) * Number(products[idx].price)
    })
    return sum
  }

  const handleUpQuantity = async (idx) => {
    // console.log('idx', idx)
    // console.log('product[idx]', products[idx])
    const availableQuantity = getMaxQuantityByIdx(idx)

    // console.log(orderData.items[idx].quantity + 1)
    // console.log(availableQuantity)
    if (orderData.items[idx].quantity + 1 > availableQuantity) {
      return
    }
    else {
      const newQuantitySelect = [...quantitySelect]
      newQuantitySelect[idx] = newQuantitySelect[idx] + 1
      setQuantitySelect(newQuantitySelect)

      await increaseQuantityAPI(orderData._id, orderData.items[idx])
        .then(data => {
          setOrderData(data)
          console.log('tăng quantity thành công', data)
        })
        .catch(error => console.log('tăng quantity lỗi', error))
    }
  }

  const handleDownQuantity = async (idx) => {
    const deletedItem = orderData.items[idx]; // Lưu trước cái item cần xóa

    if (orderData.items[idx].quantity - 1 < 1) {
      const updatedItems = [...orderData.items]
      updatedItems.splice(idx, 1) // Xóa sản phẩm tại vị trí idx

      // Cập nhật lại orderData với danh sách sản phẩm đã thay đổi
      const updatedOrderData = { ...orderData, items: updatedItems }

      // Cập nhật lại state và API
      setOrderData(updatedOrderData)
      // console.log('orderData cũ', orderData)


      const updatedProducts = [...products]
      updatedProducts.splice(idx, 1)
      setProducts(updatedProducts)
      // console.log('products cũ', products)


      // Cập nhật lại trạng thái số lượng chọn cho các sản phẩm còn lại
      const newQuantitySelect = [...quantitySelect]
      newQuantitySelect.splice(idx, 1) // Xóa chỉ số quantity cho sản phẩm đã xóa
      setQuantitySelect(newQuantitySelect)
      // console.log('quantitySelect cũ', quantitySelect)

      await removeProductFromOrderAPI(orderData._id, deletedItem)
        .then(data => console.log('Đơn hàng đã được cập nhật sau khi xóa sản phẩm', data))
        .catch(error => console.log('Lỗi khi cập nhật đơn hàng', error))

    } else {
      const newQuantitySelect = [...quantitySelect]
      newQuantitySelect[idx] = newQuantitySelect[idx] - 1
      setQuantitySelect(newQuantitySelect)

      await decreaseQuantityAPI(orderData._id, orderData.items[idx])
        .then(data => {
          setOrderData(data)
          console.log('giảm quantity thành công')
        })
        .catch(() => console.log('giảm quantity lỗi'))
    }
  }

  const handleSubmit = () => {
    navigate('/checkout')
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      if (!user.orders || user.orders.length === 0) {
        const order = await fetchCreateOrder()
        const data = { orderId: order._id, status: order.status }
        const updatedCustomer = await addOrderToCustomer(user._id, data)
        localStorage.setItem('user', JSON.stringify(updatedCustomer))

        setUser(updatedCustomer)
        setOrderData(order)
      } else {
        if (user.orders[user.orders.length - 1]?.status !== 'cart') {
          const order = await fetchCreateOrder()
          const data = { orderId: order._id, status: order.status }
          const updatedCustomer = await addOrderToCustomer(user._id, data)
          localStorage.setItem('user', JSON.stringify(updatedCustomer))

          setUser(updatedCustomer)
          setOrderData(order)
          return
        }
        const lastOrder = await fetchGetOrder(user.orders[user.orders.length - 1].orderId)
        setOrderData(lastOrder)

        const productList = await Promise.all(
          lastOrder.items.map(item => fetchProductDetailsAPI(item.productId))
        )
        setProducts(productList)
        setQuantitySelect(lastOrder.items.map(item => item.quantity))
      }
    }

    if (open) { // chỉ fetchData khi mở cart
      setIsLoading(true)
      fetchData()
      setTimeout(() => {
        setIsLoading(false)
      }, 800)
    }
  }, [open, user])

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      if (!user.orders || user.orders.length === 0) {
        const order = await fetchCreateOrder()
        const data = { orderId: order._id, status: order.status }
        const updatedCustomer = await addOrderToCustomer(user._id, data)
        localStorage.setItem('user', JSON.stringify(updatedCustomer))

        setUser(updatedCustomer)
        setOrderData(order)
      } else {
        if (user.orders[user.orders.length - 1]?.status !== 'cart') {
          const order = await fetchCreateOrder()
          const data = { orderId: order._id, status: order.status }
          const updatedCustomer = await addOrderToCustomer(user._id, data)
          localStorage.setItem('user', JSON.stringify(updatedCustomer))

          setUser(updatedCustomer)
          setOrderData(order)
          return
        }
        const lastOrder = await fetchGetOrder(user.orders[user.orders.length - 1].orderId)
        setOrderData(lastOrder)

        const productList = await Promise.all(
          lastOrder.items.map(item => fetchProductDetailsAPI(item.productId))
        )
        setProducts(productList)
        setQuantitySelect(lastOrder.items.map(item => item.quantity))
      }
    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer}
      ModalProps={{
        BackdropProps: {
          sx: {
            backdropFilter: 'blur(8px)', // hoặc 3px tùy bạn
            backgroundColor: 'rgba(0, 0, 0, 0.2)' // vừa blur vừa mờ
          }
        }
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: '40vw',
          bgcolor: 'white',
          overflow: 'hidden',
          borderRadius: '32px 0 0 32px',
          height: '95%',
          mt: '20px',
          boxShadow: '4px 4px 15px rgb(80, 80, 80)'
        }
      }}
    >
      <Box
        sx={{
          bgcolor: 'white',
          width: '90%',
          py: '24px',
          mx: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            right: '-5px',
            bgcolor: '#333336',
            width: '36px',
            height: '36px',
            borderRadius: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            '&:hover svg': {
              color: 'white',
              transition: 'color 0.3s cubic-bezier(0.42, 0, 0.58, 1)'
            }
          }}
          onClick={toggleDrawer}
        >
          <img src={closeIcon} style={{ width: '20px', height: '20px' }} />
        </Box>
        <Typography sx={{ fontSize: '36px', fontWeight: '600', lineHeight: '36px', flex: 1 }}>Your Cart</Typography>
        <Box sx={{
          flex: 9,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography sx={{ fontSize: '28px', fontWeight: '600' }}>Sign In for Shopping.</Typography>
          <Box sx={{
            bgcolor: 'rgba(0,0,0,.85)',
            width: '55%',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '32px',
            transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
            '& a': {
              color: 'white',
              fontSize: '16px',
              textDecoration: 'none',
              lineHeight: '50px',
              width: '100%',
              textAlign: 'center'
            },
            '&:hover': {
              boxShadow: '1px 1px 10px rgb(201, 200, 200)',
              transform: 'scale(1.02)',
              transformOrigin: 'center',
              cursor: 'pointer'
            }
          }}>
            <Link href="/sign-in">Sign In</Link>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer}
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
          width: '45vw',
          bgcolor: 'white',
          overflow: 'hidden',
          borderRadius: '32px 0 0 32px',
          height: '95%',
          mt: '20px',
          boxShadow: '4px 4px 15px rgb(80, 80, 80)'
        }
      }}
    >
      <Box
        className='fade-in'
        sx={{
          bgcolor: 'white',
          width: '90%',
          py: '24px',
          mx: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            right: '60px',
            bgcolor: '#333336',
            width: '36px',
            height: '36px',
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
          onClick={toggleDrawer}
        >
          <img src={closeIcon} style={{ width: '20px', height: '20px' }} />
        </Box>
        <Typography sx={{ fontSize: '36px', fontWeight: '600', lineHeight: '36px', flex: 0.8 }}>Your Cart</Typography>
        {/* Sản phẩm trong giỏ hàng */}
        {isLoading ? (
          <Box sx={{ flex: 7, display: 'flex', alignItems: 'center' }}>
            <Box className='spinner-large'></Box>
          </Box>
        ) : (
          <Box sx={{
            flex: 7,
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflowY: 'scroll',
            scrollbarWidth: 'none', // Firefox
            '&::-webkit-scrollbar': { display: 'none' },
            height: '100%'
          }}>
            {products.length > 0 ? products?.map((product, idx) => (
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
                    src={product.colors.find(item => item.color === orderData.items[idx].color)?.imageDetail[0]}
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
                  <Typography sx={{ fontSize: '16px', color: '#696969' }}>{product.type.slice(0, 1).toUpperCase() + product.type.slice(1)}</Typography>
                  <Typography sx={{ fontSize: '16px', color: '#696969' }}>
                    {'Color: '}
                    <span style={{ borderBottom: '1px solid black', paddingBottom: '0.5px', color: 'black' }} >
                      {orderData.items[idx]?.color.slice(0, 1).toUpperCase() + orderData.items[idx]?.color.slice(1)}
                    </span>
                  </Typography>
                  <Typography sx={{ fontSize: '16px', color: '#696969' }}>
                    {'Size: '}
                    <span style={{ borderBottom: '1px solid black', paddingBottom: '0.5px', color: 'black' }}>
                      {orderData.items[idx]?.size}
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
                    {(Number(quantitySelect[idx]) * Number(products[idx].price)).toLocaleString('vi-VN')}đ
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      width: '110px',
                      height: '36px',
                      border: 'solid 1px #e1e1e1',
                      borderRadius: '30px',
                      justifyContent: 'space-between',
                      '& div': {
                        width: '35px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        height: '35px',
                        transition: 'all 0.2s cubic-bezier(0.42, 0, 0.58, 1)'

                      }
                    }}
                  >
                    <Box
                      onClick={() => handleDownQuantity(idx)}
                      sx={{
                        '&:hover': {
                          cursor: 'pointer',
                          bgcolor: '#ebebeb'
                        }
                      }}>
                      {orderData.items[idx]?.quantity - 1 < 1 ? (
                        <img src={trashIcon} style={{ width: '16px', height: '16px' }} />
                      ) : (
                        <img src={removeIcon} style={{ width: '16px', height: '16px' }} />
                      )}
                    </Box>
                    <Box>
                      <Typography>{quantitySelect[idx]}</Typography>
                      {/* <Typography>{orderData.items[idx].quantity}</Typography> */}
                    </Box>
                    <Box
                      onClick={() => !(orderData.items[idx].quantity + 1 > getMaxQuantityByIdx(idx)) && handleUpQuantity(idx)}
                      sx={{
                        '&:hover': {
                          cursor: (orderData.items[idx]?.quantity + 1 > getMaxQuantityByIdx(idx)) ? 'not-allowed' : 'pointer',
                          bgcolor: (orderData.items[idx]?.quantity + 1 > getMaxQuantityByIdx(idx)) ? 'white' : '#ebebeb'
                        }
                      }}>
                      {orderData.items[idx]?.quantity + 1 > getMaxQuantityByIdx(idx) ? (
                        <img src={outOfStock} style={{ width: '16px', height: '16px' }} />
                      ) : (
                        <img src={addIcon} style={{ width: '16px', height: '16px' }} />
                      )}
                      {/* <AddIcon sx={{ fontSize: '16px' }} /> */}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )) : (
              <Box className='fade-in-up' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography sx={{ fontSize: '32px', fontWeight: '600' }}>Add Product đi fen</Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Tổng tiền */}
        <Box sx={{
          flex: 1,
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          p: '8px'
        }} >
          <Box sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            '& p': {
              fontSize: '18px',
              fontWeight: '600',
              color: 'rgba(0,0,0,.5)'
            }
          }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              Delivery fee
              <img src={deliveryIcon} style={{ width: '24px', height: '24px', opacity: .7 }} />
            </Typography>
            <Typography>Free</Typography>
          </Box>
          <hr style={{
            width: '100%',
            height: '1px',
            borderTop: '1px solid #e1e1e1',
            margin: '8px 0'
          }} />
          <Box sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            '& p': {
              fontSize: '24px',
              fontWeight: '600'
            }
          }}>
            <Typography>Total</Typography>
            <Typography>{getTotal().toLocaleString('vi-VN')}đ</Typography>
          </Box>
        </Box>

        {/* Button thanh toán */}
        <Box
          onClick={() => products.length && handleSubmit()}
          sx={{
            flex: 0.6,
            bgcolor: 'rgba(0,0,0,.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
            opacity: products.length ? 1 : .6,
            '&:hover': {
              transform: products.length && 'scale(1.02)',
              transformOrigin: 'center'
            },
            '& p': {
              color: 'white',
              fontSize: '20px',
              fontWeight: '600'
            }
          }}>
          <Typography>Checkout</Typography>
        </Box>
      </Box>
    </Drawer>
  )
}

export default ShoppingCart
