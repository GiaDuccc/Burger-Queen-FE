import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage_v2'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import NikePage from './pages/NikePage/NikePage_v2'
import AdidasPage from './pages/AdidasPage/AdidasPage'
import NewBalance from './pages/NewBalancePage/NewBalance'
import ConversePage from './pages/ConversePage/ConversePage'
import PumaPage from './pages/PumaPage/PumaPage'
// import ProductPage from '~/pages/ProductPage/ProductPage_v1'
import ProductPage from './pages/ProductPage/ProducePage_v2'
import BitisPage from './pages/BitisPage/BitisPage'
import Profile from './pages/Profile/Profile'
import Checkout from './pages/Checkout/Checkout'
import Admin from './pages/Admin/Admin'
import { fetchCustomerDetailAPI } from './apis'
import { useEffect } from 'react'


function App() {

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      const fetchCustomerDetail = async () => {
        await fetchCustomerDetailAPI(user._id).then(data => {
          if (data.role !== user.role) localStorage.removeItem('user')
        })
      }
      fetchCustomerDetail()
    }

  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/nike' element={<NikePage />} />
        <Route path='/adidas' element={<AdidasPage />} />
        <Route path='/puma' element={<PumaPage />} />
        <Route path='/newbalance' element={<NewBalance />} />
        <Route path='/converse' element={<ConversePage />} />
        <Route path='/bitis' element={<BitisPage />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
