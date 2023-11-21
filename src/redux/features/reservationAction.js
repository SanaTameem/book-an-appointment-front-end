import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axios from 'axios';

export const fetchReservedCars = createAsyncThunk(
  'reservations/fetchReservedCars',
  async () => {
    console.log('Fetching reserved cars...');
    try {
      const { authToken, id } = JSON.parse(localStorage.getItem('Token'));

      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${id}/reservations`,
        {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
          },
        },
      );

      const reservationsWithDetails = await Promise.all(
        response.data.map(async (reservation) => {
          const carResponse = await axios.get(
            `http://localhost:3000/api/v1/users/${id}/cars/${reservation.car_id}`,
            {
              headers: {
                Authorization: authToken,
                'Content-Type': 'application/json',
              },
            },
          );
          return {
            ...reservation,
            carName: carResponse.data.model,
            carImage: carResponse.data.image,
          };
        }),
      );
      console.log('Fetched reserved cars:', reservationsWithDetails);
      return reservationsWithDetails;
    } catch (error) {
      throw Error(error);
    }
  },
);

export const createCarReservation = createAsyncThunk(
  'reservations/createCarReservation',
  async (data) => {
    const { id } = JSON.parse(localStorage.getItem('Token'));
    const url = `http://localhost:3000/api/v1/users/${id}/reservations`;
    try {
      const { authToken } = JSON.parse(localStorage.getItem('Token'));
      const response = await axios.post(url, JSON.stringify(data), {
        headers: {
          authorization: authToken,
          'Content-Type': 'application/json',
        },
      });
      toast.success(`Reservation Successfully ${response.statusText} 🚗`);
      return response.data;
    } catch (err) {
      toast.error('Oops 😥 failed to create reservation');
      throw Error(err);
    }
  },
);

export const removeCarReservation = createAsyncThunk(
  'reservations/removeCarReservation',
  async (reservationId) => {
    try {
      const { authToken, id } = JSON.parse(localStorage.getItem('Token'));

      const response = await axios.delete(
        `http://localhost:3000/api/v1/users/${id}/reservations/${reservationId}`,
        {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      throw Error(error);
    }
  },
);
