import { FC } from 'react'
import styles from './ProductSection.module.css'
import { Product } from '../../../../types/types'

import ProductDisplay from '../../../../components/shared/ProductDisplay/ProductDisplay'

interface ProductSectionProps {
    products: Product[]|null;
}

const ProductSection: FC<ProductSectionProps> = ({products}) => {
  return (
    <div className={styles.productSection}>
        <div className={styles.productGrid}>
            {products ?
                products.map((product) => (
                    <ProductDisplay key={product.id} product={product}/>
                ))
                :
                <div>Loading...</div>
            }
        </div>
    </div>
  )
}

export default ProductSection