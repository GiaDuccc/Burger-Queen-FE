import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Admin from './pages/Admin/Admin'
import './App.scss'
import Menu from './pages/Admin/Menu/Menu'
import Branch from './pages/Admin/Branch/Branch'
import SignIn from './pages/Admin/SignInAdmin/SignInAdmin'
import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Customer from './pages/Admin/Customer/Customer'
import Employee from './pages/Admin/Employee/Employee'
import BranchDetail from './pages/Admin/Branch/BranchDetail/BranchDetail'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<PublicRoute />}>
          <Route path="/admin/sign-in" element={<SignIn />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} >
            <Route path="menu" element={<Menu />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="branch" element={<Branch />} />
            <Route path="branch/:branchId" element={<BranchDetail />} />
            <Route path="customer" element={<Customer />} />
            <Route path="employee" element={<Employee />} />
          </Route>
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
