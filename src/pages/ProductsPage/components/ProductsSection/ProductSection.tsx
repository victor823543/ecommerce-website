import { FC } from 'react'
import styles from './ProductSection.module.css'
import { Product } from '../../../../types/types'

import ProductDisplay from '../../../../components/shared/ProductDisplay/ProductDisplay'

interface ProductsSectionProps {
    products: Product[]|null;
}

const ProductsSection: FC<ProductsSectionProps> = ({products}) => {
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

export default ProductsSection