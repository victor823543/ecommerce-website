import { FC } from 'react'
import styles from './CategorySlide.module.css'
import { useGetProductsByCategoryQuery } from '../../../../features/api/apiSlice';
import ProductsModal from '../../../../components/shared/ProductsModal/ProductsModal';
import TextAppearAnimation from '../../../../components/shared/TextAppearAnimation/TextAppearAnimation';
import { useNavigate } from 'react-router-dom';

interface CategorySlideProps {
    title: string;
    category: string;
    link: string;
}

const CategorySlide: FC<CategorySlideProps> = ({title, category, link}) => {
    const navigate = useNavigate()
    const {
        data: products,
        isLoading,
        isSuccess,
        error,
    } = useGetProductsByCategoryQuery(category)

  return (
    <div className={styles.categorySlide}>
        <div className={styles.leftContainer}>
            <h1 className={`hover-target ${styles.h1}`} onClick={() => navigate(`/products/${link}`)}>
                <TextAppearAnimation>
                    {title}    
                </TextAppearAnimation>
            </h1>
        </div>
        <div className={styles.rightContainer}>
            {isLoading && 
                <div>Loading...</div>
            }
            {isSuccess &&
                <div className={styles.productsContainer}>
                    <ProductsModal products={products}/>
                </div>
                
            }
        </div>
    </div>
  )
}

export default CategorySlide