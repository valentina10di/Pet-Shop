import { configureStore } from '@reduxjs/toolkit';
import saleReducer from './slices/saleSlice';
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice';
import allSalesReducer from './slices/allSalesSlice';
import categoryProductsReducer from './slices/categoryProductsSlice';
import allProductsReducer from './slices/allProductsSlice';

export const store = configureStore({
  reducer: {
    sale: saleReducer,
    product: productReducer,
    cart: cartReducer,
    allSales: allSalesReducer,
    categoryProducts: categoryProductsReducer,
    allProducts: allProductsReducer,
  },
});