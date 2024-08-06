import styles from './ProductsPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllProducts } from '../../features/api/apiSelection'
import { selectedCategories, categories } from '../../constants'
import { RootState } from '../../app/store'
import { useGetAllProductsQuery } from '../../features/api/apiSlice'
import { useState, useEffect, ChangeEvent } from 'react'
import { Product, Category, SubCategory, SortingOption } from '../../types/types'

import FilterSection from './components/FilterSection/FilterSection'
import ProductsSection from './components/ProductsSection/ProductSection'

const ProductsPage = () => {  
    const params = useParams()
    const navigate = useNavigate()
    const { data, isSuccess, isLoading } = useGetAllProductsQuery()
    const products = useSelector((state: RootState) => selectAllProducts(state, selectedCategories))
    const [selectedCategory, setSelectedCategory] = useState(categories.find(category => category.link === params.category) || null)
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory|null>(null)
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [searchedProducts, setSearchedProducts] = useState<Product[]>([])
    const [searchInput, setSearchInput] = useState("")
    const [sortingOption, setSortingOption] = useState<SortingOption>(null)

    useEffect(() => {
      if (params) {
        setSearchInput('')

        const newCategory = categories.find(category => category.link === params.category) || null
        setSelectedCategory(newCategory)

        if (params.subcategory) {
          const newSubcategory = newCategory?.subcategories.find(subcategory => subcategory.link === params.subcategory) || null
          setSelectedSubCategory(newSubcategory)
        } else setSelectedSubCategory(null)
      }
    }, [params])

    useEffect(() => {
      let newProducts: Product[]
      if (selectedSubCategory) {
        newProducts = filterBySubcategory(products, selectedSubCategory)
      } else if (selectedCategory) {
        newProducts = filterByCategory(products, selectedCategory)
      } else {
        newProducts = [...products]
      }
      if (sortingOption) {
        sortProducts(newProducts, sortingOption)
      }
      setFilteredProducts(newProducts)
    }, [selectedCategory, selectedSubCategory, products])

    useEffect(() => {
      if (sortingOption) {
        console.log(sortingOption)
        setFilteredProducts(prev => {
          let sortedProducts = [...prev] 
          return sortProducts(sortedProducts, sortingOption) || []
        })
      }
    }, [sortingOption]) 

    useEffect(() => {
      if (searchInput.length > 1) {
        if (filteredProducts) {
          setSearchedProducts(filteredProducts.filter((product) => product.title.toLowerCase().includes(searchInput.toLowerCase()))) 
        }
      } else {
        setSearchedProducts([])
      }
    }, [searchInput])

    const sortProducts = (products: Product[], sortBy: SortingOption) => {
      switch (sortBy) {
        case 'Price (Asc)':
          return products.sort((a, b) => a.price - b.price)
        case 'Price (Desc)':
          return products.sort((a, b) => b.price - a.price)
        case 'Rating':
          return products.sort((a, b) => b.rating - a.rating)
        case 'Name':
          return products.sort((a, b) => a.title.localeCompare(b.title))
      }
    }

    const filterByCategory = (products: Product[], category: Category) => {
      return (
        products.filter((product) => category.subcategories.some((subcategory) => subcategory.link === product.category))
      )
    }

    const filterBySubcategory = (products: Product[], subcategory: SubCategory) => products.filter((product) => product.category === subcategory.link)

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value)
    }

    const changeUrl = (newUrl: string) => {
      navigate(newUrl, { replace: true });
    }

    return (
      <div className={styles.body}>
        <FilterSection searchValue={searchInput} handleSearchInput={handleSearchChange} selectedCategory={selectedCategory} selectedSubcategory={selectedSubCategory} sortingOption={sortingOption} setSortingOption={setSortingOption} changeUrl={changeUrl}/>
        <ProductsSection products={searchInput.length > 1 ? searchedProducts : filteredProducts}/>
      </div>
    )
  }

  export default ProductsPage