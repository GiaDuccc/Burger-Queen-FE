import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

function ProductCard({ product, index, onClick }) {

  const [hoveredObject, setHoveredObject] = useState({ hoveredItem: null, hoveredColor: 0 })

  return (
    <Box
      key={index}
      onClick={onClick}
      onMouseEnter={() => setHoveredObject(prev => ({ ...prev, hoveredItem: index }))}
      onMouseLeave={() => setHoveredObject({ hoveredItem: null, hoveredColor: 0 })}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'white',
        width: '100%',
        height: '100%',
        borderRadius: '16px',
        boxShadow: '1px 1px 10px rgb(220, 220, 220)',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
        '&:hover': {
          boxShadow: '2px 2px 8px rgb(201, 200, 200)',
          transform: 'scale(1.02)',
          transformOrigin: 'center',
          cursor: 'pointer'
        }
      }}
    >
      <Box sx={{ height: '315px' }}>

        {/* Ảnh khi chưa click color */}
        <img src={product.colors[0].image}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: hoveredObject.hoveredItem === index ? 'none' : 'block' }} />

        {/* Ảnh khi click color */}
        {hoveredObject.hoveredItem === index && (
          <img
            src={product.colors[hoveredObject.hoveredColor].image}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        )}

      </Box>
      <Box sx={{ p: '16px 0' }}>
        {/* Màu sắc... */}
        <Box sx={{ display: 'flex', gap: 1.3, justifyContent: 'center' }}>
          {product.colors.map((color, idx) => (
            <Box
              key={idx}
              onMouseEnter={() => setHoveredObject(prev => ({ ...prev, hoveredColor: idx }))}
              sx={{
                bgcolor: color.colorHex,
                width: '13px', height: '13px',
                borderRadius: '16px',
                border: '1px solid rgba(129, 125, 119, .6)'
              }}
            ></Box>
          ))}
        </Box>
        <Box sx={{
          p: '12px 16px 0 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {/* Stock */}
          <Typography sx={{ color: '#d33918', fontSize: '16px', fontWeight: '600' }}>{product.stock > 0 ? 'Just in' : 'Sold Out'}</Typography>
          {/* Tên sản phẩm */}
          <Typography sx={{ fontWeight: '600', fontSize: '20px', pt: '4px' }} >{product.name}</Typography>
          <Typography sx={{ fontSize: '16px', color: '#7e7e85', pb: '4px' }} >{product.type.slice(0, 1).toUpperCase() + product.type.slice(1)}</Typography>
          {/* Price */}
          <Typography sx={{ fontWeight: '600', fontSize: '15px', color: '#000000c2' }} >{Number(product.price).toLocaleString('vi-VN')}đ</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ProductCard
