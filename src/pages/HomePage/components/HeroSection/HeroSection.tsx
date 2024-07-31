import styles from './HeroSection.module.css'
import TextAppearAnimation from '../../../../components/shared/TextAppearAnimation/TextAppearAnimation'
import RoundedButton from '../../../../components/shared/RoundedButton/RoundedButton'
import brandLogo from '../../../../assets/images/clothing-logo.png'
import HighlightedListItem from '../../../../components/shared/HighlightedListItem/HighlightedListItem'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const listItems = ['Impeccable quality', 'Reasonable prices', 'Rapid shipping']

const HeroSection = () => {
    const navigate = useNavigate()
    const ref = useRef(null)
    const {scrollYProgress} = useScroll({target: ref, offset: ['end end', 'end start']})
    const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 8])
    const [highlightListItem, setHighlightListitem] = useState(0)
    const wrapperRef = useRef(null)
    const {scrollYProgress: wrapperScrollY} = useScroll({
      target: wrapperRef,
      offset: ['end end', 'end 80vh']
    })
    const marginX = useTransform(wrapperScrollY, [0, 1], ['0 0rem', '0 1rem'])

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
        <div className={styles.bg}></div>
    <motion.div className={styles.heroSection}
        style={{margin: marginX}}
    >
        
        <h1 className={styles.h1}>
            <TextAppearAnimation>
                {`Promoting text \n for this store`}
            </TextAppearAnimation>
        </h1>
        <div className={styles.p}>
            <TextAppearAnimation>
                {`More detailed promotion text to really \n entice the user to buy our stuff`}
            </TextAppearAnimation>
        </div>

        <div onClick={() => navigate('/products')}>
            <RoundedButton>EXPLORE COLLECTION</RoundedButton>    
        </div>
        
        <div className={styles.imageContainer} ref={ref}>
            <img className={styles.img} src={brandLogo} alt="logo" />
            <motion.div className={styles.growingBackground}
                style={{scale: scaleBg}}
            />
        </div>
        <div className={styles.list}>
            {listItems.map((text, index) => (
                <div key={index} className={styles.li} style={highlightListItem === index ? {opacity: 1} : {opacity: .5}}>
                    <HighlightedListItem callback={() => setHighlightListitem(index)}>{text}</HighlightedListItem>
                </div>
            ))}
        </div>
    </motion.div>
    </div>
  )
}

export default HeroSection