import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'


export default function HeroSection({ video, title, descTitle }) {

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

    const videoObserver = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { threshold: 0.6 })

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

  // useEffect(() => {

  //   const handleScroll = () => {
  //     if (!isVisible) {
  //       scale > 0.98 && setScale(1)
  //       borderRadius < 6 && setBorderRadius('0')
  //       return
  //     }

  //     const scrollY = window.scrollY
  //     console.log('scrollY', scrollY)

  //     sessionStorage.setItem('scrollYStorage', scrollY)

  //     let newScale = Math.max(0.88, 1 - scrollY / 4.7 / 1000)
  //     let newBorderRadius = Math.min(52, scrollY / 14)
  //     console.log('newScale', newScale)
  //     console.log('newBorderRadius', newBorderRadius)
  //     // if (scrollY < 30) {
  //     //   newScale = 1
  //     //   newBorderRadius = 0
  //     // }
  //     // newScale > 0.98 ? setScale(1) : setScale(newScale)
  //     // newBorderRadius < 6 ? setBorderRadius('0px') : setBorderRadius(`${newBorderRadius}px`)
  //     setScale(newScale)
  //     setBorderRadius(`${newBorderRadius}px`)
  //   }

  //   window.addEventListener('scroll', handleScroll)

  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [isVisible])

  useEffect(() => {
    const savedY = sessionStorage.getItem('scrollYStorage')
    if (savedY) {
      const scroll = parseFloat(savedY)
      let newScale = Math.max(0.88, 1 - scroll / 4.7 / 1000)
      let newBorderRadius = Math.min(52, scroll / 14)
      if (scroll < 30) {
        newScale = 1
        newBorderRadius = 0
      }
      setScale(newScale)
      setBorderRadius(`${newBorderRadius}px`)
    }
    const handleScroll = () => {
      if (!isVisible) return

      const scrollY = window.scrollY
      sessionStorage.setItem('scrollYStorage', scrollY)

      let newScale = Math.max(0.88, 1 - scrollY / 4.7 / 1000)
      let newBorderRadius = Math.min(52, scrollY / 14)

      setScale(newScale)
      setBorderRadius(`${newBorderRadius}px`)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])


  return (
    <Box sx={{ width: '100%' }} >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'rgba(0,0,0,.85)', p: '64px 92px ' }} >
        <Typography variant='h1' sx={{ fontSize: '72px', fontWeight: '600' }}>{title}</Typography>
        <Typography variant='h5' sx={{ fontSize: '28px', fontWeight: 'bold', lineHeight: '1.1428571429', whiteSpace: 'pre-line' }} >{descTitle}</Typography>
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
          src={video}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            overflowY: 'hidden',
            border: 'none'
          }}
          onClick={togglePlayVideo}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '89%',
            right: '4%',
            bgcolor: '#333336',
            width: '40px',
            height: '40px',
            borderRadius: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            '&:hover svg': {
              color: 'white',
              transition: 'color 0.3s cubic-bezier(0.42, 0, 0.58, 1)'
            }
          }}
          onClick={togglePlayVideo}
        >
          {playVideo ?
            <PauseIcon sx={{ color: '#d6d6d7' }} />
            :
            <PlayArrowIcon sx={{ color: '#d6d6d7' }} />
          }
        </Box>
      </Box>
    </Box>
  )
}