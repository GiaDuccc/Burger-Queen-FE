import { useState } from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import logoIcon from '~/assets/logo2.png'
import shoppingBagIcon from '~/assets/cart.png'
import loginIcon from '~/assets/login.png'
import searchIcon from '~/assets/search.png'
import TextField from '@mui/material/TextField'
import Cart from '../Cart/Cart'

const headerHeight = (theme) => theme.shop.headerHeight

function Header() {
  const [openCart, setOpenCart] = useState(false)

  const toggleCartDrawer = () => {
    setOpenCart(!openCart)
  }

  return (
    <Box sx={{
      width: '100%',
      heigth: headerHeight,
      bgcolor: 'white',
      display: 'flex',
      justifyContent: 'center',
      gap: 2,
      overflow: 'hidden'
    }}>
      <Link href="/" sx={{ height: headerHeight, padding: '0 16px' }} >
        <img src={logoIcon} alt="logo" style={{ height: '44px' }}/>
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
          padding: '0 24px'
        },
        '& a:hover': {
          opacity: '.8'
        }
      }}>
        <Link href="/ProductPage" underline="none" >Product</Link>
        <Link href="/NikePage" underline="none" >Nike</Link>
        <Link href="/AdidasPage" underline="none" >Adidas</Link>
        <Link href="/BitisPage" underline="none" >Biti&apos;s</Link>
        <Link href="/PumaPage" underline="none" >Puma</Link>
        <Link href="/NewBalancePage" underline="none" >NewBalance</Link>
        <Link href="/ConversePage" underline="none" >Converse</Link>
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
              padding: 0
            },
            endAdornment: (
              <Box sx={{
                width: '32px',
                height: '32px',
                bgcolor: '#D9D9D9',
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                  cursor: 'pointer',
                  bgcolor: '#c7c7c7'
                }
              }} >
                <img src={searchIcon} alt="search" style={{ height: '14px', width: 'auto' }}/>
              </Box>
            )
          }}
        />
        <Box sx={{ height: headerHeight, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={toggleCartDrawer}
        >
          <img src={shoppingBagIcon} alt="cart" style={{ height: '17px' }}/>
        </Box>
        <Cart open={openCart} toggleDrawer={toggleCartDrawer} />
        <Link href="/Login" sx={{ height: headerHeight, display: 'flex', alignItems: 'center' }} >
          <img src={loginIcon} alt="cart" style={{ height: '17px' }}/>
        </Link>
      </Box>
    </Box>
  )
}

export default Header