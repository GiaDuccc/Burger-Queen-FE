import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage_v2'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import NikePage from './pages/NikePage/NikePage_v2'
import AdidasPage from './pages/AdidasPage/AdidasPage'
import NewBalance from './pages/NewBalancePage/NewBalance'
import PumaPage from './pages/PumaPage/PumaPage'
import ProductPage from './pages/ProductPage/ProducePage_v2'
import Profile from './pages/Profile/Profile'
import Checkout from './pages/Checkout/Checkout'
import Admin from './pages/Admin/Admin'
import { fetchCustomerDetailAPI } from './apis'
import { useEffect } from 'react'
import VansPage from './pages/VansPage/VansPage'
import BalenciagaPage from './pages/BalenciagaPage/BalenciagaPage'
import Chatbot from './components/Chatbot/Chatbot'


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

  const AppRouter = () => {
    const location = useLocation()
    const notShowChatbot = ['/admin', '/sign-in', '/sign-up', '/checkout'].includes(location.pathname)

    return (
      <>
        {!notShowChatbot && <Chatbot />}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/nike' element={<NikePage />} />
          <Route path='/adidas' element={<AdidasPage />} />
          <Route path='/puma' element={<PumaPage />} />
          <Route path='/new-balance' element={<NewBalance />} />
          <Route path='/vans' element={<VansPage />} />
          <Route path='/balenciaga' element={<BalenciagaPage />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </>
    )
  }

  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

export default App
