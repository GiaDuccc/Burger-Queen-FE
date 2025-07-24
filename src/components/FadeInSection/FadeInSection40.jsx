import React, { useRef, useEffect, useState } from 'react'

function FadeInSection40({ children, delay = 0 }) {
  const domRef = useRef()
  const [isVisible, setVisible] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio >= 0.4) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    if (domRef.current) observer.observe(domRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible && delay > 0) {
      const timer = setTimeout(() => {
        setShouldShow(true)
      }, delay)
      return () => clearTimeout(timer)
    } else if (isVisible) {
      setShouldShow(true)
    }
  }, [isVisible, delay])

  const finalVisible = delay > 0 ? shouldShow : isVisible

  return (
    <div
      ref={domRef}
      style={{
        opacity: finalVisible ? 1 : 0,
        transform: finalVisible ? 'none' : 'translateY(40px)',
        transition: 'opacity 0.7s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)'
      }}
    >
      {children}
    </div>
  )
}

export default FadeInSection40
