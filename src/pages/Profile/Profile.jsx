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
import { fetchCustomerDetailAPI, fetchGetOrder, updateCustomer, fetchLogoutAPI } from '~/apis'
import OrderDetail from '~/components/OrderDetail/OrderDetail'
import '~/App.css'
import warningIcon from '~/assets/danger.png'
import Footer from '~/components/Footer/Footer'
import { jwtDecode } from 'jwt-decode'
import styles from './Profile.module.css'
import { useForm, Controller } from 'react-hook-form'

function Dashboard() {

  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [customer, setCustomer] = useState({})
  const [orderDetail, setOrderDetail] = useState(null)
  const [isLoadingOrder, setIsLoadingOrder] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const user = jwtDecode(localStorage.getItem('accessToken'))

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
      address: ''
    }
  })

  const fetchOrders = async () => {
    try {
      setIsLoadingOrder(true)
      const customer = await fetchCustomerDetailAPI(user.userId)
      setCustomer(customer)

      let newOrders = []
      if (customer.orders) {
        for (const order of customer.orders) {
          if (order.status !== 'cart') {
            try {
              const data = await fetchGetOrder(order.orderId)
              newOrders.push(data)
            } catch (orderError) {
              console.error('Error fetching order:', order.orderId, orderError)
              // Continue với order khác nếu có lỗi
            }
          }
        }
        setOrders(newOrders.reverse().slice(0, 10))
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      // Nếu là lỗi authentication, redirect về login
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/sign-in')
      }
    } finally {
      setIsLoadingOrder(false)
    }
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

  const logOut = async () => {
    try {
      // Gọi API logout để invalidate token ở server
      await fetchLogoutAPI()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Xóa tất cả user data và token
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      navigate('/sign-in')
    }
  }

  const handleUpdateInfo = async (formData) => {
    // So sánh formData với customer, chỉ lấy các trường thay đổi
    const changedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== customer[key]) {
        changedFields[key] = formData[key];
      }
    });
    if (Object.keys(changedFields).length === 0) {
      setIsEdit(false);
      return;
    }
    try {
      await updateCustomer(customer._id, changedFields);
      setIsEdit(false);
      fetchOrders();
    } catch (error) {
      console.error('Update customer error:', error);
      // Handle specific errors if needed
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/sign-in')
      return
    }
    fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update form default values when customer data changes
  useEffect(() => {
    if (customer && Object.keys(customer).length > 0) {
      reset({
        lastName: customer.lastName || '',
        firstName: customer.firstName || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || ''
      })
    }
  }, [customer, reset])

  return (
    <Container className={styles.container} disableGutters maxWidth={false}>
      <Header />
      {/* Content */}
      <div className={`${styles.content} fade-in-up`}>
        <div className={styles.contentHeader}>
          <p className={`${styles.customerId} font-size-32 m-0`}>
            {`Customer #${customer?.phone}`}
          </p>
          <div className={`${styles.buttonFeature} flex gap-32`}>
            {/* Admin */}
            <div className='align-center gap-8'
              onClick={() => navigate('/admin')}
              style={{ display: (customer?.role === 'admin' || customer?.role === 'manager') ? 'flex' : 'none' }}
            >
              <p>Admin</p>
              {/* <SettingsIcon sx={{ fontSize: '16px' }} /> */}
              <img className='width-16px height-16px opacity-6' src={settingsIcon} />
            </div>
            {/* Edit */}
            <div
              onClick={() => {
                setIsEdit(!isEdit)
                if (!isEdit) {
                  // Reset form to current customer values when entering edit mode
                  reset({
                    lastName: customer.lastName || '',
                    firstName: customer.firstName || '',
                    email: customer.email || '',
                    phone: customer.phone || '',
                    address: customer.address || ''
                  })
                }
              }}
              className={`${styles.editButton}`}
            >
              <p>{isEdit ? 'Cancel' : 'Edit'}</p>
              {/* <SettingsIcon sx={{ fontSize: '16px' }} /> */}
              <div className='width-18px height-18px position-relative'>
                <img className='width-100 height-100 opacity-6' src={editIcon} />
                {isEdit && (
                  <div
                    style={{
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
              </div>
            </div>
            {/* Log Out */}
            <div
              onClick={() => logOut()}
              className='align-center gap-8 flex'
            >
              <p>Log Out</p>
              <img className='width-16px height-16px opacity-6' src={logOutIcon} />
            </div>
          </div>
        </div>
        {/* Divider */}
        <hr style={{
          width: '100%',
          border: 'none',
          borderTop: '1px solid #ccc',
          margin: '4px auto'
        }} />
        {/* User Detail */}
        <div className='userDetailWrapper flex flex-col mt-24 gap-24 width-100'>
          {isEdit ? (
            <form onSubmit={handleSubmit(handleUpdateInfo)} className='userDetailEdit width-100 flex flex-col gap-16 align-end'>
              {/* Last Name */}
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="lastName"
                    className={errors.lastName ? 'shake' : ''}
                    label={
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {errors.lastName && <img src={warningIcon} style={{ width: '16px', height: '16px' }} />}
                        {errors.lastName ? errors.lastName.message : 'Last Name'}
                      </span>
                    }
                    variant="filled"
                    error={!!errors.lastName}
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
                        border: errors.lastName ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                        '&.Mui-focused': {
                          border: errors.lastName ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                          borderRadius: '16px',
                          backgroundColor: 'white'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: errors.lastName ? 'rgb(184, 53, 53)' : '#666'
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: errors.lastName ? 'rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                      }
                    }}
                  />
                )}
              />

              {/* First Name */}
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="firstName"
                    className={errors.firstName ? 'shake' : ''}
                    label={
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {errors.firstName && <img src={warningIcon} style={{ width: '16px', height: '16px' }} />}
                        {errors.firstName ? errors.firstName.message : 'First Name'}
                      </span>
                    }
                    variant="filled"
                    error={!!errors.firstName}
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
                        border: errors.firstName ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                        '&.Mui-focused': {
                          border: errors.firstName ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                          borderRadius: '16px',
                          backgroundColor: 'white'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: errors.firstName ? 'rgb(184, 53, 53)' : '#666'
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: errors.firstName ? 'rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                      }
                    }}
                  />
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="email"
                    type="email"
                    className={errors.email ? 'shake' : ''}
                    label={
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {errors.email && <img src={warningIcon} style={{ width: '16px', height: '16px' }} />}
                        {errors.email ? errors.email.message : 'Email'}
                      </span>
                    }
                    variant="filled"
                    error={!!errors.email}
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
                        border: errors.email ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                        '&.Mui-focused': {
                          border: errors.email ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                          borderRadius: '16px',
                          backgroundColor: 'white'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: errors.email ? 'rgb(184, 53, 53)' : '#666'
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: errors.email ? 'rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                      }
                    }}
                  />
                )}
              />

              {/* Phone */}
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: 'Phone is required',
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: 'Phone must be 10-11 digits'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="phone"
                    className={errors.phone ? 'shake' : ''}
                    label={
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {errors.phone && <img src={warningIcon} style={{ width: '16px', height: '16px' }} />}
                        {errors.phone ? errors.phone.message : 'Phone'}
                      </span>
                    }
                    variant="filled"
                    error={!!errors.phone}
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
                        border: errors.phone ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                        '&.Mui-focused': {
                          border: errors.phone ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                          borderRadius: '16px',
                          backgroundColor: 'white'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: errors.phone ? 'rgb(184, 53, 53)' : '#666'
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: errors.phone ? 'rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                      }
                    }}
                  />
                )}
              />

              {/* Address */}
              <Controller
                name="address"
                control={control}
                rules={{ required: 'Address is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="address"
                    className={errors.address ? 'shake' : ''}
                    label={
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {errors.address && <img src={warningIcon} style={{ width: '16px', height: '16px' }} />}
                        {errors.address ? errors.address.message : 'Address'}
                      </span>
                    }
                    variant="filled"
                    error={!!errors.address}
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
                        border: errors.address ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                        '&.Mui-focused': {
                          border: errors.address ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                          borderRadius: '16px',
                          backgroundColor: 'white'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: errors.address ? 'rgb(184, 53, 53)' : '#666'
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: errors.address ? 'rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                      }
                    }}
                  />
                )}
              />

              {/* Submit Button */}
              <Box
                component="button"
                type="submit"
                disabled={!isDirty || !isValid}
                sx={{
                  width: '100%',
                  height: '40px',
                  bgcolor: 'rgba(0,0,0, .85)',
                  borderRadius: '12px',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: (!isDirty || !isValid) ? 'default' : 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.42, 0, 0.58, 1)',
                  opacity: (!isDirty || !isValid) ? 0.4 : 1,
                  '& p': {
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: '600'
                  },
                  '&:hover': {
                    transform: (isDirty && isValid) ? 'scaleX(1.02)' : 'none',
                    opacity: (isDirty && isValid) ? 0.8 : (!isDirty || !isValid) ? 0.4 : 1
                  }
                }}>
                <Typography>Update</Typography>
              </Box>
            </form>
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
        </div>
      </div>
      <Footer />

      {orderDetail && (
        <OrderDetail open={Boolean(orderDetail)} onClose={() => setOrderDetail(null)} orderId={orderDetail} />
      )}
    </Container>
  )
}

export default Dashboard