import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { OrdersProvider } from './context/OrdersContext.jsx'
import Home from './pages/Home/Home.js'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.js'
import About from './pages/About/About.js'
import Contact from './pages/Contact/Contact.js'
import ProductsList from './pages/Products/ProductsList.jsx'
import AddProduct from './pages/Products/AddProduct.jsx'
import EditProduct from './pages/Products/EditProduct.jsx'
import ProductDetail from './pages/Products/ProductDetail.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Payment from './pages/Payment/Payment.jsx'
import OrderSuccess from './pages/Orders/OrderSuccess.jsx'
import Orders from './pages/Orders/Orders.jsx'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrdersProvider>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orders" element={<Orders />} />
            </Routes>
          </OrdersProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App