import { FC, useState, useEffect } from 'react'
import { Product } from '../../../../types/types'
import styles from './ProductSection.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { addItem } from '../../../../features/cart/cartSlice'
import ArrowSvg from '../../../../assets/svgs/ArrowSvg'
import StoreButton from '../../../../components/shared/StoreButton/StoreButton'
import Accordion from '../../../../components/shared/Accordion/Accordion'
import StarRating from '../../../../components/shared/StarRating/StarRating'
import { AppDispatch } from '../../../../app/store'

interface ProductSectionProps {
    product: Product;
}

const ProductSection: FC<ProductSectionProps> = ({product}) => {
    const [canClick, setCanClick] = useState(true)
    const [selectedImg, setSelectedImg] = useState(0)
    const [direction, setDirection] = useState<'left'|'right'>('left')
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (!canClick) {
            if (direction === 'left') {
                setSelectedImg(prev => {
                    let newValue = prev - 1
                    if (newValue < 0) {
                        newValue = product.images.length - 1
                    }
                    return newValue
                })
            } else {
                setSelectedImg(prev => {
                    let newValue = prev + 1
                    if (newValue > product.images.length - 1) {
                        newValue = 0
                    }
                    return newValue
                })
            }
            setCanClick(true)
        }
    }, [direction, canClick])

    const handleLeftClick = () => {
        setCanClick(false)
        setDirection('left')
    }

    const handleRightClick = () => {
        setCanClick(false)
        setDirection('right')
    }

  return (
    <div className={styles.productSection}>
        <div className={styles.leftSection}>
            <div className={styles.imageSection}>
                <div className={styles.mainImageContainer}>
                    <div className={`hover-target ${styles.arrowContainer}`} aria-label='Left Image Button' onClick={canClick ? handleLeftClick : undefined}>
                        <ArrowSvg direction='left' color='var(--effect-color)' />
                    </div>

                    <div className={styles.images}>
                        <AnimatePresence>
                            <motion.img src={product.images[selectedImg]} aria-label='Main Image' alt="product-image" className={styles.mainImage} />
                        </AnimatePresence>
                    </div>

                    <div className={`hover-target ${styles.arrowContainer}`} aria-label='Right Image Button' onClick={canClick ? handleRightClick : undefined}>
                        <ArrowSvg direction='right' color='var(--effect-color)' />
                    </div>
                </div>
                <div className={styles.allImages}>
                    {product.images.map((source, index) => (
                        <div className={`hover-target ${styles.smallImageContainer}`} key={index} onClick={() => setSelectedImg(index)}>
                            <img src={source} alt="product-image" className={`${index === selectedImg ? styles.selectedSmallImage : ''} ${styles.smallImage}`} />
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
        <div className={styles.rightSection}>
            <div className={styles.mainTextContent}>
                <h2 className={styles.h2}>{product.title}</h2>
                <p className={styles.brand}>{product.brand}</p>
                <div className={styles.price}>{product.price}$</div>
            </div> 
            <div className={styles.buttonsContainer}>
                <StoreButton onClick={() => dispatch(addItem(product.id))} color='var(--dark-color)' aria-label='Add to Cart Button' textColor='white'>Add to cart</StoreButton>
                <StoreButton color='var(--third-color)' textColor='white'>Favorite</StoreButton>
            </div>
            <div className={styles.secondaryTextContent}>
                <h3 className={styles.h3}>Description</h3>
                <p className={styles.p}>{product.description}</p>
            </div>
            <div className={styles.productInfoContent}>
                <Accordion content={
                    [
                        {title: 'Warranty', content: product.warrantyInformation},
                        {title: 'Shipping', content: product.shippingInformation},
                        {title: 'Measurements', content: (
                            <ul>
                                {Object.entries(product.dimensions).map(([key, value]) => (
                                    <li key={key}>{key}: {value} cm</li>
                                ))}
                            </ul>
                        )},
                        {title: `Reviews (${product.reviews.length})`, content: (
                            <div className={styles.reviews}>
                                {product.reviews.map((review) => (
                                    <div>
                                        <h3>{review.reviewerName}</h3>
                                        <StarRating rating={review.rating}/>
                                        <p>{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    ]
                }/>
            </div>
        </div>
    </div>
  )
}

export default ProductSection