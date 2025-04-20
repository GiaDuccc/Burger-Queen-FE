import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FilterOptions from './FilterOptions/FilterOptions'

function Filter({ filterOptions, apply }) {

  return (
    <Box
      className="Filter"
      sx={{
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        color: 'rgba(0,0,0,.85)',
        flex: 2,
        height: '100%',
        pt: '16px'
      }}
    >
      {/* FilterOptions */}
      <FilterOptions filterOptions={filterOptions} />

      {/* Apply button */}
      <Box sx={{ p: '0 12px 0 8px' }}>
        <Box
          onClick={apply}
          sx={{
            bgcolor: 'black',
            p: '6px 16px',
            borderRadius: '16px',
            textAlign: 'center',
            transition: 'all 0.35s cubic-bezier(0.42, 0, 0.58, 1)',
            boxShadow: '1px 1px 10px rgb(201, 200, 200)',
            '& p': {
              fontSize: '20px',
              fontWeight: '600',
              color: 'rgb(204, 204, 204)',
              transition: 'all 0.35s cubic-bezier(0.42, 0, 0.58, 1)'
            },
            '&:hover': {
              boxShadow: '1.5px 1.5px 10px rgb(122, 122, 122)',
              transform: 'scale(1.02)',
              transformOrigin: 'center',
              cursor: 'pointer'
            },
            '&:hover p': {
              color: 'rgb(255, 255, 255)'
            }
          }}>
          <Typography>Apply</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Filter