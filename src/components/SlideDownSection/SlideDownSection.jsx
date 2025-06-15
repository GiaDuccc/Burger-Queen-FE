import React, { useRef, useEffect, useState } from 'react'

function SlideDownSection({ children }) {
  const domRef = useRef()
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio >= 0.2) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    if (domRef.current) observer.observe(domRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={domRef}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-40px)',
        transition: 'transform 0.6s cubic-bezier(0.42, 0, 0.58, 1)'
      }}
    >
      {children}
    </div>
  )
}

export default SlideDownSection
