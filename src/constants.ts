import { Category, SubCategory } from "./types/types"

export const selectedCategories: string[] = [
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
    "tops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "sunglasses",
    "fragrances",
]

export const subcategories: SubCategory[] = [
    
]

export const categories: Category[] = [
    {
        name: 'Mens Clothing',
        link: 'mens-clothing',
        subcategories: [
            {name: "Shirts", link: "mens-shirts"},
            {name: "Shoes", link: "mens-shoes"},
            
        ],
    },
    {
        name: 'Womens Clothing',
        link: 'womens-clothing',
        subcategories: [
            {name: "Dresses", link: "womens-dresses"},
            {name: "Tops", link: "tops"},
            {name: "Shoes", link: "womens-shoes"},
        ],
    },
    {
        name: 'Accessories',
        link: 'accessories',
        subcategories: [
            {name: "Jewellery", link: "womens-jewellery"},
            {name: "Womens Watches", link: "womens-watches"},
            {name: "Bags", link: "womens-bags"},
            {name: "Mens Watches", link: "mens-watches"},
            {name: "Sunglasses", link: "sunglasses"},
        ],
    },
    {
        name: 'Fragrances',
        link: 'fragrances',
        subcategories: [
            {name: 'Fragrances', link: 'fragrances'}
        ],
    },
]