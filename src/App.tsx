import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Admin from './pages/Admin/Admin'
import './App.scss'
import Menu from './pages/Admin/Menu/Menu'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/menu" element={<Menu />} />
      </Routes>
    </Router>
  )
}

export default App
