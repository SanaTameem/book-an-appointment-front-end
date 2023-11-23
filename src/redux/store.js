import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './features/carsSlice';
import reservationsReducer from './features/reservationSlice';

const store = configureStore({
  reducer: {
    cars: carsReducer,
    reservations: reservationsReducer,
  },
});

export default store;
