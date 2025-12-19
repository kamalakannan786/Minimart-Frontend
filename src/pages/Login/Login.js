import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Navbar from '../../components/Navbar'
import '../../styles/Login.css'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}')
    
    if (credentials.email === registeredUser.email && credentials.password === registeredUser.password) {
      login()
      navigate('/')
    } else {
      alert('Invalid credentials!')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>
            
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          
          <p className="register-link">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login