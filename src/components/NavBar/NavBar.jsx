import { useEffect, useState } from 'react'
import { getTypeAndNavbarImageFromBrand } from '~/apis'
import '~/App.css'
import FadeInSection from '../FadeInSection/FadeInSection60'

function NavBar({ scrollToSection, setTypes, brand }) {

  const [typesAndNavbarImages, setTypesAndNavbarImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTypeAndNavbarImage = async () => {
    await getTypeAndNavbarImageFromBrand(brand).then(data => {
      setTypesAndNavbarImages(data.sort())
      setTypes(data.map(type => type.type))
      setIsLoading(false)
    })
  }

  useEffect(() => {
    setIsLoading(true)
    fetchTypeAndNavbarImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className='fade-in-up'
      style={{
        display: 'flex',
        gap: '80px',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        background: '#fafafc',
        position: 'relative',
        // padding: '16px 0',
        height: '112px'
      }}
    >
      {typesAndNavbarImages.length > 0 ? typesAndNavbarImages.map((item, index) => (
        <FadeInSection key={index} delay={index * 100} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            onClick={() => scrollToSection(item.type)}
            key={index} style={{
              display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s cubic-bezier(0.42, 0, 0.58, 1)',
              cursor: 'pointer',
              '&:hover div ': {
                transform: 'scale(1.1)',
                transformOrigin: 'center'
              }
            }}>
            <div style={{ mb: '8px', transition: 'all 0.2s cubic-bezier(0.42, 0, 0.58, 1)' }}>
              <img
                src={item.navbarImage}
                style={{ width: '70px' }}
              />
            </div>
            <span style={{ color: '#000' }} >{item.type.slice(0, 1).toUpperCase() + item.type.slice(1)}</span>
          </div>
        </FadeInSection>
      )) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flex: 8 }}>
          <div className='spinner-black' style={{ width: '40px', height: '40px', border: '1px solid rgba(104, 104, 104, 0.332)', borderTopColor: '#080808' }}></div>
        </div>
      )}
    </div>
  )
}

export default NavBar