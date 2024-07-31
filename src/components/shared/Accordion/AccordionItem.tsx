import { FC, useState } from 'react'
import styles from './Accordion.module.css'
import { AccordionContent } from '../../../types/types'
import { motion } from 'framer-motion'
import AnimatedArrow from '../AnimatedArrow/AnimatedArrow'

const AccordionItem: FC<AccordionContent> = ({title, content}) => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <motion.div className={styles.accordionItem}
        layout
    >
        <div className={`hover-target ${styles.header}`} onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.title}>{title}</div>
            <div className={styles.arrowContainer}>
                <AnimatedArrow isActive={isOpen}/>
            </div>
        </div>
        <motion.div className={styles.contentContainer}
            initial={false}
            animate={isOpen ? {height: 'auto'} : {height: 0}}
        >
            <div className={styles.content}>
                {content}
            </div>
        </motion.div>
    </motion.div>
  )
}

export default AccordionItem