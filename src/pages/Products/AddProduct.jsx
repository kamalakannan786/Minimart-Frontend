import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import apiService from '../../services/api'
import '../../styles/AddProduct.css'

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      await apiService.createProduct({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description || `Fresh ${product.name.toLowerCase()} from our store`,
        stock: product.stock
      })
      
      alert('Product added successfully!')
      navigate('/products')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="add-product">
        <h1>Add Product</h1>
        
        {error && (
          <div style={{ background: '#e74c3c', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Product Name:</label>
            <input 
              type="text" 
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.target.value})}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Price (₹):</label>
            <input 
              type="number" 
              value={product.price}
              onChange={(e) => setProduct({...product, price: e.target.value})}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Stock:</label>
            <input 
              type="number" 
              value={product.stock}
              onChange={(e) => setProduct({...product, stock: e.target.value})}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Category:</label>
            <select 
              value={product.category}
              onChange={(e) => setProduct({...product, category: e.target.value})}
              required
              className="form-input"
            >
              <option value="">Select Category</option>
              <option value="Dairy">Dairy</option>
              <option value="Bakery">Bakery</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
              <option value="Vegetables">Vegetables</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Description (Optional):</label>
            <textarea 
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
              className="form-input"
              rows="3"
              placeholder="Enter product description..."
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct