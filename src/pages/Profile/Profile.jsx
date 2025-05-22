/* eslint-disable react-hooks/exhaustive-deps */
import Header from '~/components/Header/Header'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import settingsIcon from '~/assets/settings.png'
import editIcon from '~/assets/edit.png'
import logOutIcon from '~/assets/logout.png'
import { useEffect, useState } from 'react'
import { fetchCustomerDetailAPI, fetchGetOrder } from '~/apis'
import OrderDetail from '~/components/OrderDetail/OrderDetail'
import '~/App.css'

function Dashboard() {

  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()


  const [orders, setOrders] = useState([])
  const [customer, setCustomer] = useState({})
  const [orderDetail, setOrderDetail] = useState(null)
  const [isLoadingOrder, setIsLoadingOrder] = useState(false)

  function getCountryName(code) {
    if (!code) return
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    return regionNames.of(code.toUpperCase()) || code
  }

  const statusColors = {
    pending: '#ffa706',
    delivering: '#0066ff',
    completed: '#4cd137',
    canceled: '#ff4f4f'
  }

  const logOut = () => {
    localStorage.removeItem('user')
    navigate('/sign-in')
  }

  useEffect(() => {
    if (!user) navigate('/sign-in')
    setIsLoadingOrder(true)
    const fetchOrders = async () => {
      const customer = await fetchCustomerDetailAPI(user._id)
      setCustomer(customer)
      let newOrders = []
      for (const order of customer.orders) {
        if (order.status !== 'cart') {
          const data = await fetchGetOrder(order.orderId)
          newOrders.push(data)
        }
      }
      if (newOrders) setIsLoadingOrder(false)
      setOrders(newOrders.reverse())
    }
    fetchOrders()
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{
      bgcolor: 'white',
      width: '100%',
      height: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
      pb: '64px'
    }}>
      <Header />
      {/* Content */}
      <Box
        className='fade-in-up'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '55%',
          mx: 'auto',
          mt: '20px'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ color: 'rgba(0,0,0,.85)', fontWeight: '600', fontSize: '32px' }}>
            {`Customer #${customer?.phone}`}
          </Typography>
          <Box sx={{
            display: 'flex',
            gap: 4,
            '& p': {
              color: 'rgb(105, 105, 105)',
              textDecoration: 'none',
              fontSize: '16px'
            },
            '& div:hover': {
              color: 'rgb(105, 105, 105)',
              textDecoration: 'underline',
              cursor: 'pointer'
            }
          }}>
            <Box
              onClick={() => navigate('/admin')}
              sx={{ display: (customer?.role === 'admin' || customer?.role === 'manager') ? 'flex' : 'none', alignItems: 'center', gap: 1 }}
            >
              <Typography>Admin</Typography>
              {/* <SettingsIcon sx={{ fontSize: '16px' }} /> */}
              <img src={settingsIcon} style={{ width: '16px', height: '16px', opacity: .6 }} />
            </Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Typography>Edit</Typography>
              {/* <SettingsIcon sx={{ fontSize: '16px' }} /> */}
              <img src={editIcon} style={{ width: '16px', height: '16px', opacity: .6 }} />
            </Box>
            <Box
              onClick={() => logOut()}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Typography>Log Out</Typography>
              <img src={logOutIcon} style={{ width: '16px', height: '16px', opacity: .5 }} />
            </Box>
          </Box>
        </Box>
        <hr style={{
          width: '100%',
          border: 'none',
          borderTop: '1px solid #ccc',
          margin: '4px auto'
        }} />
        {/* User Detail */}
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '32px', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Name:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{customer?.lastName + ' ' + customer?.firstName}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Date of Birth:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{new Date(customer?.dob).toLocaleDateString('vi-VN')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Email:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{customer?.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Phone:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{customer?.phone}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Address:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{customer?.address}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Country:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{`${getCountryName(customer?.country)}`}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Join date:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{new Date(customer?.createdAt).toLocaleDateString('vi-VN')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Active:</Typography>
            <Box sx={{
              width: '14px',
              height: '14px',
              bgcolor: customer?.isActive ? '#3dff4c' : '#ff3232',
              border: '1px solid rgb(141, 141, 141)',
              borderRadius: '16px'
            }}></Box>
          </Box>
          <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Orders History: </Typography>
          {isLoadingOrder && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '32px' }}>
              <Box className='spinner-large'></Box>
            </Box>
          )}
          {/* Order history */}
          {(orders.length > 0 && !isLoadingOrder) && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {orders?.map((order, idx) => (
                <Box
                  onClick={() => setOrderDetail(order._id)}
                  className='fade-in-up'
                  key={idx}
                  sx={{
                    display: 'flex',
                    height: 'fit-content',
                    gap: 2,
                    bgcolor: '#f6f6f6',
                    p: '20px',
                    borderRadius: '16px',
                    transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
                    '&:hover': {
                      cursor: 'pointer',
                      transform: 'scale(1.02)',
                      boxShadow: '3px 3px 15px #ddd'
                    }
                  }}
                >
                  {/* Img and quatity */}
                  <Box
                    sx={{
                      // flex: 2,
                      display: 'flex',
                      gap: 1,
                      width: '110px',
                      height: '110px',
                      flexWrap: 'wrap'
                    }}
                  >
                    {order.items.slice(0, 4).map((product, idx) => (
                      <img
                        key={idx}
                        src={product.image}
                        style={{
                          width: order.items.length === 1 ? '100%' : '50px',
                          height: order.items.length === 1 ? '100%' : '50px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                    ))}
                  </Box>
                  {/* Name & color & size */}
                  <Box
                    sx={{
                      flex: 5,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5
                    }}
                  >
                    <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
                      Order #{order._id.slice(0, order._id.length / 2)}
                    </Typography>
                    <Typography sx={{ fontSize: '16px', color: '#696969' }}>
                      {'Status: '}
                      <span style={{ borderBottom: '1px solid black', paddingBottom: '0.5px', color: statusColors[order.status] }} >
                        {order.status}
                      </span>
                    </Typography>
                    {/* <Typography sx={{ fontSize: '16px', color: '#696969' }}>
                      {'Phone: '}
                      <span style={{ borderBottom: '1px solid black', paddingBottom: '0.5px', color: 'black' }} >
                        {order.phone}
                      </span>
                    </Typography>*/}
                    <Typography sx={{ fontSize: '16px', color: '#696969' }}>
                      {'Address: '}
                      <span style={{ borderBottom: '1px solid black', paddingBottom: '0.5px', color: 'black' }}>
                        {order.address}
                      </span>
                    </Typography>
                  </Box>
                  {/* Total and Time*/}
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
                      {(Number(order.totalPrice)).toLocaleString('vi-VN')}đ
                    </Typography>
                    <Typography sx={{
                      fontSize: '14px',
                      fontWeight: '600',
                      fontStyle: 'italic',
                      color: 'rgba(0,0,0,.45)'
                    }}>
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {orderDetail && (
        <OrderDetail open={Boolean(orderDetail)} onClose={() => setOrderDetail(null)} orderId={orderDetail} />
      )}
    </Container>
  )
}

export default Dashboard