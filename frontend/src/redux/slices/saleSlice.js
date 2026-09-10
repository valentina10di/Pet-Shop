import { createSlice } from '@reduxjs/toolkit';
import { fetchSaleProducts } from '../thunks/thunkSale';

const saleSlice = createSlice({
  name: 'sale',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaleProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSaleProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchSaleProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default saleSlice.reducer;