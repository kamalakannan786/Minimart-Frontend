import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import '../../styles/OrderSuccess.css'

const OrderSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const orderData = location.state

  return (
    <div>
      <Navbar />
      <div className="order-success-container">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
          
          {orderData && (
            <div className="order-details">
              <h3>Order Summary</h3>
              <div className="order-info">
                <p><strong>Order ID:</strong> #{orderData.orderId}</p>
                <p><strong>Total Amount:</strong> ₹{orderData.total}</p>
                <p><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
                <p><strong>Items:</strong> {orderData.itemCount} items</p>
              </div>
            </div>
          )}
          
          <div className="action-buttons">
            <button 
              onClick={() => navigate('/products')}
              className="continue-btn"
            >
              Continue Shopping
            </button>
            <button 
              onClick={() => navigate('/')}
              className="home-btn"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess