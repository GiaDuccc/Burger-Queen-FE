import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Header from '~/components/Header/Header'
import Slogan from '~/components/Slogan/Slogan'
import HeroSection from '~/components/HeroSection/HeroSection'
import video1 from '~/assets/videoHeroSection/video1.mp4'
import { useState } from 'react'
import { chatbot } from '~/apis'
import { Typography } from '@mui/material'

function HomePage() {

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const [res, setRes] = useState('')
  const handleChatbot = async (message) => {
    await chatbot(message).then(data => setRes(data.reply))
  }

  return (
    <Container disableGutters maxWidth={false} sx={{
      bgcolor: 'white',
      width: '100%',
      height: '3000px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <Slogan />
      <HeroSection video={video1} title={'ABC'} descTitle={'Every Step, Handled with Care.'} />
      {/* <SliderUtilities id='Utilities' title='Utilities' items={Utilities} name={'Utilities'} /> */}
      {/* <Box>
        <TextField
          // autoFocus
          onKeyUp={(e) => {
            e.key === 'Enter' && handleChatbot(e.target.value)
          }}
          id="filledUsername"
          label="Email or Phone Number"
          variant="filled"
          InputProps={{
            disableUnderline: true
          }}
          sx={{
            width: '55%',
            backgroundColor: 'white',
            '& .MuiFilledInput-root': {
              backgroundColor: 'white',
              borderRadius: '16px',
              paddingRight: '0px',
              color: 'rgba(0, 0, 0, 0.85)',
              border: '2px solid rgb(170, 170, 170)',
              '&.Mui-focused': {
                border: '1.7px solid rgba(0, 0, 0, 0.65)',
                borderRadius: '16px',
                backgroundColor: 'white'
              },
              '& input:-webkit-autofill': {
                borderRadius: '16px'
              }
            },
            '& .MuiInputLabel-root': {
              color: '#666'
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#666'
            }
          }}
        />
      </Box>
      <Typography>{res}</Typography> */}
    </Container>
  )
}

export default HomePage