import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useOrders } from '../../context/OrdersContext'
import Navbar from '../../components/Navbar'
import '../../styles/Payment.css'

const Payment = () => {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { addOrder } = useOrders()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    
    // Simulate payment processing
    setTimeout(() => {
      const orderData = {
        orderId: Date.now(),
        total: getCartTotal() + 50,
        paymentMethod: paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery',
        itemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
        items: cartItems
      }
      
      addOrder(orderData)
      clearCart()
      navigate('/order-success', { state: orderData })
      setLoading(false)
    }, 2000)
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="payment-empty">
          <h1>No Items to Pay</h1>
          <button onClick={() => navigate('/products')} className="shop-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="payment-container">
        <div className="payment-content">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item._id} className="order-item">
                  <span className="item-emoji">{item.emoji}</span>
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity} × ₹{item.price}</p>
                  </div>
                  <span className="item-total">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="total-row">
                <span>Delivery:</span>
                <span>₹50</span>
              </div>
              <div className="total-row final">
                <span>Total:</span>
                <span>₹{getCartTotal() + 50}</span>
              </div>
            </div>
          </div>

          <div className="payment-form">
            <h2>Payment Details</h2>
            
            <div className="payment-methods">
              <label className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  value="card" 
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                💳 Credit/Debit Card
              </label>
              
              <label className={`payment-option ${paymentMethod === 'upi' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  value="upi" 
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                📱 UPI
              </label>
              
              <label className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  value="cod" 
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                💰 Cash on Delivery
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-form">
                <input type="text" placeholder="Card Number" className="form-input" />
                <div className="card-row">
                  <input type="text" placeholder="MM/YY" className="form-input" />
                  <input type="text" placeholder="CVV" className="form-input" />
                </div>
                <input type="text" placeholder="Cardholder Name" className="form-input" />
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="upi-form">
                <input type="text" placeholder="UPI ID" className="form-input" />
              </div>
            )}

            <div className="payment-actions">
              <button onClick={() => navigate('/cart')} className="back-btn">
                Back to Cart
              </button>
              <button 
                onClick={handlePayment} 
                className="pay-btn"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay ₹${getCartTotal() + 50}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment