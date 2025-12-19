import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Navbar from '../../components/Navbar'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await login(credentials)
      if (response) {
        navigate('/')
      }
    } catch (error) {
      setError('Invalid email or password. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 40px' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50', fontSize: '2rem' }}>Welcome Back</h2>
          
          {error && (
            <div style={{ background: '#e74c3c', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50', fontWeight: '600' }}>Email</label>
              <input 
                type="email" 
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                required
                style={{ width: '100%', padding: '12px', border: '2px solid #ecf0f1', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
              />
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50', fontWeight: '600' }}>Password</label>
              <input 
                type="password" 
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
                style={{ width: '100%', padding: '12px', border: '2px solid #ecf0f1', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '12px', 
                background: loading ? '#bdc3c7' : '#3498db', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                cursor: loading ? 'not-allowed' : 'pointer' 
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#7f8c8d' }}>
            Don't have an account? <a href="/register" style={{ color: '#3498db', textDecoration: 'none' }}>Register here</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login