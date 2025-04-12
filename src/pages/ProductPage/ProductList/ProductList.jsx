import Box from '@mui/material/Box'
import ProductCard from './ProductCard/ProductCard'

function ProductList ({ products }) {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      color: 'black',
      gap: 2.5,
      height: '100%',
      py: '24px'
    }}>
      {products?.map((product, index) => (
        <ProductCard key={index} product={product} index={index} />
      ))}
    </Box>
  )
}

export default ProductList