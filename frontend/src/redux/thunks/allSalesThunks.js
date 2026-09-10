import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';



export const fetchAllSales = createAsyncThunk(
  'allSales/fetchAllSales',
  async () => {
    const response = await axios.get(`${BASE_URL}/products/all`);
    return response.data.filter(item => item.discont_price);
  }
);