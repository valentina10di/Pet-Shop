import { createSlice } from '@reduxjs/toolkit';
import { fetchCategoryProducts } from '../thunks/categoryProductsThunks';

const categoryProductsSlice = createSlice({
  name: 'categoryProducts',
  initialState: {
    products: [],
    categoryTitle: '',
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const resData = action.payload;

        if (resData && resData.category) {
          state.categoryTitle = resData.category.title || '';
          state.products = resData.data || [];
        } else if (Array.isArray(resData)) {
          state.products = resData;
          state.categoryTitle = 'Category Products';
        } else {
          state.products = resData.data || [];
          state.categoryTitle = resData.title || 'Category';
        }
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categoryProductsSlice.reducer;