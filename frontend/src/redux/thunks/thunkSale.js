import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';



export const fetchSaleProducts = createAsyncThunk(
  'sale/fetchSaleProducts',
  async () => {
    const response = await axios.get(`${BASE_URL}/products/all`);
    const discounted = response.data.filter(item => item.discont_price);
    const randomProducts = discounted.sort(() => 0.5 - Math.random()).slice(0, 4);
    return randomProducts;
  }
);

