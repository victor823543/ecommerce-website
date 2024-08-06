import styles from './ProductPage.module.css'
import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../../features/api/apiSlice'

import ProductSection from './components/ProductSection/ProductSection'

const ProductPage = () => {
    const { id } = useParams<string>()
    const {
      data: product,
      isLoading,
      isSuccess,
      error
    } = useGetProductByIdQuery(id || '')

  return (
    <div className={styles.body}>
        {isSuccess &&
          <ProductSection product={product}/>
        }
    </div>
  )
}

export default ProductPage