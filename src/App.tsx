import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Admin from './pages/Admin/Admin'
import './App.scss'
import Menu from './pages/Admin/Menu/Menu'
import Branch from './pages/Admin/Branch/Branch'
import SignIn from './pages/Admin/SignInAdmin/SignInAdmin'
import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/sign-in" element={<SignIn />} />
        <Route path="/admin" element={<Admin />} >
          <Route path="menu" element={<Menu />} />
          <Route path="branches" element={<Branch />} />
        </Route>
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
