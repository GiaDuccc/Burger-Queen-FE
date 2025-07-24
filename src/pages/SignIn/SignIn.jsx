import Container from '@mui/material/Container'
import Header from '~/components/Header/Header'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import nextButton from '~/assets/next.png'
import { useEffect, useRef, useState } from 'react'
import Link from '@mui/material/Link'
import { fetchLoginAPI } from '~/apis'
import { useNavigate } from 'react-router-dom'
import warningIcon from '~/assets/danger.png'
import checkIcon from '~/assets/check.png'
import dangerIcon from '~/assets/danger.png'
import dingSound from '~/assets/ding-sound.mp3'
import '~/App.css'

// import Fade from '@mui/material/Fade'

function Login() {

  const [user, setUser] = useState(true)

  const [inputValue, setInputValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [isValid, setIsValid] = useState('')
  const [submitStatus, setSubmitStatus] = useState('idle')
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const passwordRef = useRef(null)

  const tickSound = new Audio(dingSound)

  const handleSubmit = async () => {
    setSubmitStatus('loading')
    const user = {
      username: inputValue,
      password: passwordValue
    }
    setTimeout(async () => {
      await fetchLoginAPI(user)
        .then(data => {
          // Lưu JWT token và refresh token
          localStorage.setItem('accessToken', data.token)
          localStorage.setItem('refreshToken', data.refreshToken)

          tickSound.volume = 0.4
          tickSound.play()
          setTimeout(() => {
            setSubmitStatus('success')
          }, 400)
          setTimeout(() => {
            navigate('/profile')
          }, 900)
        })
        .catch(error => {
          setSubmitStatus('failed')
          setIsValid(error.response?.data?.message || 'Login failed')
        })
    }, 2000)
  }

  setTimeout(() => {
    setUser(false)
  }, 700)

  useEffect(() => {
    if (showPassword && passwordRef.current) {
      passwordRef.current.focus(); // khi hiện thì focus
    }
  }, [showPassword])

  if (user) {
    return (<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box className='spinner-large'></Box>
    </Box>)
  }


  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        bgcolor: 'white',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title */}
        <Typography sx={{
          fontSize: '40px',
          color: 'rgba(0,0,0,.85)',
          fontWeight: '600',
          mx: '100px',
          pt: '32px'
        }}>
          Sign in for shopping.
        </Typography>

        {/* Content */}
        <Box
          className='fade-in-up'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: '52px',
            flex: 1
          }}>
          <Box sx={{ width: '60%', textAlign: 'center', flex: 1 }}>
            <Typography sx={{
              color: 'rgb(78, 78, 78)',
              fontSize: '28px',
              fontWeight: '600',
              pb: '24px'
            }}>
              Sign in
            </Typography>

            {/* UserName & Password */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, height: '150px' }}>
              <TextField
                autoFocus
                onKeyUp={(e) => {
                  e.key === 'Enter' && (inputValue && setShowPassword(true))
                }}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setPasswordValue('')
                  setShowPassword(false)
                  setIsValid('')
                }}
                id="filledUsername"
                label="Email or Phone Number"
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <Box
                      onClick={() => inputValue && setShowPassword(true)}
                      sx={{
                        display: showPassword ? 'none' : 'flex',
                        cursor: inputValue && 'pointer',
                        pr: '12px'
                      }}>
                      <img
                        src={nextButton}
                        style={{
                          width: '28px',
                          opacity: inputValue ? '1' : '0.5',
                          transition: 'opacity 0.5s cubic-bezier(0.42, 0, 0.58, 1)'
                        }}
                      />
                    </Box>
                  ),
                  disableUnderline: true
                }}
                sx={{
                  width: '55%',
                  backgroundColor: 'white',
                  zIndex: 0,
                  transition: 'transform 0.2s cubic-bezier(0.42, 0, 0.58, 1)',
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    paddingRight: '0px',
                    color: 'rgba(0, 0, 0, 0.85)',
                    border: '2px solid rgb(170, 170, 170)',
                    '&.Mui-focused': {
                      border: '1.7px solid rgba(0, 0, 0, 0.65)',
                      borderRadius: '16px',
                      backgroundColor: 'white'
                    },
                    '& input:-webkit-autofill': {
                      borderRadius: '16px'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: '#666'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: inputValue ? 'rgba(0, 0, 0, 0.85)' : '#666'
                  }
                }}
              />

              {/* Password  */}
              {showPassword && (
                <Box className='slide-from-left' sx={{ width: '55%' }}>
                  {/* <Slide direction="right" in={showPassword} mountOnEnter unmountOnExit> */}
                  {/* <Fade in={showPassword} timeout={400}> */}
                  <TextField
                    inputRef={passwordRef}
                    value={passwordValue}
                    onKeyUp={(e) => {
                      e.key === 'Enter' && (passwordValue && handleSubmit())
                    }}
                    onChange={(e) => {
                      showPassword ? setPasswordValue(e.target.value) : setPasswordValue('')
                      setIsValid('')
                      setSubmitStatus('idle')
                    }}
                    id="fieldPassword"
                    label="Password"
                    variant="filled"
                    type='password'
                    InputProps={{
                      endAdornment: (
                        submitStatus === 'idle' ? (
                          <Box
                            onClick={() => (passwordValue && !isValid) && handleSubmit()}
                            sx={{
                              display: 'flex',
                              cursor: 'pointer'
                            }}>
                            <img
                              src={nextButton}
                              style={{
                                width: '28px',
                                opacity: passwordValue && !isValid ? '1' : '0.5',
                                transition: 'opacity 0.5s cubic-bezier(0.42, 0, 0.58, 1)'
                              }}
                            />
                          </Box>
                        ) : submitStatus === 'loading' ? (
                          <Box className='spinner-black'></Box>
                        ) : submitStatus === 'success' ? (
                          <Box sx={{ display: 'flex' }}>
                            <img src={checkIcon} style={{ width: '28px' }} />
                          </Box>
                        ) : submitStatus === 'failed' ? (
                          <Box sx={{ display: 'flex' }}>
                            <img src={dangerIcon} style={{ width: '28px' }} />
                          </Box>
                        ) : null
                      ),
                      disableUnderline: true
                    }}
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      zIndex: 0,
                      transition: 'transform 0.2s cubic-bezier(0.42, 0, 0.58, 1)',
                      '& .MuiFilledInput-root': {
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        paddingRight: '10px',
                        color: 'rgba(0, 0, 0, 0.85)',
                        border: '2px solid rgb(170, 170, 170)',
                        '&.Mui-focused': {
                          border: '2px solid rgba(0, 0, 0, 0.65)',
                          borderRadius: '16px',
                          backgroundColor: 'white'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#666'
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: inputValue ? 'rgba(0, 0, 0, 0.85)' : '#666'
                      }
                    }}
                  />
                  {/* </Fade> */}
                  {/* </Slide> */}
                </Box>

              )}
              {/* Error */}
              <Box
                className={isValid ? 'shake' : ''}
                sx={{
                  display: isValid ? 'flex' : 'none',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'rgb(184, 53, 53)'
                }}>
                <img src={warningIcon} style={{ width: '18px', height: '18px' }} />
                <Typography>{isValid}</Typography>
              </Box>
            </Box>

            {/* Forgot password */}
            <Box sx={{
              color: '#06c',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 0.6,
              pb: '12px',
              mt: '100px',
              '& a': {
                color: '#06c'
              },
              '& a:hover': {
                textDecoration: 'underline'
              }
            }}>
              <Link href="#" underline='none' >Forgot password?</Link>
              {/* <CallMadeOutlinedIcon sx={{ fontSize: '13px' }} /> */}
            </Box>

            {/* Don't have account */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1
            }}>
              <Typography sx={{ color: '#676767' }} >Don&apos;t have an Account?</Typography>
              <Box sx={{
                color: '#06c',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 0.6,
                '& a': {
                  color: '#06c'
                },
                '& a:hover': {
                  textDecoration: 'underline'
                }
              }}>
                <Link href="/sign-up" underline='none' >Create Your Account</Link>
                {/* <CallMadeOutlinedIcon sx={{ fontSize: '13px' }} /> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Login