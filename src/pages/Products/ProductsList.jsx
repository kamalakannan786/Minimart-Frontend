import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import apiService from '../../services/api'
import { useCart } from '../../context/CartContext'
import '../../styles/ProductsList.css'

const ProductsList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showMenu, setShowMenu] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await apiService.getProducts(selectedCategory)
      setProducts(response.products)
      setError('')
    } catch (error) {
      console.error('API Error:', error)
      // Fallback to static products
      const fallbackProducts = [
        { _id: '1', name: 'Fresh Milk', price: 65, category: 'Dairy', emoji: '🥛', description: 'Pure and fresh milk from local farms', stock: 50 },
        { _id: '2', name: 'Whole Wheat Bread', price: 35, category: 'Bakery', emoji: '🍞', description: 'Freshly baked whole wheat bread', stock: 30 },
        { _id: '3', name: 'Farm Fresh Eggs', price: 120, category: 'Dairy', emoji: '🥚', description: 'Free-range eggs from happy hens', stock: 100 },
        { _id: '4', name: 'Red Apples', price: 80, category: 'Fruits', emoji: '🍎', description: 'Crisp and sweet red apples', stock: 40 },
        { _id: '5', name: 'Bananas', price: 40, category: 'Fruits', emoji: '🍌', description: 'Ripe yellow bananas', stock: 60 },
        { _id: '6', name: 'Basmati Rice', price: 150, category: 'Grains', emoji: '🍚', description: 'Premium quality basmati rice', stock: 25 },
        { _id: '7', name: 'Fresh Tomatoes', price: 60, category: 'Vegetables', emoji: '🍅', description: 'Juicy red tomatoes', stock: 45 },
        { _id: '8', name: 'Green Spinach', price: 25, category: 'Vegetables', emoji: '🥬', description: 'Fresh leafy green spinach', stock: 35 }
      ]
      
      const filteredProducts = selectedCategory === 'All' 
        ? fallbackProducts 
        : fallbackProducts.filter(product => product.category === selectedCategory)
      
      setProducts(filteredProducts)
      setError('Using demo products (API connection issue)')
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', 'Dairy', 'Bakery', 'Fruits', 'Grains', 'Vegetables']

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiService.deleteProduct(productId)
        fetchProducts()
        setShowMenu(null)
      } catch (error) {
        alert('Failed to delete product')
      }
    }
  }

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`)
    setShowMenu(null)
  }

  return (
    <div>
      <Navbar />
      
      <section className="products-header">
        <div className="products-header-content">
          <h1>Our Products</h1>
          <p>Fresh, quality products for your daily needs</p>
        </div>
      </section>

      <section className="filter-section">
        <div className="filter-content">
          <h3>Shop by Category</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <button 
                key={category} 
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : 'inactive'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="products-grid-section">
        <div className="products-grid-content">
          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Loading products...</p>
            </div>
          )}
          
          {error && (
            <div style={{ textAlign: 'center', padding: '10px', color: '#f39c12', fontSize: '0.9rem' }}>
              <p>{error}</p>
            </div>
          )}
          
          {!loading && (
            <div className="products-grid">
              {products.map(product => (
                <div 
                  key={product._id || product.id} 
                  className="product-card"
                  onClick={() => navigate(`/product/${product._id || product.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="product-emoji">
                    {product.emoji}
                  </div>
                  <div className="product-info">
                    <div className="product-header">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-actions">
                        <span className="category-badge">{product.category}</span>
                        <div className="menu-container">
                          <button 
                            onClick={() => setShowMenu(showMenu === (product._id || product.id) ? null : (product._id || product.id))}
                            className="menu-btn"
                          >
                            ⋮
                          </button>
                          {showMenu === (product._id || product.id) && (
                            <div className="dropdown-menu">
                              <button 
                                onClick={() => handleEdit(product._id || product.id)}
                                className="menu-item edit"
                              >
                                ✏️ Edit
                              </button>
                              <button 
                                onClick={() => handleDelete(product._id || product.id)}
                                className="menu-item delete"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <span className="product-price">₹{product.price}</span>
                      <button 
                        className="add-cart-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                          alert('Added to cart!')
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="add-product-section">
        <div className="add-product-content">
          <h2>Want to Add Your Product?</h2>
          <p>Join our marketplace and reach more customers</p>
          <button onClick={() => navigate('/add-product')} className="add-product-link" style={{ background: '#3498db', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600' }}>
            Add Product
          </button>
        </div>
      </section>
    </div>
  )
}

export default ProductsList