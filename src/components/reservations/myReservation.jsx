// MyReservation component
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchReservedCars, removeCarReservation } from '../../redux/features/reservationAction';
import ReservationList from './reservationList';
import Navbar from '../Navbar';

const MyReservation = () => {
  const dispatch = useDispatch();
  const reservationsList = useSelector((state) => state.reservations.reservedCars);
  const loading = useSelector((state) => state.reservations.loading);
  const showError = useSelector((state) => state.reservations.showError);

  useEffect(() => {
    dispatch(fetchReservedCars());
  }, [dispatch]);
  const handleRemoveReservation = (reservationID) => {
    dispatch(removeCarReservation(reservationID))
      .then(() => {
        toast.success('Reservation removed successfully');
        dispatch(fetchReservedCars());
      })
      .catch((error) => {
        toast.error(`Failed to remove reservation: ${error.message}`);
      });
  };
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
          onRemoveReservation={handleRemoveReservation}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default MyReservation;
