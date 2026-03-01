import { configureStore } from '@reduxjs/toolkit'
import { ProductSlice } from '@/features/product.features'
import { cartSlice } from '@/features/cart.features'

export const store = configureStore({
  reducer: {
    product: ProductSlice.reducer,
    cart: cartSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
