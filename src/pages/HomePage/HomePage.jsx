// import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
// import Header from '~/components/Header/Header'
import Header from '~/components/Header/Header'
import Slogan from '~/components/Slogan/Slogan'

function HomePage () {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{
        bgcolor: 'gray',
        height: '100vh'
      }}>
        <Header />
        <Slogan />
      </Container>
    </>
  )
}

export default HomePage