import Header from '~/components/Header/Header'
import styles from './Admin.module.scss'
import Nav from '~/components/Nav/Nav'
function Admin() {
  return (
    <div className={styles.container}>
      <Header />
      <Nav />
    </div>
  )
}

export default Admin
