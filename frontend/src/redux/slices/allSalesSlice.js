import { createSlice } from '@reduxjs/toolkit';
import { fetchAllSales } from '../thunks/allSalesThunks';

const allSalesSlice = createSlice({
  name: 'allSales',
  initialState: {
    list: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSales.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchAllSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default allSalesSlice.reducer;