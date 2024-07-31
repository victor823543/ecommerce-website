import { FC } from 'react'
import styles from './ProductDisplay.module.css'
import { Product } from '../../../types/types'
import StarRating from '../StarRating/StarRating'
import { useNavigate } from 'react-router-dom'

interface ProductDisplayProps {
  product: Product;
}

const ProductDisplay: FC<ProductDisplayProps> = ({product}) => {
  const navigate = useNavigate()
  return (
    <div className={`hover-target ${styles.product}`} onClick={() => navigate(`/product/${product.id}`)}>
      <img className={styles.img} src={product.images[0]} alt="product-img" />
      <div className={styles.content}>
        <div className={styles.rating}>
          <StarRating rating={product.rating} />   
          <div className={styles.ratingText}>({product.rating}/5)</div>
        </div>
        <div className={styles.namePriceContainer}>
          <h2 className={styles.h2}>{product.title}</h2>
          <div className={styles.price}>{product.price}$</div>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay