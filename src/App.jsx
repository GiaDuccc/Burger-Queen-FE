import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Login from './pages/Login/Login'
import NikePage from './pages/NikePage/NikePage'
import AdidasPage from './pages/AdidasPage/AdidasPage'
import VansPage from './pages/VansPage/VansPage'
import ConversePage from './pages/ConversePage/ConversePage'
import PumaPage from './pages/PumaPage/PumaPage'
import ProductPage from './pages/ProductPage/ProductPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/ProductPage' element={<ProductPage />} />
        <Route path='/NikePage' element={<NikePage />} />
        <Route path='/AdidasPage' element={<AdidasPage />} />
        <Route path='/PumaPage' element={<PumaPage />} />
        <Route path='/VansPage' element={<VansPage />} />
        <Route path='/ConversePage' element={<ConversePage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
