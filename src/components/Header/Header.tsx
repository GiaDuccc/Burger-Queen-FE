import styles from './Header.module.scss';
import logoChu from '~/assets/logo-chu.png'
import moreIcon from '~/assets/more.png'
import searchIcon from '~/assets/search.png'
import notificationIcon from '~/assets/notification.png'
import profilePicIcon from '~/assets/profile.png'
import threeDotHorizontalIcon from '~/assets/threeDotHorizontal.png'

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logoDiv}>
        <img src={logoChu} alt="Logo" style={{ height: "100%" }} />
      </div>
      <div className={styles.searchAndProfile}>
        <div className={styles.searchBox}>
          <span className={styles.moreIcon}><img src={moreIcon} alt="More" style={{ width: '20px', height: '20px', opacity: 0.6 }} /></span>
          <div className={styles.search}>
            <span className={styles.searchIcon}><img src={searchIcon} alt="Search" style={{ width: '20px', height: '20px', opacity: 0.6 }} /></span>
            <input className={styles.searchInput} type="text" placeholder="Search now" />
          </div>
        </div>
        <div className={styles.profileBox}>
          <span className={styles.notificationIcon}><img src={notificationIcon} alt="Notification" style={{ width: '22px', height: '22px', opacity: 0.6 }} /></span>
          <span className={styles.profilePic}><img src={profilePicIcon} alt="Profile" style={{ width: '40px', height: '40px' }} /></span>
          <span className={styles.threeDotHorizontalIcon}><img src={threeDotHorizontalIcon} alt="More Options" style={{ width: '20px', height: '20px', opacity: 0.6 }} /></span>
        </div>
      </div>
    </div>
  )
}

export default Header
