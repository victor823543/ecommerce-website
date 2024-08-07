import styles from './HomePage.module.css'
import HeroSection from './components/HeroSection/HeroSection'
import ReviewsSection from './components/ReviewsSection/ReviewsSection'
import CategoriesSection from './components/CategoriesSection/CategoriesSection'

const HomePage = () => {
  return (
    <div className={styles.body}>
      <div className={styles.bg}></div>
        <HeroSection />
        <ReviewsSection />
        <CategoriesSection />
    </div>
  )
}

export default HomePage