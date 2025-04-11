import Box from '@mui/material/Box'
import ProductCard from './ProductCard/ProductCard'

function ProductList ({ products }) {
  console.log('productList:', products)
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      color: 'black',
      flex: 8,
      gap: 3,
      height: '100%',
      py: '24px'
    }}>
      { console.log('render') }
      {products?.map((product, index) => (
        <ProductCard key={index} product={product} index={index} />
      ))}
    </Box>
  )
}

export default ProductList