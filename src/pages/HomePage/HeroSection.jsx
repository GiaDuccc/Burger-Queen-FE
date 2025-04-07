import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import video1 from '~/assets/video1.mp4'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'


export default function HeroSection () {

  const [scale, setScale] = useState(1)
  const [borderRadius, setBorderRadius] = useState('0px')
  const videoRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [playVideo, setPlayVideo] = useState(true)

  const togglePlayVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
    setPlayVideo(!playVideo)
  }

  useEffect(() => {
    const videoObserver = new IntersectionObserver (([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { threshold: 0.5 })

    if (videoRef.current) {
      videoObserver.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoObserver.unobserve(videoRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      let newScale = Math.max(0.88, 1 - scrollY / 4.5 / 1000)
      let newBorderRadius = Math.min(52, scrollY / 14)
      setScale(newScale)
      setBorderRadius(`${newBorderRadius}px`)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'rgba(0,0,0,.85)', p: '64px' }} >
        <Typography variant='h1' sx={{ fontSize: '84px' }}>Mac</Typography>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }} >Bạn nghĩ được <br /> là Mac làm được.</Typography>
      </Box>
      <Box
        sx={{
          position: 'relative',
          top: 0,
          overflow: 'hidden',
          zIndex: 0,
          width: '100%',
          height: '100vh',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          borderRadius,
          transition: 'transform 0.2 cubic-bezier(0.42, 0, 0.58, 1), border-radius 0.2s cubic-bezier(0.42, 0, 0.58, 1)'
        }}
      >
        {/* Video */}
        <Box
          ref={videoRef}
          component="video"
          autoPlay
          loop
          muted
          playsInline
          src={video1}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onClick={togglePlayVideo}
        />
        <Box
          sx={{
            position: 'absolute',
            bgcolor: '#dcdcdc',
            width: '40px',
            height: '40px',
            top: '90%',
            left: '93%',
            borderRadius: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          onClick={togglePlayVideo}
        >
          {playVideo ?
            <PauseIcon sx={{ color: 'rgba(0,0,0,.5)' }} />
            :
            <PlayArrowIcon sx={{ color: 'rgba(0,0,0,.5)' }} />
          }
        </Box>
      </Box>
    </Box>
  )
}