import styles from './CategoriesSection.module.css'
import CategorySlide from '../CategorySlide/CategorySlide'

const sectionContent = [
    {title: 'Mens Clothing', category: 'mens-shirts', link: 'mens-clothing'},
    {title: 'Womens Clothing', category: 'womens-dresses', link: 'womens-clothing'},
    {title: 'Accessories', category: 'mens-watches', link: 'accessories'},
    {title: 'Fragrances', category: 'fragrances', link: 'fragrances'},
]

const CategoriesSection = () => {
  return (
    <div className={styles.categoriesSection}>
        <div className={styles.header}>
            <h1 className={styles.h1}>Shop by <br /> Category</h1>
        </div>
        {sectionContent.map((content, index) => (
            <CategorySlide key={index} title={content.title} category={content.category} link={content.link}/>
        ))}
    </div>
  )
}

export default CategoriesSection