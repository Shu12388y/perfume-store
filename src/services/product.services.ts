import { createAsyncThunk } from '@reduxjs/toolkit'

export const get_products = createAsyncThunk('products', async (_, thunkAPI) => {
  try {
    const response = await fetch('')
    const data = await response.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(String(error))
  }
})
