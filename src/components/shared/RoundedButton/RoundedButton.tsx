import { motion } from "framer-motion"
import { FC, useState } from "react"
import styles from './RoundedButton.module.css'

interface RoundedButtonProps {
    children: string;
}

const RoundedButton: FC<RoundedButtonProps> = ({children}) => {
    const [isHovering, setIsHovering] = useState(false)
  return (
    <motion.div className={`hover-target ${styles.btn}`} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
        whileHover={{scaleX: 1.05}}
        transition={{duration: .1, bounce: 500, bounceStiffness: 100}}
    >
        {children}
        <div className={styles.text}>{children}</div>
        <div className={styles.btnBackground}></div>
        <motion.span className={`${styles.span} ${styles.span1}`}
            animate={isHovering ? {x: ['0%', '100%']} : {x: ['100%', '200%'], transition: {delay: 0.3, duration: .4, ease: 'easeOut'}}}
            transition={{duration: .4, ease: 'easeOut'}}
        />
        <motion.span className={`${styles.span} ${styles.span2}`}
            animate={isHovering ? {x: ['0%', '100%'], transition: {delay: 0.3, duration: .4, ease: 'easeOut'}} : {x: ['100%', '200%']}}
            transition={{duration: .4, ease: 'easeOut'}}
        />
    </motion.div>
  )
}

export default RoundedButton
