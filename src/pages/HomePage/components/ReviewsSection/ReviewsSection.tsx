import styles from './ReviewsSection.module.css'
import ItemSlider from '../../../../components/shared/ItemSlider/ItemSlider'
import ReviewBox from '../../../../components/shared/ReviewBox/ReviewBox'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../app/store'
import { selectAllProducts } from '../../../../features/api/apiSelection'
import { useGetAllProductsQuery } from '../../../../features/api/apiSlice'
import { selectedCategories } from '../../../../constants'
import { useMemo, useRef } from 'react'
import { Product } from '../../../../types/types'
import { generateRandomNumbers } from '../../../../utils/functions/generateRandomNumbers'
import { useScroll, motion, useTransform } from 'framer-motion'

interface Review {
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
  }

const getMaxRating = (reviews: Review[]): number => {
    return reviews.reduce((max, review) => review.rating > max ? review.rating : max, 0)
  };

const filterProducts = (products: Product[], amount: number): Product[] => {
    const filteredProducts = products.filter((product) => getMaxRating(product.reviews) === 5)
    const randNums: number[] = generateRandomNumbers(filteredProducts.length, amount)
    const reducedProducts: Product[] = []
    for (let i=0; i < amount && i < randNums.length && i < filteredProducts.length; i++) {
        reducedProducts.push(filteredProducts[randNums[i]])
    }
    return reducedProducts
  }

const ReviewsSection = () => {
    const { data, error, isLoading, isSuccess } = useGetAllProductsQuery()
    const products: Product[] = useSelector((state: RootState) => selectAllProducts(state, selectedCategories))
    const ref = useRef(null)
    const {scrollYProgress} = useScroll({
      target: ref,
      offset: ['end end', 'end 80vh']
    })
    const marginX = useTransform(scrollYProgress, [0, 1], ['0 0rem', '0 1rem'])

    const selectedProducts: Product[] = useMemo(
        () => {
            if (products.length === 0) return []
            return filterProducts(products, 5)
        },
        [products]
    )

    if (isLoading) {
        return <div>Loading...</div>;
      }

  return (
    <div className={styles.background} ref={ref}>
      <motion.div className={styles.reviewSection}
        style={{margin: marginX}}
      >
        
          <div className={styles.header}>
              <h1 className={styles.h1}>Amazing reviews from customers!</h1>
          </div>
          <ItemSlider items={selectedProducts.map(product => <ReviewBox product={product}/>)}/>
      </motion.div>
    </div>
  )
}

export default ReviewsSection