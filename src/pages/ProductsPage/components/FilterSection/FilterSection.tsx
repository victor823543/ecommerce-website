import { ChangeEvent, FC, useState, Dispatch, SetStateAction } from 'react'
import styles from './FilterSection.module.css'
import SearchSvg from '../../../../assets/svgs/SearchSvg';
import { categories } from '../../../../constants';
import { Category, SortingOption, SubCategory } from '../../../../types/types';
import AnimatedArrow from '../../../../components/shared/AnimatedArrow/AnimatedArrow';
import { motion } from 'framer-motion';

interface FilterSectionProps {
    searchValue: string;
    handleSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
    selectedCategory: Category|null;
    selectedSubcategory: SubCategory|null;
    sortingOption: SortingOption;
    setSortingOption: Dispatch<SetStateAction<SortingOption>>;
    changeUrl: (url: string) => void;
}

const sortingOptions: SortingOption[] = ['Price (Asc)', 'Price (Desc)', 'Name', 'Rating']

const FilterSection: FC<FilterSectionProps> = ({searchValue, handleSearchInput, selectedCategory, selectedSubcategory, sortingOption, setSortingOption, changeUrl}) => {
    const [showSubcategories, setShowSubcategories] = useState(false)
    const [showSorting, setShowSorting] = useState(false)
    return (
    <div className={styles.filterSection}>
        <div className={`hover-target ${styles.search}`}>
            <div className={styles.searchIcon}>
                <SearchSvg color='var(--effect-color)'/>
            </div>
            <input className={styles.input} autoComplete='off' placeholder='Search...' type="text" name="search" id="search-input" value={searchValue} onChange={(e) => handleSearchInput(e)}/>
        </div>
        <div className={styles.filter}>
            <div className={styles.filterWrapper}>
                {categories.map((category) => {
                    const isSelected: boolean = (selectedCategory && (category.link === selectedCategory.link)) ? true : false
                    return (
                        <div 
                            className={`hover-target ${styles.filterOption} ${isSelected && styles.selectedOption}`}
                            key={category.link}
                            onClick={isSelected ? () => changeUrl('/products') : () => changeUrl(`/products/${category.link}`)}
                        >
                            {category.name}
                        </div>
                    )
                    
                })}
            </div>
            <div className={styles.optionHeader}>
                <div className={`hover-target ${styles.subcategoriesBtn}`} onClick={() => setShowSubcategories(!showSubcategories)}>
                    <p className={styles.p}>{showSubcategories ? 'Hide' : 'Show'} subcategories</p>
                    <div className={styles.arrowContainer}>
                        <AnimatedArrow isActive={showSubcategories}/>
                    </div>
                </div> 
                <div className={`hover-target ${styles.sortBtn}`}>
                    <div className={styles.subcategoriesBtn} onClick={() => setShowSorting(!showSorting)}>
                        <div className={styles.arrowContainer}>
                            <AnimatedArrow isActive={showSorting}/>
                        </div>
                        <p className={styles.p}>Sort</p>    
                    </div>
                    <motion.div className={styles.dropdownContent}
                        animate={showSorting ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
                        transition={{duration: .2, ease: 'easeIn'}}
                    >
                        {sortingOptions.map((option, index) => (
                            <div 
                                key={index} 
                                style={option === sortingOption ? {color: 'hsl(from var(--effect-color) h s calc(l - 10)'} : {color: 'black'}} 
                                className={styles.dropdownItem}
                                onClick={() => setSortingOption(option)}
                            >{option}</div>   
                        ))}
                    </motion.div>
                </div>      
            </div>
            {showSubcategories &&
                <div className={`${styles.filterWrapperSm} ${styles.filterWrapper}`}>
                    {selectedCategory?.subcategories.map((subcategory) => {
                        const isSelected: boolean = (selectedSubcategory && (subcategory.link === selectedSubcategory.link)) ? true : false
                        return (
                            <div 
                                className={`hover-target ${styles.filterOption} ${styles.filterOptionSm} ${isSelected && styles.selectedOption}`}
                                key={subcategory.link}
                                onClick={isSelected ? () => changeUrl(`/products/${selectedCategory.link}`) : () => changeUrl(`/products/${selectedCategory.link}/${subcategory.link}`)}
                            >
                                {subcategory.name}
                            </div>
                        )
                    })}
                </div>
            }
            
        </div>
    </div>
  )
}

export default FilterSection