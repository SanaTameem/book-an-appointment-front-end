import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import AddCarsForm from './components/cars/AddCarsForm';
// import Navbar from './components/Navbar';
import MainPage from './components/cars/MainPage';
import DeleteCar from './components/cars/DeleteCar';
import Reservations from './components/reservations/Reservations';
import CarDetails from './components/cars/CarDetails';

const App = () => (
  // <div className="container-fluid main-height ">
  // <main className="col">
  <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<RequireAuth />}>
        <Route exact path="/newCar" element={<AddCarsForm />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/details/:id" element={<CarDetails />} />
        <Route path="/cars/delete" element={<DeleteCar />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservations/:carId" element={<Reservations />} />
      </Route>
    </Routes>
  </>
  // </main>
  // </div>
);

export default App;
