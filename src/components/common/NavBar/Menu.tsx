import { FC, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './Menu.module.css'

interface MenuProps {
    isOpen: boolean;
}

interface LinkItems {
    title: string;
    path: string;
}

export const links: LinkItems[] = [
    {title: 'Mens Clothing', path: '/products/mens-clothing'},
    {title: 'Womens Clothing', path: '/products/womens-clothing'},
    {title: 'Accessories', path: '/products/accessories'},
    {title: 'Fragrance', path: '/products/fragrance'},
] 

const Menu: FC<MenuProps> = ({isOpen}) => {
    const navigate = useNavigate()

  return (
    <AnimatePresence>
        {isOpen &&
            <motion.div className={styles.menu}
                initial={{y: '-101%'}}
                animate={{y: 0}}
                exit={{y: '-101%'}}
                transition={{ease: [.16,1,.3,1], duration: 1}}
            >
                <div className={styles.container}>
                   <div className={styles.links}>
                        {links.map((linkObject, index) => (
                            <motion.div key={index} className={`hover-target ${styles.li}`} onClick={() => navigate(linkObject.path)}

                            >{linkObject.title}</motion.div>
                        ))}
                   </div>
                </div>
            </motion.div>
        }
    </AnimatePresence>
  )
}

export default Menu