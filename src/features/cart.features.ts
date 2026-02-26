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
        price:0
      },
      quantity: 1,
    },
  ],
  totalPrice:0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.loading = true
      state.cart = [
        ...state.cart,
        {
          ...action.payload,
          quantity: 1, 
        },
      ]
      state.loading = false
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter((ele) => ele.product?.id != action.payload.id)
    },
    addQuantity: (state, action) => {
      const item = state.cart.find((item) => item.product.id === action.payload.id)
      if (item) {
        item.quantity += 1
      }
    },
    removeQuantity: (state, action) => {
      const item = state.cart.find((item) => item.product.id === action.payload.id)

      if (item && item.quantity > 1) {
        item.quantity -= 1
      }
    },
    totalPriceReducer:(state)=>{
      const price =  state.cart.reduce((acc,curr)=>{
        return acc + curr.product.price * curr.quantity
      },0)
      state.totalPrice = price
    }
  },
})
