import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';



export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return Array.isArray(response.data) ? response.data[0] : response.data;
  }
);