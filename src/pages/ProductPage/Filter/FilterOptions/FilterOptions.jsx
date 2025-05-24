import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FilterItems from './FilterItems/FilterItems'
import downIcon from '~/assets/down.png'

function FilterOptions({ filterOptions }) {

  const initFilterOption = filterOptions.reduce((acc, option) => {
    const key = Object.keys(option)[0].toLowerCase()
    acc[key] = false
    return acc
  }, {})

  const [openFilterOption, setOpenFilterOption] = useState(initFilterOption)

  return (
    <Box sx={{
      gap: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxHeight: '100vh',
      p: '8px 12px 16px 8px',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      scrollbarWidth: 'none', // Firefox
      msOverflowStyle: 'none' // IE/Edge
    }}>
      {/* Filter Options */}
      {filterOptions.map((filterOption, index) => {
        const key = Object.keys(filterOption)[0];
        return (
          <Box
            className="Filter-Options"
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.35s cubic-bezier(0.42, 0, 0.58, 1)',
              maxHeight: openFilterOption[key.toLowerCase()] ? '450px' : '76px',
              '& div p': {
                fontSize: '24px',
                fontWeight: '600'
              }
            }}
          >
            <Box
              onClick={() => setOpenFilterOption(prev => ({ ...prev, [key.toLowerCase()]: !prev[key.toLowerCase()] }))}
              sx={{
                p: '16px 16px',
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
                '& img': {
                  transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
                  transform: openFilterOption[key.toLowerCase()] ? 'scaleY(-1)' : 'scaleY(1)',
                  transformOrigin: 'center',
                  color: 'rgba(0,0,0,.5)',
                  width: '14px',
                  height: '14px',
                  opacity: .3,
                  userSelect: 'none'
                }
              }}>
                <img src={downIcon} />
              </Box>
            </Box>
            <FilterItems filterOption={filterOption} openFilterOption={openFilterOption} idx={key} />
          </Box>
        )
      })}
    </Box>
  )
}

export default FilterOptions
