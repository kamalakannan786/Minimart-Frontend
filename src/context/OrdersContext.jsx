import { createContext, useContext, useState, useEffect } from 'react'

const OrdersContext = createContext()

export const useOrders = () => useContext(OrdersContext)

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      status: 'Processing',
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    }
    setOrders(prev => [newOrder, ...prev])
    return newOrder
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => 
      prev.map(order => 
        order.orderId === orderId ? { ...order, status } : order
      )
    )
  }

  return (
    <OrdersContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus
    }}>
      {children}
    </OrdersContext.Provider>
  )
}