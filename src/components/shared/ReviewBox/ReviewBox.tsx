import { FC } from 'react'
import styles from './ReviewBox.module.css'
import { Product } from '../../../types/types';
import StarRating from '../StarRating/StarRating';

interface Something {
    title: string;
    thumbnail: string;
    name: string;
    comment: string;
    rating: number;
}

interface ReviewBoxProps {
    product: Product
}

const ReviewBox: FC<ReviewBoxProps> = ({product}) => {
    const topReview = product.reviews.reduce((maxReview, currentReview) => currentReview.rating > maxReview.rating ? currentReview : maxReview, product.reviews[0]);

  return (
    <div className={styles.reviewBox}>
        <div className={styles.productInfo}>
           <img src={product.thumbnail} alt="product-image" className={styles.img}/> 
           <p className={styles.productName}>{product.title}</p>
        </div>
        <StarRating rating={topReview.rating}/>
        <p className={styles.comment}>{topReview.comment}</p>
        <p>-{topReview.reviewerName}</p>

    </div>
  )
}

export default ReviewBox