import { FC, useState, ButtonHTMLAttributes } from 'react'
import { motion, MotionProps } from 'framer-motion';
import styles from './StoreButton.module.css'


interface CustomStoreButtonProps {
    color?: string;
    textColor?: string;
    onClick?: () => void;
    children: string;
}

type StoreButtonProps = CustomStoreButtonProps & MotionProps & ButtonHTMLAttributes<HTMLButtonElement>

const StoreButton: FC<StoreButtonProps> = ({color='var(--primary-color)', textColor='black', onClick, children, ...rest}) => {
    const [isHovering, setIsHovering] = useState(false)
  return (
    <motion.button {...rest} className={`hover-target ${styles.btn}`} onClick={onClick} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
        whileHover={{scaleX: 1.05}}
        transition={{duration: .1, bounce: 500, bounceStiffness: 100}}
    >
        {children}
        <div className={styles.text} style={{color: textColor}}>{children}</div>
        <div className={styles.btnBackground} style={{backgroundColor: color}}></div>
        <motion.span className={`${styles.span}`} style={{backgroundColor: `hsl(from ${color} h s calc(l + 5))`}}
            animate={isHovering ? {x: ['0%', '100%']} : {x: ['100%', '200%'], transition: {delay: 0.3, duration: .4, ease: 'easeOut'}}}
            transition={{duration: .4, ease: 'easeOut'}}
        />
        <motion.span className={`${styles.span}`} style={{backgroundColor: `hsl(from ${color} h s calc(l + 10))`}}
            animate={isHovering ? {x: ['0%', '100%'], transition: {delay: 0.3, duration: .4, ease: 'easeOut'}} : {x: ['100%', '200%']}}
            transition={{duration: .4, ease: 'easeOut'}}
        />
    </motion.button>
  )
}

export default StoreButton