import { useState } from 'react'
import styles from './Nav.module.scss'
import rightArrowBlackIcon from '~/assets/rightArrowBlack.png'
import rightArrowWhiteIcon from '~/assets/rightArrowWhite.png'
import downArrowBlackIcon from '~/assets/downArrowWhite.png'
import { useNavigate } from 'react-router-dom'

interface SubMenuItem {
  id: string
  title: string
  url?: string}

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
  // const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Mock data cho navigation
  const navItems: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      url: 'dashboard',
      icon: '📊'
    },
    {
      id: 'menu',
      title: 'Menu',
      icon: '🍔',
      subItems: [
        { id: 'burger', title: 'Burger'},
        { id: 'chips', title: 'Chips' },
        { id: 'drink', title: 'Drink'},
        { id: 'chicken', title: 'Chicken'},
        { id: 'combo', title: 'Combo'}
      ]
    },
    {
      id: 'branches',
      title: 'Branches',
      icon: '👥',
      subItems: [
        { id: 'employees', title: 'Employees', url: 'management/employees' },
        { id: 'branches', title: 'Branches', url: 'management/branches' },
        { id: 'companies', title: 'Companies', url: 'management/companies' },
        { id: 'roles', title: 'Roles & Permissions', url: 'management/roles' }
      ]
    },
    {
      id: 'orders',
      title: 'Orders',
      url: '/orders',
      icon: '📋',
      subItems: [
        { id: 'pending-orders', title: 'Pending Orders', url: 'orders/pending' },
        { id: 'completed-orders', title: 'Completed Orders', url: 'orders/completed' },
        { id: 'cancelled-orders', title: 'Cancelled Orders', url: 'orders/cancelled' }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: '📈',
      subItems: [
        { id: 'sales-report', title: 'Sales Report', url: '/analytics/sales' },
        { id: 'customer-report', title: 'Customer Report', url: '/analytics/customers' },
        { id: 'inventory-report', title: 'Inventory Report', url: '/analytics/inventory' }
      ]
    },
    {
      id: 'inventory',
      title: 'Inventory',
      url: '/inventory',
      icon: '📦'
    },
    {
      id: 'customers',
      title: 'Customers',
      url: '/customers',
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

  const subItemClick = (subItemId: string) => {
    navigate(`/admin/menu?type=${subItemId}`)
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
          href={item.url || "#"}
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
                onClick= {() => subItemClick(subItem.id)}
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
    <div className={styles.nav}>
      <ul className={styles.navList}>
        {navItems.map(renderNavItem)}
      </ul>
    </div>
  )
}

export default Nav
