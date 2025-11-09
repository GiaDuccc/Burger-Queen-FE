import styles from './Header.module.scss';
import logoChu from '~/assets/logo-chu.png'
import moreIcon from '~/assets/more.png'
import searchIcon from '~/assets/search.png'
import notificationIcon from '~/assets/notification.png'
import profileMoreIcon from '~/assets/threeDotHorizontal.png'
import signOutIcon from '~/assets/signOut.png'
import profileIcon from '~/assets/profileIcon.png'
import { useEffect, useState } from 'react';
import { myInfo, signOutAdmin } from '~/apis/adminAPI/authAPI/authAPI';
import { toast } from 'react-toastify';
interface Profile {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  userType: string;
  avatarUrl: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

function Header() {

  // const [isActiveMore, setIsActiveMore] = useState(false);
  // const [isActiveSearch, setIsActiveSearch] = useState(false);
  // const [isActiveNotification, setIsActiveNotification] = useState(false);
  const [isActiveProfile, setIsActiveProfile] = useState(false);

  const [profile, setProfile] = useState<Profile | null>(null);

  const handleSignOut = async () => {
    await signOutAdmin()
      .then((data) => {
        toast.success(data.message);
        localStorage.removeItem('accessTokenAdmin');
        window.location.href = '/admin/sign-in';
      })
      .catch(() => {
        toast.error('Sign out failed. Please try again.');
      })
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await myInfo();
        setProfile(data);
      } catch (error) {
        toast.error('Failed to fetch profile information.');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.subHeaderContainer1}>
        <header className={styles.header1}>
          <div className={styles.logoDiv}>
            <img src={logoChu} alt="Logo" className={styles.logo} />
          </div>
          <div className={styles.button}>
            <img src={moreIcon} alt="moreIcon" className={styles.buttonIcon} />
          </div>
        </header>
      </div>
      <div className={styles.subHeaderContainer2}>
        <header className={styles.header2}>
          <div className={styles.searchDiv}>
            <div
              className={styles.button}
            >
              <img src={searchIcon} alt="searchIcon" className={styles.buttonIcon} />
            </div>
            <input className={styles.searchInput} placeholder='Search now' />
          </div>
          <div className={styles.profileDiv}>
            <div className={`${styles.button}`}>
              <img src={notificationIcon} alt="notificationIcon" className={styles.buttonIcon} />
            </div>
            <div
              className={styles.avatarDiv}
              onClick={() => setIsActiveProfile(!isActiveProfile)}
              onBlur={() => setIsActiveProfile(false)}
              tabIndex={0}
            >
              <img src={profile?.avatarUrl} alt="profilePicIcon" className={styles.avatar} />
              {isActiveProfile && (
                <ul className={styles.profileDropdown}>
                  <li>
                    <img src={profileIcon} alt="profileIcon" />
                    Profile
                  </li>
                  <li onClick={handleSignOut}>
                    <img src={signOutIcon} alt="signOutIcon" />
                    Sign out
                  </li>
                </ul>
              )}
            </div>
            <div className={`${styles.button}`}>
              <img src={profileMoreIcon} alt="threeDotHorizontalIcon" className={styles.buttonIcon} />
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}

export default Header
