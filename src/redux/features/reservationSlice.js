import { createSlice } from '@reduxjs/toolkit';

import {
  fetchReservedCars,
  createCarReservation,
  removeCarReservation,
} from './reservationAction';

const initialState = {
  reservedCars: [],
  createdReserve: {},
  loading: false,
  showError: null,
};

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createCarReservation.pending, (state) => {
        state.loading = true;
        state.showError = null; // Reset error when starting an asynchronous operation
      })
      .addCase(createCarReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.createdReserve = action.payload;
      })
      .addCase(createCarReservation.rejected, (state, action) => {
        state.loading = false;
        state.showError = action.error.message;
      })
      .addCase(fetchReservedCars.pending, (state) => {
        state.loading = true;
        state.showError = null; // Reset error when starting an asynchronous operation
      })
      .addCase(fetchReservedCars.fulfilled, (state, action) => {
        state.loading = false;
        state.reservedCars = action.payload;
      })
      .addCase(fetchReservedCars.rejected, (state) => {
        state.loading = false;
        state.showError = 'Failed to fetch car reservations';
      })
      .addCase(removeCarReservation.pending, (state) => {
        state.loading = true;
        state.showError = null;
      })
      .addCase(removeCarReservation.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming the response includes the removed reservation ID
        const removedReservationId = action.payload.id;
        state.reservedCars = state.reservedCars.filter(
          (reservation) => reservation.id !== removedReservationId,
        );
      })
      .addCase(removeCarReservation.rejected, (state, action) => {
        state.loading = false;
        state.showError = action.error.message;
      });
  },
});

export default reservationsSlice.reducer;
