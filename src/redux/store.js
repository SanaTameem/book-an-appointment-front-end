import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./features/carsSlice";

const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});

export default store;
