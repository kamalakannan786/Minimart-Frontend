import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth()
  const { getCartCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: '#2c3e50', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '1.8rem' }}>🛒 MiniMart</Link>
      
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1rem' }}>Home</Link>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1rem' }}>Products</Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1rem' }}>About</Link>
        <Link to="/contact" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1rem' }}>Contact</Link>
        <Link to="/orders" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1rem' }}>Orders</Link>
        
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1rem', position: 'relative' }}>
           Cart
          {getCartCount() > 0 && (
            <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#e74c3c', color: 'white', borderRadius: '50%', width: '20px', height: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {getCartCount()}
            </span>
          )}
        </Link>
        
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', fontWeight: '500' }}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ background: '#3498db', color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '5px', fontWeight: '500' }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar