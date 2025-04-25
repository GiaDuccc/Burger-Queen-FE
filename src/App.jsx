import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import NikePage from './pages/NikePage/NikePage'
import AdidasPage from './pages/AdidasPage/AdidasPage'
import NewBalance from './pages/NewBalancePage/NewBalance'
import ConversePage from './pages/ConversePage/ConversePage'
import PumaPage from './pages/PumaPage/PumaPage'
import ProductPage from './pages/ProductPage/ProductPage'
import BitisPage from './pages/BitisPage/BitisPage'
import Dashboard from './pages/Dashboard/Dashboard'


function App() {
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
        <Route path='/:customerId' element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
