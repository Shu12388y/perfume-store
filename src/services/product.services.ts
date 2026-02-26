import { createAsyncThunk } from '@reduxjs/toolkit'

export const get_products = createAsyncThunk('products', async (_, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:3000/api/products?depth=1&draft=false&locale=undefined&trash=false')
    const data = await response.json()
    return data.docs
  } catch (error) {
    return thunkAPI.rejectWithValue(String(error))
  }
})
