import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header-left">
        <h1>Admin Dashboard</h1>
        <span className="header-subtitle">Anxio Expert Management</span>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  )
}

export default Header