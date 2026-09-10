import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';



export const fetchCategoryProducts = createAsyncThunk(
  'categoryProducts/fetchCategoryProducts',
  async (categoryId) => {
    const response = await axios.get(`${BASE_URL}/categories/${categoryId}`);
    return response.data;
  }
);