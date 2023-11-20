// MyReservation component
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchReservedCars } from '../../redux/features/reservationAction';
import ReservationList from './reservationList';
import Navbar from '../Navbar';

const MyReservation = () => {
  const dispatch = useDispatch();
  const reservationsList = useSelector((state) => state.reservations.reservedCars);
  console.log('The reservation List', reservationsList);
  const loading = useSelector((state) => state.reservations.loading);
  const showError = useSelector((state) => state.reservations.showError);

  useEffect(() => {
    dispatch(fetchReservedCars());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="reservation-page-container">
        <div className="col-12 mt-3 d-flex justify-content-center">
          <h3>Reserved CARS</h3>
        </div>
        {loading && <p>Loading reservations...</p>}
        {showError && (
          <p>
            Error:
            {showError}
          </p>
        )}
        <ReservationList
          reservations={reservationsList}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default MyReservation;
