
import { api } from './api';
import { Product } from '@/types/product';

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // All Products
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: ['Products'],
    }),

    // Single Product by ID
    getProduct: builder.query<Product, string | number>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),

    // Create Product
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),

    // Update Product
    updateProduct: builder.mutation<Product, Partial<Product> & { id: string | number }>({
      query: ({ id, ...product }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
    }),

    // Delete Product
    deleteProduct: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),

    // Get All Categories
    getCategories: builder.query<string[], void>({
      query: () => '/products/categories',
      providesTags: ['Categories'],
    }),

    // Get Products by Category
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `/products/category/${category}`,
      providesTags: (result, error, category) => [{ type: 'Products', id: category }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
