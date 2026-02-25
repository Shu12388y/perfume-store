import { configureStore } from '@reduxjs/toolkit'
import { ProductSlice } from '@/features/product.features'

export default configureStore({
  reducer: {
    product: ProductSlice.reducer,
  },
})
