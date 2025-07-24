import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import playIcon from '~/assets/play-white.png'
import pauseIcon from '~/assets/pause-white.png'
import FadeInSection from '../FadeInSection/FadeInSection40'


export default function HeroSection({ video, title, descTitle, type }) {

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

  const pathName = window.location.pathname

  useEffect(() => {
    if (type === 'img') return

    const videoObserver = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { threshold: 0.6 })

    if (videoRef.current) {
      videoObserver.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        videoObserver.unobserve(videoRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (type === 'img') return

    const saved = sessionStorage.getItem('scrollY')
    let scroll = 0
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && parsed.pathName === pathName) {
          scroll = parseFloat(parsed.scrollY) || 0
        }
      } catch {
        scroll = parseFloat(saved) || 0
      }
    }
    let newScale = Math.max(0.88, 1 - scroll / 4.7 / 1000)
    let newBorderRadius = Math.min(52, scroll / 14)
    if (scroll < 30) {
      newScale = 1
      newBorderRadius = 0
    }
    setScale(newScale)
    setBorderRadius(`${newBorderRadius}px`)

    const handleScroll = () => {
      if (!isVisible) return

      const scrollY = window.scrollY
      sessionStorage.setItem('scrollY', JSON.stringify({
        pathName: pathName,
        scrollY: scrollY
      }))

      let newScale = Math.max(0.88, 1 - scrollY / 4.7 / 1000)
      let newBorderRadius = Math.min(52, scrollY / 14)

      setScale(newScale)
      setBorderRadius(`${newBorderRadius}px`)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible, pathName])


  return (
    <Box sx={{ width: '100%' }} >
      <FadeInSection delay={500}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'rgba(0,0,0,.85)', p: '64px 92px ', height: '200px' }} >
          <Typography variant='h1' sx={{ fontSize: '52px', fontWeight: '650' }}>{title.toUpperCase()}</Typography>
          <Typography variant='h1' sx={{ fontSize: '32px', fontWeight: '600' }} >
            <span style={{ width: '300px' }}>{descTitle}</span>
          </Typography>
        </Box>
      </FadeInSection>
      <FadeInSection delay={800}>
        <Box
          sx={{
            position: 'relative',
            top: 0,
            overflow: 'hidden',
            zIndex: 0,
            width: '100%',
            height: '90vh',
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            borderRadius,
            transition: 'transform 0.2 cubic-bezier(0.42, 0, 0.58, 1), border-radius 0.2s cubic-bezier(0.42, 0, 0.58, 1)'
          }}
        >
          {/* Video */}
          {type === 'video' ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              src={video}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                overflowY: 'hidden',
                border: 'none'
              }}
              onClick={togglePlayVideo}
            />
          ) : (
            <Box
              component="img"
              src={video}
              alt={title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                overflowY: 'hidden',
                border: 'none'
              }}
            />
          )}
          <Box
            sx={{
              position: 'absolute',
              top: '89%',
              right: '4%',
              bgcolor: '#333336',
              width: '40px',
              height: '40px',
              borderRadius: '40px',
              display: type === 'img' ? 'none' : 'flex',
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
              <img src={pauseIcon} style={{ width: '16px', height: '16px' }} />
              :
              <img src={playIcon} style={{ width: '16px', height: '16px' }} />
            }
          </Box>
        </Box>
      </FadeInSection>
    </Box>
  )
}