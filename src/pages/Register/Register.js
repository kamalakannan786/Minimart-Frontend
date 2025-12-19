import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import apiService from '../../services/api'
import '../../styles/Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await apiService.register(formData)
      alert('Registration successful! Please login with your credentials.')
      navigate('/login')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="register-container">
        <div className="register-card">
          <h2>Create Account</h2>
          
          {error && (
            <div style={{ background: '#e74c3c', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="register-form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div className="register-form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div className="register-form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="register-btn"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>
          
          <p className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register