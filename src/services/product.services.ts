import { createAsyncThunk } from '@reduxjs/toolkit'

export const get_products = createAsyncThunk('products', async (_, thunkAPI) => {
  try {
    const response = await fetch('/api/products?depth=1&draft=false&locale=undefined&trash=false', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return data.docs
  } catch (error) {
    return thunkAPI.rejectWithValue(String(error))
  }
})

export const get_product = createAsyncThunk('product', async (id, thunkAPI) => {
  try {
    const response = await fetch(
      `/api/products/${id}?depth=1&draft=false&locale=undefined&trash=false`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(String(error))
  }
})
