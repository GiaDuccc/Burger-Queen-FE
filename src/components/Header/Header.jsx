import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import logoIcon from '~/assets/logo2.png'
import shoppingBagIcon from '~/assets/cart.png'
import signInIcon from '~/assets/login.png'
import searchIcon from '~/assets/search.png'
import TextField from '@mui/material/TextField'
import Cart from '../Cart/Cart'
import Search from '../Search/Search'
import { fetchAllProductAPI } from '~/apis'
import { useSearchParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const headerHeight = (theme) => theme.shop.headerHeight

function Header() {

  const accessToken = localStorage.getItem('accessToken')
  const token = accessToken ? jwtDecode(accessToken) : null

  const [openCart, setOpenCart] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [productList, setProductList] = useState([])
  const [searchParam, setSearchParam] = useSearchParams()
  const isActive = searchParam.get('active') || false

  useEffect(() => {
    (async () => {
      const data = await fetchAllProductAPI()
      setProductList(data)
    })()
  }, [])


  useEffect(() => {
    if (openCart) {
      setSearchParam({ ...Object.fromEntries([...searchParam]), active: 'cart' })
    } else if (openSearch) {
      setSearchParam({ ...Object.fromEntries([...searchParam]), active: 'search' })
    } else if (!openCart && !openSearch && isActive) {
      const params = Object.fromEntries([...searchParam])
      delete params.active
      setSearchParam(params)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCart, openSearch])

  return (
    <Box sx={{
      width: '100%',
      height : headerHeight,
      bgcolor: 'white',
      display: 'flex',
      justifyContent: 'center',
      gap: 2
      // overflow: 'hidden',
      // position: isActive ? 'none' : 'sticky',
      // top: 0,
      // zIndex: isActive ? 0 : 10
    }}>
      <Link href="/" sx={{ height: headerHeight, padding: '0 16px' }} >
        <img src={logoIcon} alt="logo" style={{ height: '44px' }} />
      </Link>

      <Box sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        height: headerHeight,
        '& a': {
          color: 'rgba(0,0,0,0.85)',
          fontWeight: 400,
          fontSize: '14px',
          // textTransform: 'uppercase',
          lineHeight: headerHeight,
          padding: '0 1.5vw'
        },
        '& a:hover': {
          opacity: '.8'
        }
      }}>
        <Link href="/product" underline="none" >Product</Link>
        <Link href="/nike" underline="none" >Nike</Link>
        <Link href="/adidas" underline="none" >Adidas</Link>
        <Link href="/puma" underline="none" >Puma</Link>
        <Link href="/new-balance" underline="none" >NewBalance</Link>
        <Link href="/vans" underline="none" >Vans</Link>
        <Link href="/balenciaga" underline="none" >Balenciaga</Link>
      </Box>

      <Box sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        '& a': {
          padding: '0 24px'
        }
      }}>
        <TextField placeholder='Search' type="text"
          onClick={() => {
            setOpenSearch(!openSearch)
          }}
          sx={{
            minWidth: 180,
            padding: '0 24px',
            input: {
              color: 'black',
              width: '120px',
              fontSize: '13px',
              paddingRight: '4px'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none'
              },
              '&:hover fieldset': {
                border: 'none'
              },
              '&.Mui-focused fieldset': {
                border: 'none'
              }
            }
          }}
          InputProps={{
            sx: {
              height: 32,
              bgcolor: 'rgba(242, 242, 242, 0.9)',
              borderRadius: 4,
              padding: 0,
              '&:hover ': {
                bgcolor: 'rgb(228, 228, 228)'
              }
            },
            endAdornment: (
              <Box sx={{
                width: '32px',
                height: '32px',
                bgcolor: 'rgba(242, 242, 242, 0.9)',
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                  cursor: 'pointer',
                  bgcolor: 'rgb(202, 202, 202)'
                }
              }} >
                <img src={searchIcon} alt="search" style={{ height: '14px', width: 'auto' }} />
              </Box>
            ),
            readOnly: true
          }}
        />
        <Search open={openSearch} toggleDrawer={() => setOpenSearch(!openSearch)} productList={productList} />
        <Box sx={{ height: headerHeight, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => {
            setOpenCart(!openCart)
          }}
        >
          <img src={shoppingBagIcon} alt="cart" style={{ height: '17px' }} />
        </Box>
        <Cart open={openCart} toggleDrawer={() => setOpenCart(!openCart)} />
        <Link href={token ? '/profile' : '/sign-in'}
          sx={{ height: headerHeight, display: 'flex', alignItems: 'center' }} >
          <img src={signInIcon} alt="sign-in" style={{ height: '17px' }} />
        </Link>
      </Box>
    </Box>
  )
}

export default Header