import styles from './ProductsModal.module.css'
import { ProductSelection, Product } from '../../../types/types'
import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarRating from '../StarRating/StarRating';
import ArrowSvg from '../../../assets/svgs/ArrowSvg';

interface ProductsModalProps {
    products: ProductSelection;
}

const variants = {
    enter: (direction: 'left' | 'right') => ({x: (direction === 'right') ? '100%' : '-100%', opacity: 0, transition: {
        duration: .5, ease: 'easeIn',
      }}),
    center: { x: 0, opacity: 1, transition: {
      duration: .5, ease: 'easeIn',
    }},
    exit: (direction: 'left' | 'right') => ({ x: (direction === 'right') ? '-100%' : '100%', opacity: 0, transition: {
      duration: .5, ease: 'easeIn',
    }})
}

const preloadImages = (products: Product[]): Promise<void[]> => {
    return Promise.all(
        products.map((product) => {
            return new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.src = product.images[0];
                img.onload = () => resolve();
                img.onerror = () => reject();
            });
        })
    );
}

const ProductsModal: FC<ProductsModalProps> = ({products}) => {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState<'left'|'right'>('left')
    const [canClick, setCanClick] = useState(true)

    useEffect(() => {
        preloadImages(products.products)
            .then()
            .catch((error) => console.error('Error preloading images', error));
    }, [products]);

    useEffect(() => {
        if (!canClick) {
            if (direction === 'left') {
                setCurrent(prev => {
                    let newValue = prev - 1
                    if (newValue < 0) {
                        newValue = products.total - 1
                    }
                    return newValue
                })
            } else {
                setCurrent(prev => {
                    let newValue = prev + 1
                    if (newValue > products.total - 1) {
                        newValue = 0
                    }
                    return newValue
                })
            }
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
    <div className={styles.modal}>
        <div className={`hover-target ${styles.arrowContainer}`} onClick={canClick ? handleLeftClick : undefined}>
            <ArrowSvg direction='left' color='var(--effect-color)' />
        </div>

        <div className={styles.productContainer}>
            <AnimatePresence custom={direction}>
                <motion.div className={styles.product}
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    onAnimationComplete={() => setCanClick(true)}
                >
                    <img className={styles.img} src={products.products[current].images[0]} alt="product-image" />
                    <div className={styles.content}>
                        <div className={styles.rating}>
                            <StarRating rating={products.products[current].rating} />   
                            <div className={styles.ratingText}>({products.products[current].rating}/5)</div>
                        </div>
                        <div className={styles.namePriceContainer}>
                            <h2 className={styles.title}>{products.products[current].title}</h2>
                            <div className={styles.price}>{products.products[current].price}$</div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

        <div className={`hover-target ${styles.arrowContainer}`} onClick={canClick ? handleRightClick : undefined}>
            <ArrowSvg direction='right' color='var(--effect-color)' />
        </div>
    </div>
  )
}

export default ProductsModal