import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import Navbar from '../../components/Navbar'
import '../../styles/Cart.css'

const Cart = () => {
  const navigate = useNavigate()
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="cart-empty">
          <h1>Your Cart is Empty</h1>
          <p>Add some products to get started!</p>
          <a href="/products" className="shop-btn">Continue Shopping</a>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button onClick={clearCart} className="clear-btn">Clear Cart</button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">
                <div className="item-info">
                  <span className="item-emoji">{item.emoji}</span>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <span className="item-price">₹{item.price}</span>
                  </div>
                </div>
                
                <div className="item-controls">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-total">
                    ₹{item.price * item.quantity}
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="remove-btn"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{getCartTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery:</span>
              <span>₹50</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{getCartTotal() + 50}</span>
            </div>
            <button 
              onClick={() => navigate('/payment')}
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart