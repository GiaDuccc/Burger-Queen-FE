import Header from '~/components/Header/Header'
import styles from './Admin.module.scss'
import Nav from '~/components/Nav/Nav'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
function Admin() {

  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem('accessTokenAdmin');
    if (!token) {
      navigate('/admin/sign-in', { replace: true });
    }

  }, [navigate]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.layout}>
        <Nav />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Admin
