import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import apiService from '../../services/api'
import { useCart } from '../../context/CartContext'
import '../../styles/ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await apiService.getProduct(id)
      setProduct(response.product)
    } catch (error) {
      setError('Product not found')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    alert(`Added ${quantity} ${product.name}(s) to cart!`)
  }

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    navigate('/payment')
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading-container">
          <p>Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div>
        <Navbar />
        <div className="error-container">
          <h2>Product Not Found</h2>
          <button onClick={() => navigate('/products')} className="back-btn">
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="product-detail-container">
        <button onClick={() => navigate('/products')} className="back-btn">
          ← Back to Products
        </button>

        <div className="product-detail-content">
          <div className="product-image-section">
            <div className="product-emoji-large">
              {product.emoji}
            </div>
            <div className="product-category-badge">
              {product.category}
            </div>
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            
            <div className="product-details">
              <div className="detail-item">
                <span className="detail-label">Price:</span>
                <span className="detail-value price">₹{product.price}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Stock:</span>
                <span className="detail-value">{product.stock} available</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{product.category}</span>
              </div>
            </div>

            <div className="purchase-section">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  onClick={handleAddToCart}
                  className="add-to-cart-btn"
                  disabled={product.stock === 0}
                >
                  Add to Cart - ₹{product.price * quantity}
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="buy-now-btn"
                  disabled={product.stock === 0}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail