import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Admin from './pages/Admin/Admin'
import './App.scss'
import Menu from './pages/Admin/Menu/Menu'
import Branch from './pages/Admin/Branch/Branch'
import SignIn from './pages/Admin/SignIn/SignIn'
import { ToastContainer, Slide, Zoom, Flip, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/menu" element={<Menu />} />
        <Route path="/admin/branches" element={<Branch />} />
        <Route path="/admin/sign-in" element={<SignIn />} />
      </Routes>

      <ToastContainer 
        position='bottom-right'
        pauseOnHover
        toastClassName='custom-toast'
        theme='colored'
        transition={Flip}
      />
    </Router>
  )
}

export default App
