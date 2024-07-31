import { FC, useState } from "react"
import styles from './CartItem.module.css'
import { Product } from "../../../../types/types";
import TrashSvg from "../../../../assets/svgs/TrashSvg";
import { useDispatch } from "react-redux";
import { setItemAmount, deleteItem } from "../../../../features/cart/cartSlice";

interface CartItemProps {
    product: Product;
    amount: number;
}

const CartItem: FC<CartItemProps> = ({product, amount}) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.cartItem}>
      <img src={product.images[0]} alt='product-image' className={styles.img}/>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <h2 className={styles.h2}>{product.title}</h2>
          <p className={styles.p}>{product.brand}</p>
          <div className={styles.amount}>
            <p className={styles.p}>Amount</p>
            <select name="amount-selection" id={`amount-select-${product.id}`} className={`hover-target ${styles.amountSelect}`} value={amount} onChange={e => dispatch(setItemAmount({id: product.id, amount: Number(e.target.value)}))} >
              <option id="0" value={0}>0</option>
              <option id="1" value={1}>1</option>
              <option id="2" value={2}>2</option>
              <option id="3" value={3}>3</option>
              <option id="4" value={4}>4</option>
              <option id="5" value={5}>5</option>
            </select>
          </div>
          <div className={styles.actions}>
            <div className={`hover-target ${styles.trashBin}`} onClick={() => dispatch(deleteItem(product.id))}>
              <TrashSvg />
            </div>
          </div>
        </div>
        <div className={styles.rightContent}>
          <h2 className={styles.h2}>{product.price} $</h2>
        </div>
      </div>
    </div>
  )
}

export default CartItem