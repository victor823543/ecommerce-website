import { useGetProductByIdQuery } from "../features/api/apiSlice";
import { Product } from "../types/types";

const useGetProductsByIds = (ids: string[]) => {
  // Fetch product data for each ID
  const products = ids.map(id => useGetProductByIdQuery(id))
  
  // Check if any of the queries are still loading
  const isLoading = products.some(result => result.isLoading)

  const isSuccess = products.every(result => result.isSuccess)

  // Combine the data from all queries
  const data = products.reduce((acc, result, index) => {
    if (result.data) {
      acc[ids[index]] = result.data;
    }
    return acc;
  }, {} as Record<string, Product>);

  // Handle errors if any
  const isError = products.some(result => result.isError);
  const error = products.find(result => result.error)?.error;

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export default useGetProductsByIds;
