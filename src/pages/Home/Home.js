import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import '../../styles/Home.css'

const Home = () => {
  const navigate = useNavigate()

  const handleShopNow = () => {
    navigate('/products')
  }

  return (
    <div>
      <Navbar />
      
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to MiniMart</h1>
          <p>Your one-stop shop for fresh groceries and daily essentials</p>
          <button className="shop-now-btn" onClick={handleShopNow}>Shop Now</button>
        </div>
      </section>

      <section className="features-section">
        <div className="features-content">
          <h2>Why Choose MiniMart?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-emoji">🥬</div>
              <h3>Fresh Products</h3>
              <p>Farm-fresh vegetables, fruits, and dairy products delivered daily</p>
            </div>
            <div className="feature-card">
              <div className="feature-emoji">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive prices with regular discounts and offers</p>
            </div>
            <div className="feature-card">
              <div className="feature-emoji">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery to your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      <section className="popular-section">
        <div className="popular-content">
          <h2>Popular Products</h2>
          <div className="popular-grid">
            {[
              { name: 'Fresh Milk', price: 65, emoji: '🥛' },
              { name: 'Whole Wheat Bread', price: 35, emoji: '🍞' },
              { name: 'Farm Fresh Eggs', price: 120, emoji: '🥚' },
              { name: 'Red Apples', price: 80, emoji: '🍎' }
            ].map((product, index) => (
              <div key={index} className="popular-item">
                <div className="popular-emoji">{product.emoji}</div>
                <h3>{product.name}</h3>
                <p className="popular-price">₹{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home