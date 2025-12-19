import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/billing">Billing</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </aside>
  )
}

export default Sidebar