import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axios from 'axios';

export const fetchCars = createAsyncThunk('cars/fetchCars', async (userId) => {
  const url = `https://rent-a-car-96dr.onrender.com/api/v1/users/${userId}/cars`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

export const fetchCarById = createAsyncThunk(
  'cars/fetchCarById',
  async (data) => {
    const url = `https://rent-a-car-96dr.onrender.com/api/v1/users/${data.userId}/cars/${data.carId}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  },
);

export const addNewCars = createAsyncThunk('cars/addNewCars', async (data) => {
  const { authToken } = data.id;
  try {
    const config = {
      headers: {
        authorization: authToken,
        'Content-Type': 'application/json',
      },
    };
    const baseUrl = `https://rent-a-car-96dr.onrender.com/api/v1/users/${data.id}/cars`;

    const response = await axios.post(
      baseUrl,
      JSON.stringify({
        car: data.car,
      }),
      config,
    );
    toast.success(`Car Successfully ${response.statusText} `);
    return response.data;
  } catch (error) {
    toast.error('Opps failed to create Car');
    throw Error(error);
  }
});

export const deleteCar = createAsyncThunk(
  'cars/deleteCar',
  async (data, thunkAPI) => {
    const { userId, carId, authToken } = data;
    try {
      const config = {
        headers: {
          authorization: authToken,
        },
      };
      const url = `https://rent-a-car-96dr.onrender.com/api/v1/users/${userId}/cars/${carId}`;

      const response = await axios.delete(url, config);
      thunkAPI.dispatch(fetchCars());
      toast.success('Car Successfully deleted');
      return { carId, success: response.statusText === 'OK' };
    } catch (error) {
      toast.error('Failed to delete Car');
      throw Error(error);
    }
  },
);
