import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: '',
  cart: [
    {
      product: {
        id: '',
        title: '',
        img: '',
      },
      quantity: 1,
    },
  ],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.loading = true
      state.cart = action.payload
      state.loading = false
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter((ele) => ele.product?.id != action.payload.id)
    },
    addQuantity: (state, action) => {
      const initalCart = state.cart.filter((ele) => ele.product.id != action.payload.id)
      const updatedCartItem = state.cart.find((ele) => ele.product.id === action.payload.id)
      updatedCartItem?.quantity  = updatedCartItem?.quantity +  1
      state.cart = [...initalCart, updatedCartItem]
    },
  },
})
