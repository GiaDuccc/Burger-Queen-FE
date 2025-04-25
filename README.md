// const [lastNameValue, setLastNameValue] = useState('')
  // const [lastNameValueError, setLastNameValueError] = useState({
  //   nameError: '',
  //   error: false
  // })

  // const [firstNameValue, setFirstNameValue] = useState('')
  // const [firstNameValueError, setFirstNameValueError] = useState(false)

  // const [countryValue, setCountryValue] = useState('')
  // const [countryValueError, setCountryValueError] = useState(false)

  // const [dob, setDob] = useState({
  //   day: '',
  //   month: '',
  //   year: ''
  // })

  // const [emailValue, setEmailValue] = useState('')
  // const [emailValueError, setEmailValueError] = useState(false)

  // const [phoneValue, setPhoneValue] = useState('')
  // const [phoneValueError, setPhoneValueError] = useState(false)

  // const [passwordValue, setPasswordValue] = useState('')
  // const [passwordValueError, setPasswordValueError] = useState(false)

  // const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  // const [confirmPasswordValueError, setConfirmPasswordValueError] = useState(false)

  <Box sx={{ position: 'relative' }}>
            <TextField
              className={countryValueError ? 'shake' : ''}
              onChange={(e) => {
                setCountryValue(e.target.value)
                setCountryValueError(false)
              }}
              onBlur={() => countryValue === '' && setCountryValueError(true)}
              id="select_country"
              select
              label={'Country/Region' + (countryValueError ? '-is required' : '')}
              slotProps={{
                select: {
                  native: true
                }
              }}
              InputProps={{
                disableUnderline: true
              }}
              variant="filled"
              sx={{
                width: '100%',
                backgroundColor: 'white',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  paddingRight: '10px',
                  color: 'rgba(0, 0, 0, 0.85)',
                  border: countryValueError ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                  '&.Mui-focused': {
                    border: countryValueError ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                    borderRadius: '16px',
                    backgroundColor: 'white'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: countryValueError ? 'rgb(184, 53, 53)' : '#666'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: countryValueError ? ' rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                },
                '& select': {
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  background: 'none',
                  paddingRight: '30px'
                },
                '& .MuiSelect-icon': {
                  display: 'none'
                }
              }}
            >
              {countries.map((country, idx) => (
                <option
                  key={idx}
                  value={country.code}
                  style={{
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  {country.name}
                </option>
              ))}
            </TextField>
            <KeyboardArrowDownIcon sx={{
              color: 'black',
              position: 'absolute',
              top: '50%',
              right: '15px',
              pointerEvents: 'none',
              transform: 'translateY(-50%)'
            }} />
          </Box>
          <hr style={{
            border: 'none',
            borderTop: '1px solid #ccc',
            margin: '12px 0'
          }} />
          {/* Date */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, textAlign: 'left' }}>
            <Box>
              <Typography sx={{ fontSize: '16px', fontWeight: '600', color: 'rgb(78, 78, 78)' }}>Date of Birth</Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              gap: 1,
              width: '100%'
            }}>
              {/* Day */}
              <Box sx={{ position: 'relative', width: '100%' }}>
                <TextField
                  onChange={(e) => setDob({ ...dob, day: e.target.value })}
                  id="select_day"
                  select
                  label="Day"
                  value={dob.day}
                  variant="filled"
                  slotProps={{
                    select: {
                      native: true
                    }
                  }}
                  InputProps={{
                    disableUnderline: true
                  }}
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
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
                      color: 'rgba(0,0,0,.85)'
                    }
                  }}
                >
                  {days.map((day, idx) => (
                    <option key={idx} value={day} style={{
                      backgroundColor: 'white',
                      color: 'black'
                    }}>
                      {day}
                    </option>
                  ))}
                </TextField>
                <KeyboardArrowDownIcon sx={{
                  color: 'black',
                  position: 'absolute',
                  top: '50%',
                  right: '15px',
                  pointerEvents: 'none',
                  transform: 'translateY(-50%)'
                }} />
              </Box>
              {/* Month */}
              <Box sx={{ position: 'relative', width: '100%' }}>
                <TextField
                  onChange={(e) => setDob({ ...dob, month: e.target.value })}
                  id="filled-select-currency-native"
                  value={dob.month}
                  select
                  label="Month"
                  variant="filled"
                  slotProps={{
                    select: {
                      native: true
                    }
                  }}
                  InputProps={{
                    disableUnderline: true
                  }}
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
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
                      color: 'rgba(0,0,0,.85)'
                    }
                  }}
                >
                  {months.map((month, idx) => (
                    <option key={idx} value={month} style={{
                      backgroundColor: 'white',
                      color: 'black'
                    }}>
                      {month}
                    </option>
                  ))}
                </TextField>
                <KeyboardArrowDownIcon sx={{
                  color: 'black',
                  position: 'absolute',
                  top: '50%',
                  right: '15px',
                  pointerEvents: 'none',
                  transform: 'translateY(-50%)'
                }} />
              </Box>
              {/* Year */}
              <Box sx={{ position: 'relative', width: '100%' }}>
                <TextField
                  onChange={(e) => setDob({ ...dob, year: e.target.value })}
                  id="filled-select-currency-native"
                  select
                  label="Year"
                  variant="filled"
                  slotProps={{
                    select: {
                      native: true
                    }
                  }}
                  InputProps={{
                    disableUnderline: true
                  }}
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
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
                      color: 'rgba(0,0,0,.85)'
                    }
                  }}
                >
                  {years.map((year, idx) => (
                    <option key={idx} value={year} style={{
                      backgroundColor: 'white',
                      color: 'black'
                    }}>
                      {year}
                    </option>
                  ))}
                </TextField>
                <KeyboardArrowDownIcon sx={{
                  color: 'black',
                  position: 'absolute',
                  top: '50%',
                  right: '15px',
                  pointerEvents: 'none',
                  transform: 'translateY(-50%)'
                }} />
              </Box>
            </Box>
          </Box>
          {/* Email */}
          <Box>
            <TextField
              className={emailValueError ? 'shake' : ''}
              onChange={(e) => {
                setEmailValue(e.target.value)
                setEmailValueError(false)
              }}
              onBlur={() => emailValue === '' && setEmailValueError(true)}
              id="filledEmail"
              label={'Email' + (emailValueError ? '-is required' : '')}
              variant="filled"
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
                  paddingRight: '10px',
                  color: 'rgba(0, 0, 0, 0.85)',
                  border: emailValueError ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                  '&.Mui-focused': {
                    border: emailValueError ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                    borderRadius: '16px',
                    backgroundColor: 'white'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: emailValueError ? 'rgb(184, 53, 53)' : '#666'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: emailValueError ? 'rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                }
              }}
            />
          </Box>
          {/* Phone */}
          <Box>
            <TextField
              className={phoneValueError ? 'shake' : ''}
              onChange={(e) => {
                setPhoneValue(e.target.value)
                setPhoneValueError(false)
              }}
              onBlur={() => phoneValue === '' && setPhoneValueError(true)}
              id="filledPhone"
              label={'Phone' + (phoneValueError ? '-is required' : '')}
              variant="filled"
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
                  paddingRight: '10px',
                  color: 'rgba(0, 0, 0, 0.85)',
                  border: phoneValueError ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                  '&.Mui-focused': {
                    border: phoneValueError ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                    borderRadius: '16px',
                    backgroundColor: 'white'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: phoneValueError ? 'rgb(184, 53, 53)' : '#666'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: phoneValueError ? 'rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                }
              }}
            />
          </Box>
          <hr style={{
            border: 'none',
            borderTop: '1px solid #ccc',
            margin: '12px 0'
          }} />
          {/* Password */}
          <Box>
            <TextField
              className={passwordValueError ? 'shake' : ''}
              onChange={(e) => {
                setPasswordValue(e.target.value)
                setPasswordValueError(false)
              }}
              onBlur={() => passwordValue === '' && setPasswordValueError(true)}
              id="filledPassword"
              label={'Password' + (passwordValueError ? '-is required' : '')}
              variant="filled"
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
                  paddingRight: '10px',
                  color: 'rgba(0, 0, 0, 0.85)',
                  border: passwordValueError ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                  '&.Mui-focused': {
                    border: passwordValueError ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                    borderRadius: '16px',
                    backgroundColor: 'white'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: passwordValueError ? 'rgb(184, 53, 53)' : '#666'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: passwordValueError ? 'rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                }
              }}
            />
          </Box>
          {/* Confirm Password */}
          <Box>
            <TextField
              className={confirmPasswordValueError ? 'shake' : ''}
              onChange={(e) => {
                setConfirmPasswordValue(e.target.value)
                setConfirmPasswordValueError(false)
              }}
              onBlur={() => confirmPasswordValue === '' && setConfirmPasswordValueError(true)}
              id="filledConfirmPassword"
              label={'Confirm Password' + (confirmPasswordValueError ? '-is required' : '')}
              variant="filled"
              InputProps={{
                disableUnderline: true
              }}
              type="password"
              sx={{
                flex: 1,
                backgroundColor: 'white',
                width: '100%',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  paddingRight: '10px',
                  color: 'rgba(0, 0, 0, 0.85)',
                  border: confirmPasswordValueError ? '2px solid rgb(184, 53, 53)' : '2px solid rgb(170, 170, 170)',
                  '&.Mui-focused': {
                    border: confirmPasswordValueError ? '2px solid rgb(184, 53, 53)' : '2px solid rgba(0, 0, 0, 0.65)',
                    borderRadius: '16px',
                    backgroundColor: 'white'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: confirmPasswordValueError ? 'rgb(184, 53, 53)' : '#666'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: confirmPasswordValueError ? 'rgb(184, 53, 53)' : 'rgba(0,0,0,.85)'
                }
              }}
            />
          </Box>

          {/* Submit */}
          <Box
            onClick={() => handleSubmit()}
            sx={{
              bgcolor: 'rgba(0,0,0,.85)',
              width: '100%',
              p: '12px',
              borderRadius: '12px',
              transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
              '&:hover': {
                transform: 'scale(1.02)',
                transformOrigin: 'center',
                cursor: 'pointer'
              }
            }} >
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Continue</Typography>
          </Box>