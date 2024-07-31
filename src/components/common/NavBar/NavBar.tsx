import styles from './NavBar.module.css'
import { useState, useEffect } from 'react'
import Menu, { links } from './Menu'
import { useNavigate } from 'react-router-dom'
import CartSvg from '../../../assets/svgs/CartSvg'
import { useAppSelector } from '../../../app/hooks'
import { selectCartItems } from '../../../features/cart/cartSlice'

const NavBar = () => {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(true)
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [showMenu, setShowMenu] = useState(false)
    const numberOfItems = Object.values(useAppSelector(selectCartItems)).reduce((total, quantity) => total + quantity, 0)

    useEffect(() => {
        const handleScroll = () => {
          const currentScrollPos = window.scrollY;
          const visible = prevScrollPos > currentScrollPos;
    
          setVisible(visible);
          setPrevScrollPos(currentScrollPos);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [prevScrollPos]);

  return (
    <>
        <nav className={`${styles.navSmall} ${visible ? styles.visible : styles.hidden} ${showMenu ? styles.open : styles.closed}`}>
            <div className={styles.navBackground}></div>
            <div className={`hover-target ${styles.menuIcon}`} onClick={() => setShowMenu(!showMenu)}>
                <input className={styles.menuIcon__cheeckbox} type="checkbox" />
                <div>
                    <span></span>
                    <span></span>
                </div>
            </div> 
            <div className={styles.rightContainer}>
              <div className={`hover-target ${styles.cartContainerSmall}`} onClick={() => navigate('/cart')}>
                <CartSvg width='2rem' color={showMenu ? 'white' : 'black'}/>
                {numberOfItems > 0 &&
                  <div className={styles.cartNotification}>{numberOfItems}</div>
                }
              </div>
            </div>
            
            <Menu isOpen={showMenu}/>    
        </nav>

        <nav className={`${styles.navBig}`}>
          <div className={`hover-target ${styles.logoText}`} onClick={() => navigate('/')}>Ecommerce</div>
          <div className={styles.links}>
            {links.map((obj, index) => (
              <div key={index} className={`hover-target ${styles.linkItem}`} onClick={() => navigate(obj.path)}>{obj.title}</div>
            ))}
          </div>
          <div className={`hover-target ${styles.cartContainerBig}`} onClick={() => navigate('/cart')}>
            <CartSvg width='2.5rem'/>
            {numberOfItems > 0 &&
              <div className={styles.cartNotification}>{numberOfItems}</div>
            }
          </div>
        </nav>
        
    </>
  )
}

export default NavBar