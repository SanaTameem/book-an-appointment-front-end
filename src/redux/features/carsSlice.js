import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, fetchCarById, addNewCars } from './carsAction';

const initialState = {
  cars: [],
  carById: {},
  reservedCar: {},
  isLoading: true,
  error: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    carCreated: (state, action) => {
      state.cars?.push(action.payload);
    },
    reserveCar(state, action) {
      const id = action.payload;
      const reserved = state.cars.find((car) => car.id === id);
      state.reservedCar = reserved || {};
      console.log(reserved);
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Cars
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.isLoading = false;
      })
      // Fetch Car By Id
      .addCase(fetchCarById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carById = action.payload;
        // Update reservedCar after fetching carById
        const { id } = action.payload;
        const reservedCar = state.cars.find((car) => car.id === id);
        state.reservedCar = reservedCar || {};
      })
      .addCase(fetchCarById.rejected, (state) => {
        state.isLoading = false;
      })
      // Add New Car
      .addCase(addNewCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars.push(action.payload);
      })
      .addCase(addNewCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { reserveCar, carCreated, carRemoved } = carsSlice.actions;
export default carsSlice.reducer;
