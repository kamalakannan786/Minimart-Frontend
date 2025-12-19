import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import ProductsList from '../pages/Products/ProductsList'
import AddProduct from '../pages/Products/AddProduct'
import EditProduct from '../pages/Products/EditProduct'

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="*" element={<div style={{padding: '120px 20px', textAlign: 'center'}}><h1>Page Not Found</h1><p>The page you're looking for doesn't exist.</p></div>} />
      </Routes>
    </AuthProvider>
  )
}

export default AppRoutes