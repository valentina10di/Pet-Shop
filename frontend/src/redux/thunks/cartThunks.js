import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';



export const sendCartOrder = createAsyncThunk(
  'cart/sendCartOrder',
  async (orderData) => {
    const response = await axios.post(`${BASE_URL}/order/send`, orderData);
    return response.data;
  }
);