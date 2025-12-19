import { formatCurrency } from '../utils/formatCurrency'

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{formatCurrency(product.price)}</p>
      <p>Stock: {product.stock}</p>
    </div>
  )
}

export default ProductCard