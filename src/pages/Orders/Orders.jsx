import { useOrders } from '../../context/OrdersContext'
import Navbar from '../../components/Navbar'
import '../../styles/Orders.css'

const Orders = () => {
  const { orders } = useOrders()

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return '#f39c12'
      case 'Shipped': return '#3498db'
      case 'Delivered': return '#27ae60'
      case 'Cancelled': return '#e74c3c'
      default: return '#95a5a6'
    }
  }

  if (orders.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="orders-empty">
          <h1>No Orders Yet</h1>
          <p>You haven't placed any orders yet.</p>
          <a href="/products" className="shop-btn">Start Shopping</a>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="orders-container">
        <h1>My Orders</h1>
        
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.orderId} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.orderId}</h3>
                  <p>Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div 
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status}
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map(item => (
                  <div key={item._id} className="order-item">
                    <span className="item-emoji">{item.emoji}</span>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity} × ₹{item.price}</p>
                    </div>
                    <span className="item-total">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <div className="order-summary">
                  <p><strong>Payment:</strong> {order.paymentMethod}</p>
                  <p><strong>Total:</strong> ₹{order.total}</p>
                  {order.status !== 'Delivered' && (
                    <p><strong>Expected Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders