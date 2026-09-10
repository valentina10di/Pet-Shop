import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';



export const fetchAllProducts = createAsyncThunk(
  'allProducts/fetchAllProducts',
  async () => {
    const response = await axios.get(`${BASE_URL}/products/all`);
    return Array.isArray(response.data) ? response.data : [];
  }
);