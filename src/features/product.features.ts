import { createSlice } from '@reduxjs/toolkit'
import { get_product, get_products } from '@/services/product.services'

const initialState = {
  loading: false,
  error: '',
  data: [],
  product_data: {},
}

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(get_products.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(get_products.pending, (state) => {
        state.loading = true
      })
      .addCase(get_products.rejected, (state, action) => {
        state.loading = false
        state.data = []
        state.error = (action.error as string) || 'Internal Server Error'
      })
      .addCase(get_product.pending, (state) => {
        state.loading = true
      })
      .addCase(get_product.fulfilled, (state, action) => {
        state.product_data = action.payload
        state.loading = false
      })
      .addCase(get_product.rejected, (state, action) => {
        state.loading = false
        state.error = (action.error as string) || 'Something went wrong'
      })
  },
})
