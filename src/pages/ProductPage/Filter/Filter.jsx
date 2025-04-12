import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'

const filterOptions = [
  { Brand: ['Nike', 'Adidas', 'Bitis', 'Puma', 'New Balance', 'Converse'] },
  { Colour: ['Blue', 'Green', 'White', 'Black', 'Gray'] },
  { Stock: ['Blue', 'Green', 'White', 'Black', 'Gray'] },
  { Type: ['Blue', 'Green', 'White', 'Black', 'Gray'] },
  { Price: ['Blue', 'Green', 'White', 'Black', 'Gray'] }
]

function Filter() {

  const [openFilterOption, setOpenFilterOption] = useState({ brand: false, colour: false, price: false, stock: false })

  return (
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
        height: '100%',
        maxHeight: '100vh',
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
                  },
                  '&:hover svg': {
                    color: 'rgba(0,0,0,.85)'
                  }
                }}
              >
                <Typography >{key}</Typography>
                <Box sx={{
                  bgcolor: '#f3f3f3',
                  // bgcolor: '#333336',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '36px',
                  '& svg': {
                    transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
                    transform: openFilterOption[key.toLowerCase()] ? 'scaleY(-1)' : 'scaleY(1)',
                    transformOrigin: 'center',
                    color: 'rgba(0,0,0,.5)'
                  }
                }}>
                  <KeyboardArrowDownIcon />
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
  )
}

export default Filter