import Header from '~/components/Header/Header'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import settingsIcon from '~/assets/settings.png'
import editIcon from '~/assets/edit.png'
import logOutIcon from '~/assets/logout.png'
import { useEffect, useState } from 'react'
import { fetchCustomerDetailAPI, fetchGetOrder, updateCustomer } from '~/apis'
import OrderDetail from '~/components/OrderDetail/OrderDetail'
import '~/App.css'
import warningIcon from '~/assets/danger.png'
import Footer from '~/components/Footer/Footer'

function Dashboard() {

  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [customer, setCustomer] = useState({})
  const [orderDetail, setOrderDetail] = useState(null)
  const [isLoadingOrder, setIsLoadingOrder] = useState(false)
  const [editInfo, setEditInfo] = useState({})
  const [errorInfo, setErrorInfo] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  const fetchOrders = async () => {
    const customer = await fetchCustomerDetailAPI(user._id)
    setCustomer(customer)
    let newOrders = []
    for (const order of customer.orders) {
      if (order.status !== 'cart') {
        const data = await fetchGetOrder(order.orderId)
        newOrders.push(data)
      }
      else setIsLoadingOrder(false)
    }

    setOrders(newOrders.reverse().slice(0, 10))
  }

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

  const handleUpdateInfo = async () => {

    await updateCustomer(customer._id, editInfo)
      .then(() => {
        setIsEdit(false)
        fetchOrders()
      })
      .catch(data => {
        if (data.response.data.message.includes('lastName')) setErrorInfo(prev => ({ ...prev, lastName: 'Last Name is not allow empty' }))
        if (data.response.data.message.includes('firstName')) setErrorInfo(prev => ({ ...prev, firstName: 'First Name is not allow empty' }))
        if (data.response.data.message.includes('email')) setErrorInfo(prev => ({ ...prev, email: 'Email is not allow empty' }))
        if (data.response.data.message.includes('phone')) setErrorInfo(prev => ({ ...prev, phone: 'Phone is not allow empty' }))
        if (data.response.data.message.includes('address')) setErrorInfo(prev => ({ ...prev, address: 'Address is not allow empty' }))
        if (data.response.data.errors.email) setErrorInfo(prev => ({ ...prev, email: 'Email is exist' }))
        if (data.response.data.errors.phone) setErrorInfo(prev => ({ ...prev, phone: 'Phone is exist' }))
      })
  }

  useEffect(() => {
    if (!user) navigate('/sign-in')
    setIsLoadingOrder(true)
    fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{
      bgcolor: 'white',
      width: '100%',
      height: 'fit-content',
      display: 'flex',
      flexDirection: 'column'
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
          my: '20px'
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
              onClick={() => {
                setIsEdit(!isEdit)
                setErrorInfo({})
                setEditInfo({})
              }}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, userSelect: 'none' }}
            >
              <Typography>{isEdit ? 'Cancel' : 'Edit'}</Typography>
              {/* <SettingsIcon sx={{ fontSize: '16px' }} /> */}
              <Box sx={{ width: '18px', height: '18px', position: 'relative' }}>
                <img src={editIcon} style={{ width: '100%', height: '100%', opacity: .6 }} />
                {isEdit && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 9,
                      left: -2,
                      width: '22px',
                      height: '1px',
                      backgroundColor: 'red',
                      transform: 'rotate(45deg)'
                      // transformOrigin: 'top left'
                    }}
                  />
                )}
              </Box>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '32px', gap: 3, width: '100%' }}>
          {isEdit ? (
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'end' }}>
              <TextField
                onClick={(e) => e.target.value = ''}
                onChange={(e) => {
                  setEditInfo(prev => ({ ...prev, lastName: e.target.value }))
                  setErrorInfo(prev => ({ ...prev, lastName: '' }))
                }}
                onBlur={(e) => {
                  if (e.target.value === '') e.target.value = customer.lastName
                }}
                id="filledLastName"
                className={errorInfo.lastName ? 'shake' : ''}
                label={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {errorInfo.lastName && <img src={warningIcon} style={{ width: '16px', height: '16px' }} />}
                    {errorInfo.lastName ? errorInfo.lastName : 'Last Name'}
                  </span>
                }
                variant="filled"
                defaultValue={customer.lastName}
                // value={editInfo.lastName ? editInfo.lastName : customer.lastName}
                InputProps={{
                  disableUnderline: true
                }}
                sx={{
                  flex: 1,
                  backgroundColor: 'white',
                  width: '100%',
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    color: 'rgba(0, 0, 0, 0.85)',
                    border: errorInfo.lastName ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                    '&.Mui-focused': {
                      border: errorInfo.lastName ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                      borderRadius: '16px',
                      backgroundColor: 'white'
                    },
                    '& input:-webkit-autofill': {
                      borderRadius: '16px'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: errorInfo.lastName ? 'rgb(184, 53, 53)' : '#666'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: errorInfo.lastName ? 'rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                  }
                }}
              />
              <TextField
                onClick={(e) => e.target.value = ''}
                onChange={(e) => {
                  setEditInfo(prev => ({ ...prev, firstName: e.target.value }))
                  setErrorInfo(prev => ({ ...prev, firstName: '' }))
                }}
                onBlur={(e) => {
                  if (e.target.value === '') e.target.value = customer.firstName
                }}
                id="filledLastName"
                className={errorInfo.firstName ? 'shake' : ''}
                label={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {errorInfo.firstName && <img src={warningIcon} style={{ width: '16px', height: '16px' }} />}
                    {errorInfo.firstName ? errorInfo.firstName : 'First Name'}
                  </span>
                }
                variant="filled"
                defaultValue={customer.firstName}
                InputProps={{
                  disableUnderline: true
                }}
                sx={{
                  flex: 1,
                  backgroundColor: 'white',
                  width: '100%',
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    color: 'rgba(0, 0, 0, 0.85)',
                    border: errorInfo.firstName ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                    '&.Mui-focused': {
                      border: errorInfo.firstName ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                      borderRadius: '16px',
                      backgroundColor: 'white'
                    },
                    '& input:-webkit-autofill': {
                      borderRadius: '16px'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: errorInfo.firstName ? 'rgb(184, 53, 53)' : '#666'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: errorInfo.firstName ? 'rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                  }
                }}
              />
              <TextField
                onClick={(e) => e.target.value = ''}
                onChange={(e) => {
                  setEditInfo(prev => ({ ...prev, email: e.target.value }))
                  setErrorInfo(prev => ({ ...prev, email: '' }))
                }}
                onBlur={(e) => {
                  if (e.target.value === '') e.target.value = customer.email
                }}
                id="filledLastName"
                className={errorInfo.email ? 'shake' : ''}
                label={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {errorInfo.email && <img src={warningIcon} style={{ width: '16px', height: '16px' }} />}
                    {errorInfo.email ? errorInfo.email : 'Email'}
                  </span>
                }
                variant="filled"
                defaultValue={customer.email}
                InputProps={{
                  disableUnderline: true
                }}
                sx={{
                  flex: 1,
                  backgroundColor: 'white',
                  width: '100%',
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    color: 'rgba(0, 0, 0, 0.85)',
                    border: errorInfo.email ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                    '&.Mui-focused': {
                      border: errorInfo.email ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                      borderRadius: '16px',
                      backgroundColor: 'white'
                    },
                    '& input:-webkit-autofill': {
                      borderRadius: '16px'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: errorInfo.email ? 'rgb(184, 53, 53)' : '#666'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: errorInfo.email ? 'rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                  }
                }}
              />
              <TextField
                onClick={(e) => e.target.value = ''}
                onChange={(e) => {
                  setEditInfo(prev => ({ ...prev, phone: e.target.value }))
                  setErrorInfo(prev => ({ ...prev, phone: '' }))
                }}
                onBlur={(e) => {
                  if (e.target.value === '') e.target.value = customer.phone
                }}
                id="filledPhone"
                className={errorInfo.phone ? 'shake' : ''}
                label={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {errorInfo.phone && <img src={warningIcon} style={{ width: '16px', height: '16px' }} />}
                    {errorInfo.phone ? errorInfo.phone : 'Phone'}
                  </span>
                }
                variant="filled"
                defaultValue={customer.phone}
                InputProps={{
                  disableUnderline: true
                }}
                sx={{
                  flex: 1,
                  backgroundColor: 'white',
                  width: '100%',
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    color: 'rgba(0, 0, 0, 0.85)',
                    border: errorInfo.phone ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                    '&.Mui-focused': {
                      border: errorInfo.phone ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                      borderRadius: '16px',
                      backgroundColor: 'white'
                    },
                    '& input:-webkit-autofill': {
                      borderRadius: '16px'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: errorInfo.phone ? 'rgb(184, 53, 53)' : '#666'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: errorInfo.phone ? 'rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                  }
                }}
              />
              <TextField
                onClick={(e) => e.target.value = ''}
                onChange={(e) => {
                  setEditInfo(prev => ({ ...prev, address: e.target.value }))
                  setErrorInfo(prev => ({ ...prev, address: '' }))
                }}
                onBlur={(e) => {
                  if (e.target.value === '') e.target.value = customer.address
                }}
                id="filledLastName"
                className={errorInfo.address ? 'shake' : ''}
                label={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {errorInfo.address && <img src={warningIcon} style={{ width: '16px', height: '16px' }} />}
                    {errorInfo.address ? errorInfo.address : 'Address'}
                  </span>
                }
                variant="filled"
                defaultValue={customer.address}
                InputProps={{
                  disableUnderline: true
                }}
                sx={{
                  flex: 1,
                  backgroundColor: 'white',
                  width: '100%',
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    color: 'rgba(0, 0, 0, 0.85)',
                    border: errorInfo.address ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                    '&.Mui-focused': {
                      border: errorInfo.address ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                      borderRadius: '16px',
                      backgroundColor: 'white'
                    },
                    '& input:-webkit-autofill': {
                      borderRadius: '16px'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: errorInfo.address ? 'rgb(184, 53, 53)' : '#666'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: errorInfo.address ? 'rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                  }
                }}
              />
              <Box
                onClick={() => {
                  if (Object.values(errorInfo).some(value => value) || Object.keys(editInfo).length === 0) return
                  handleUpdateInfo()
                }}
                sx={{
                  width: '100%', height: '40px',
                  bgcolor: 'rgba(0,0,0, .85)',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: Object.values(errorInfo).some(value => value) || Object.keys(editInfo).length === 0 ? 'default' : 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.42, 0, 0.58, 1)',
                  opacity: Object.values(errorInfo).some(value => value) || Object.keys(editInfo).length === 0 && .4,
                  '& p': {
                    color: '#fff', fontSize: '18px', fontWeight: '600'
                  },
                  '&:hover': {
                    transform: !Object.values(errorInfo).some(value => value) || Object.keys(editInfo).length === 0 && 'scaleX(1.02)',
                    opacity: !Object.values(errorInfo).some(value => value) || Object.keys(editInfo).length === 0 && .8
                  }
                }}>
                <Typography>Update</Typography>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
            </Box>
          )}
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
      <Footer />

      {orderDetail && (
        <OrderDetail open={Boolean(orderDetail)} onClose={() => setOrderDetail(null)} orderId={orderDetail} />
      )}
    </Container>
  )
}

export default Dashboard