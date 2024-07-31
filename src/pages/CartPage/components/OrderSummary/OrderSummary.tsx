import { FC } from 'react'
import styles from './OrderSummary.module.css'
import StoreButton from '../../../../components/shared/StoreButton/StoreButton';

interface OrderSummaryProps {
    totalCost: number;

}

const OrderSummary: FC<OrderSummaryProps> = ({totalCost}) => {
  return (
    <div className={styles.orderSummary}>
        <h1 className={styles.h1}>Order Summary</h1>
        <div className={styles.textPriceContainer}>
            <div className={styles.text}>Subtotal</div>
            <div className={styles.price}>{totalCost.toFixed(2)} $</div>
        </div>
        <div className={styles.textPriceContainer}>
            <div className={styles.text}>Shipping cost</div>
            <div className={styles.price}>4.99 $</div>
        </div>
        <div className={styles.textPriceContainer}>
            <div className={styles.text}>Additional taxes</div>
            <div className={styles.price}>3.99 $</div>
        </div>
        <div className={`${styles.totalCostContainer} ${styles.textPriceContainer}`}>
            <div className={styles.text}>Total</div>
            <div className={styles.price}>{(totalCost + 4.99 + 3.99).toFixed(2)}</div>
        </div>
        <div className={styles.buttonContainer}>
            <StoreButton color='var(--third-color)' textColor='white'>Checkout</StoreButton>
        </div>
    </div>
  )
}

export default OrderSummary