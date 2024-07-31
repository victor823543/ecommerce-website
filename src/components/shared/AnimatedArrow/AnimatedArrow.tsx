import { FC } from 'react'
import styles from './AnimatedArrow.module.css'

interface AnimatedArrowProps {
    isActive: boolean;
}

const AnimatedArrow: FC<AnimatedArrowProps> = ({isActive}) => {
  return (
    <span className={`${styles.arrow} ${isActive ? styles.active : ''}`}>
        <span className={styles.span}></span>
        <span className={styles.span}></span>
    </span>
  )
}

export default AnimatedArrow