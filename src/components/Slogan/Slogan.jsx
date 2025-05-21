import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import rightIcon from '~/assets/right.png'
import '~/App.css'

const slogan = 'Explore our exclusive collection of authentic sneakers from Nike, Adidas, Converse,...'

const ColorChangeSlogan = () => {
  const [colorSlogan, setColorSlogan] = useState({ bgcolor: '#3498db', textColor: 'white', linkColor: 'white' })

  useEffect(() => {
    const timer = setTimeout(() => {
      setColorSlogan({ bgcolor: '#ecf0f1', textColor: 'rgba(0,0,0,.9)', linkColor: '#2980b9' })
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Box
      className='fade-in-up'
      sx={{
        width: '100%',
        bgcolor: colorSlogan.bgcolor,
        padding: '16px 0',
        transition:
          'background-color 1.8s cubic-bezier(0.42, 0, 0.58, 1)'
      }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        '& a': {
          color: colorSlogan.linkColor,
          display: 'inline-flex',
          textDecoration: 'none',
          alignItems: 'center',
          transition: 'color 1.8s cubic-bezier(0.42, 0, 0.58, 1)',
          fontSize: '14px'
        },
        '& a:hover': {
          textDecoration: 'underline'
        }
      }}>
        <Typography sx={{ display: 'inline-block', color: colorSlogan.textColor, margin: '0 8px 0 0 ', transition: 'color 1.8s cubic-bezier(0.42, 0, 0.58, 1)' }} >{slogan}</Typography>
        <Link href="#" >Learn more</Link>
      </Box>
    </Box>
  )
}


export default function Slogan() {
  return <ColorChangeSlogan />
}