import styles from './CartPage.module.css'
import NavBar from '../../components/common/NavBar/NavBar'
import CartItem from './components/CartItem/CartItem'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../features/cart/cartSlice'
import { selectMultipleProductsByIds } from '../../features/api/apiSelection'
import { RootState } from '../../app/store'
import { useGetAllProductsQuery } from '../../features/api/apiSlice'
import { useMemo } from 'react'
import OrderSummary from './components/OrderSummary/OrderSummary'
import StoreButton from '../../components/shared/StoreButton/StoreButton'

const CartPage = () => {
    const items = useSelector(selectCartItems)
    const { data, isSuccess, isLoading } = useGetAllProductsQuery()
    const itemIds = useMemo(() => Object.keys(items), [items]);
    const products = useSelector((state: RootState) => selectMultipleProductsByIds(state, itemIds))
    const numberOfItems = Object.values(items).reduce((total, quantity) => total + quantity, 0)

    const totalPrice = Object.entries(items).reduce((total, [id, amount]) => {
        if (products[id]) {
          return total + products[id].price * amount;
        }
        return total;
      }, 0).toFixed(2)

  if (isLoading) {
    return <div>loading...</div>
  }    
  return (
    <div className={styles.body}>
        <NavBar />
        <div className={styles.leftSection}>
            <h1 className={styles.h1}>Shoppingbag</h1>
            <p className={styles.p}>{numberOfItems} products | {totalPrice} $</p>
            {(isSuccess && products && items) &&
                <div className={styles.itemsContainer}>
                    {Object.entries(items).map(([id, amount]) => {
                        if (amount > 0 && products[id]) {
                            return <CartItem key={`${id}`} product={products[id]} amount={amount}/>
                        }
                    })}
                </div>
            }
        </div>
        <div className={styles.rightSection}>
            <OrderSummary totalCost={Number(totalPrice)}/>
        </div>
        <div className={styles.fixedBtnContainer}>
            <StoreButton color='var(--dark-color)' textColor='white'>Checkout</StoreButton>
        </div>
    </div>
  )
}

export default CartPage