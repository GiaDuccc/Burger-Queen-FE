/* eslint-disable react-hooks/exhaustive-deps */
import Header from '~/components/Header/Header'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import settingsIcon from '~/assets/settings.png'
import logOutIcon from '~/assets/logout.png'
import { useEffect, useState } from 'react'
import { fetchGetOrder } from '~/apis'

function Dashboard() {

  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])

  function getCountryName(code) {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    return regionNames.of(code.toUpperCase()) || code
  }

  const logOut = () => {
    localStorage.removeItem('user')
    navigate('/sign-in')
  }

  useEffect(() => {
    const fetchOrders = async () => {
      let newOrders = []
      for (const order of user.orders) {
        if (order.status !== 'cart') {
          const data = await fetchGetOrder(order.orderId)
          newOrders.push(data)
        }
      }
      setOrders(newOrders.reverse())
    }
    fetchOrders()
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{
      bgcolor: 'white',
      width: '100%',
      // height: 'fit-content',
      height: '2000px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      {/* Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', mx: 'auto', mt: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ color: 'rgba(0,0,0,.85)', fontWeight: '600', fontSize: '32px' }}>
            {`Customer - ${user.lastName} ${user.firstName}`}
          </Typography>
          <Box sx={{
            display: 'flex',
            gap: 4,
            '& p': {
              color: 'rgb(105, 105, 105)',
              textDecoration: 'none',
              fontSize: '16px'
            },
            '& p:hover': {
              color: 'rgb(105, 105, 105)',
              textDecoration: 'underline',
              cursor: 'pointer'
            }
          }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Typography>Settings</Typography>
              {/* <SettingsIcon sx={{ fontSize: '16px' }} /> */}
              <img src={settingsIcon} style={{ width: '16px', height: '16px' }} />
            </Box>
            <Box
              onClick={() => logOut()}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Typography>Log Out</Typography>
              <img src={logOutIcon} style={{ width: '16px', height: '16px' }} />
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
            <Typography sx={{ fontSize: '16px' }}>{user.lastName + ' ' + user.firstName}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Date of Birth:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{new Date(user.dob).toLocaleDateString('vi-VN')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Email:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{user.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Phone:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{user.phone}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Country:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{`${getCountryName(user.country)}`}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Join date:</Typography>
            <Typography sx={{ fontSize: '16px' }}>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Active:</Typography>
            <Box sx={{
              width: '14px',
              height: '14px',
              bgcolor: user.isActive ? '#3dff4c' : '#ff3232',
              border: '1px solid rgb(141, 141, 141)',
              borderRadius: '16px'
            }}></Box>
          </Box>
          {/* Order history */}
          {orders.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Orders History: </Typography>
              {orders?.map((order, idx) => (
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
                      <span style={{ borderBottom: '1px solid black', paddingBottom: '0.5px', color: order.status === 'completed' && '#4cd137' }} >
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
    </Container>
  )
}

export default Dashboard