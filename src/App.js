import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import AddCarsForm from './app/cars/AddCarsForm';

const App = () => (
  <div className="container-fluid main-height ">
    <main className="col">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route exact path="/" element={<AddCarsForm />} />
        </Route>
      </Routes>
    </main>
  </div>
);

export default App;
