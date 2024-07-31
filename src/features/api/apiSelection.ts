import { createSelector } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';
import { ProductSelection, Product } from "../../types/types";

const defaultProductSelection: ProductSelection = { products: [], total: 0, limit: 0, skip: 0 }

const selectAllProductsResult = (state: RootState) => state.api.queries['getAllProducts(undefined)']?.data as ProductSelection ?? defaultProductSelection

export const selectAllProducts = createSelector(
    [selectAllProductsResult, (_: RootState, selectedCategories: string[]) => selectedCategories],
    (products: ProductSelection, selectedCategories: string[]) => products['products'].filter((product) => selectedCategories.includes(product.category))
)

export const selectMultipleProductsByIds = createSelector(
    [selectAllProductsResult, (_: RootState, ids: string[]) => ids],
    (products: ProductSelection, ids: string[]) => {
        let selectedProducts = products['products'].filter((product) => ids.includes(product.id.toString()))
        let productIds: Record<string, Product> = {}
        selectedProducts.forEach((product) => productIds[product.id] = product)
        return productIds
    }
)

