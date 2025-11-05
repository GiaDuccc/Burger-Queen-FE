import styles from './Header.module.scss';
import logoChu from '~/assets/logo-chu.png'
import moreIcon from '~/assets/more.png'
import searchIcon from '~/assets/search.png'
import notificationIcon from '~/assets/notification.png'
import profileMoreIcon from '~/assets/threeDotHorizontal.png'
import { useEffect, useState } from 'react';
import { myInfo } from '~/apis/adminAPI/authAPI/authAPI';
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
  // const [isActiveProfileMore, setIsActiveProfileMore] = useState(false);

  const [profile, setProfile] = useState<Profile | null>(null);

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
            <div className={styles.avatarDiv}>
              <img src={profile?.avatarUrl} alt="profilePicIcon" className={styles.avatar} />
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
