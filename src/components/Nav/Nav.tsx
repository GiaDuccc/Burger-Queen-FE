import { useState } from 'react'
import styles from './Nav.module.scss'
import rightArrowBlackIcon from '~/assets/rightArrowBlack.png'
import rightArrowWhiteIcon from '~/assets/rightArrowWhite.png'
import downArrowBlackIcon from '~/assets/downArrowWhite.png'

interface SubMenuItem {
  id: string
  title: string
  url?: string
}

interface MenuItem {
  id: string
  title: string
  url?: string
  icon?: string
  subItems?: SubMenuItem[]
}

function Nav() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Mock data cho navigation
  const navItems: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      url: '/dashboard',
      icon: '📊'
    },
    {
      id: 'menu',
      title: 'Menu',
      url: 'menu',
      icon: '🍔'
    },
    {
      id: 'branches',
      title: 'Branches',
      icon: '👥',
      url: 'branch',
    },
    {
      id: 'customers',
      title: 'Customers',
      url: 'customer',
      icon: '👤'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      subItems: [
        { id: 'general-settings', title: 'General Settings', url: '/settings/general' },
        { id: 'payment-settings', title: 'Payment Settings', url: '/settings/payment' },
        { id: 'notification-settings', title: 'Notifications', url: '/settings/notifications' },
        { id: 'security-settings', title: 'Security', url: '/settings/security' }
      ]
    }
  ]

  const toggleDropdown = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId)
  }

  const renderNavItem = (item: MenuItem) => {
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isActive = activeDropdown === item.id
    const isHovered = hoveredItem === item.id

    // Determine which arrow to show
    const getArrowIcon = () => {
      if (isActive) {
        return downArrowBlackIcon // Down arrow when active
      }
      if (isHovered) {
        return rightArrowWhiteIcon // White right arrow when hovered
      }
      return rightArrowBlackIcon // Default black right arrow
    }

    return (
      <li key={item.id} className={styles.navItem}>
        <a
          href={`/admin/${item.url}` || "#"}
          className={`${styles.navLink} ${hasSubItems ? styles.hasDropdown : ''} ${isActive ? styles.active : ''}`}
          onMouseEnter={() => hasSubItems && setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={(e) => {
            if (hasSubItems) {
              e.preventDefault()
              toggleDropdown(item.id)
            }
          }}
        >
          <span className={styles.navContent}>
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            {item.title}
          </span>
          {hasSubItems && (
            <span className={styles.arrowContainer}>
              <img
                src={getArrowIcon()}
                alt="arrow"
                className={styles.arrow}
              />
            </span>
          )}
        </a>

        {hasSubItems && (
          <ul className={`${styles.dropdown} ${activeDropdown === item.id ? styles.active : ''}`}>
            {item.subItems!.map((subItem) => (
              <li
                key={subItem.id} className={styles.dropdownItem}
              >
                <p className={styles.dropdownLink}>
                  {subItem.title}
                </p>
              </li>
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map(renderNavItem)}
        </ul>
      </nav>
    </div>
  )
}

export default Nav
