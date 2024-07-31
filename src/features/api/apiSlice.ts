import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductSelection } from "../../types/types";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://dummyjson.com/products'}),
    endpoints: builder => ({
        getCategories: builder.query<string[], void>({
            query: () => '/category-list'
        }),
        getSearch: builder.query<ProductSelection, string>({
            query: (product) => `/search?q=${product}`
        }),
        getProductsByCategory: builder.query<ProductSelection, string>({
            query: (category) => `/category/${category}`
        }),
        getProductById: builder.query<Product, string>({
            query: (id) => `/${id}`
        }),
        getAllProducts: builder.query<Product[], void>({
            query: () => '?limit=0'
        }),
    })

})

export const { useGetCategoriesQuery, useGetProductByIdQuery, useGetAllProductsQuery, useGetProductsByCategoryQuery, useGetSearchQuery } = apiSlice