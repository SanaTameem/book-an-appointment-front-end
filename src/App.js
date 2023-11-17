import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';

const App = () => (
  <div className="container-fluid main-height ">
    <main className="col">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route element={<RequireAuth />} />
      </Routes>
    </main>
  </div>
);

export default App;
