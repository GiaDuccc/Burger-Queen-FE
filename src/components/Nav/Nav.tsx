import { useState } from 'react'
import styles from './Nav.module.scss'
import rightArrowBlackIcon from '~/assets/rightArrowBlack.png'
import rightArrowWhiteIcon from '~/assets/rightArrowWhite.png'
import downArrowBlackIcon from '~/assets/downArrowWhite.png'
import { jwtDecode } from 'jwt-decode'
import { Link } from 'react-router-dom'

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
  const employee = jwtDecode(localStorage.getItem('accessTokenAdmin') || '') as { employeeId: string; branchId: string; role: string };

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
      id: 'customers',
      title: 'Customers',
      url: 'customer',
      icon: '👤'
    },
    {
      id: 'employees',
      title: 'Employees',
      url: 'employee',
      icon: '👤'
    }
  ];
  if (employee.role === 'manager') {
    navItems.push({
        id: 'branches',
        title: 'Branches',
        icon: '👥',
        url: 'branch',
      })
  }

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
        <Link
          to={`${item.url || '#'}`}
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
        </Link>
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
