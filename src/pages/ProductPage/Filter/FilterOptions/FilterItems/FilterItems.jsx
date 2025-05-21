import { Checkbox, FormControlLabel, FormGroup, Radio } from '@mui/material'
import doneIcon from '~/assets/v-white.png'
import Box from '@mui/material/Box'
import { useSearchParams } from 'react-router-dom'

function FilterItems({ filterOption, openFilterOption, idx }) {

  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (event, filter, value) => {
    const checked = event.target.checked
    const isRadio = filter === 'sort'

    let newFilters
    if (isRadio) {
      const currentValue = searchParams.get(filter)

      if (currentValue === value) {
        searchParams.delete(filter)
      }
      else {
        searchParams.set(filter, value)
      }
    }
    else {
      const currentFilters = searchParams.get(`${filter}`)?.split(',') || []
      if (checked) {
        newFilters = [...currentFilters, `${value}`]
      }
      else {
        newFilters = currentFilters.filter(f => f !== `${value}`)
      }

      if (newFilters.length === 0) {
        searchParams.delete(filter)
      }
      else {
        searchParams.set(`${filter}`, newFilters.join(','))
      }
    }

    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  return (
    <Box sx={{
      mt: '8px',
      height: openFilterOption[idx.toLowerCase()] ? '100%' : '0px',
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
        {filterOption[idx].map((item) => (
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
              label={item.slice(0, 1).toUpperCase() + item.slice(1)}
              control={
                idx.toLowerCase() === 'sort' ? (
                  <Radio
                    checked={searchParams.get(idx.toLowerCase())?.split(',').includes(item.toLowerCase()) || false}
                    onClick={e => handleChange(e, idx.toLowerCase(), item.toLowerCase())}
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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img src={doneIcon} style={{ width: '14px', height: '14px' }} />
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
                ) : (
                  <Checkbox
                    checked={searchParams.get(idx.toLowerCase())?.split(',').includes(item.toLowerCase()) || false}
                    onChange={e => handleChange(e, idx.toLowerCase(), item.toLowerCase())}
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
                      <img src={doneIcon} style={{ width: '14px', height: '14px' }} />
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
                )
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
  )
}

export default FilterItems
