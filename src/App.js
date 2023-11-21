import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import AddCarsForm from './components/cars/AddCarsForm';
import MainPage from './components/cars/MainPage';
import DeleteCar from './components/cars/DeleteCar';
import Reservations from './components/reservations/Reservations';
import CarDetails from './components/cars/CarDetails';
import MyReservation from './components/reservations/myReservation';
import CarReservation from './components/reservations/reserveCar';

const App = () => (
  <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<RequireAuth />}>
        <Route exact path="/newCar" element={<AddCarsForm />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/details/:id" element={<CarDetails />} />
        <Route path="/cars/delete" element={<DeleteCar />} />
        <Route path="/reservationsList" element={<MyReservation />} />
        <Route path="/reservations/:id" element={<Reservations />} />
        <Route path="/reserveCars" element={<CarReservation />} />
      </Route>
    </Routes>
  </>
);

export default App;
