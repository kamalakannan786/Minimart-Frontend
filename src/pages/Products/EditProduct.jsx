import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import apiService from '../../services/api'
import '../../styles/AddProduct.css'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fetchLoading, setFetchLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await apiService.getProduct(id)
      const p = response.product
      setProduct({
        name: p.name,
        price: p.price,
        stock: p.stock,
        category: p.category,
        description: p.description || ''
      })
    } catch (error) {
      setError('Failed to fetch product')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      await apiService.updateProduct(id, product)
      alert('Product updated successfully!')
      navigate('/products')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading product...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="add-product">
        <h1>Edit Product</h1>
        
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
            <label>Description:</label>
            <textarea 
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
              className="form-input"
              rows="3"
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Updating Product...' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProduct