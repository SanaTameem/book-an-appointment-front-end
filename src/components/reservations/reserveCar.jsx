import React, { useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchCars } from '../../redux/features/carsAction';
import { createCarReservation } from '../../redux/features/reservationAction';
import Navbar from '../Navbar';

const initialState = {
  username: '',
  carName: '',
  startCity: '',
  distnation_city: '',
  reserveDate: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

const CarReservation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carsData = useSelector((state) => state.cars.cars);
  const reservedCar = useSelector((state) => state.cars.reservedCar);
  const userData = JSON.parse(localStorage.getItem('Token')) || {};

  const [data, dispatchData] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch(fetchCars(userData.id));
  }, [dispatch, userData.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      reservation: {
        reserved_date: data.reserveDate,
        start_city: reservedCar.location || data.startCity,
        destination_city: data.distnation_city,
        user_id: userData.id,
        car_id: reservedCar.id || data.carName,
      },
    };

    try {
      await dispatch(createCarReservation(formData));
      toast.success('Reservation created successfully!');
      dispatchData({ type: 'RESET_FORM' });
      navigate('/reservationsList');
    } catch (error) {
      toast.error('Error creating reservation. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="reservation-page-container">
        <form onSubmit={handleSubmit} className="btn-reserve-form">
          <div className="card m-4 btn-reserve-div">
            <div className="card-header header-title">
              <div className="col-12 d-flex justify-content-center">
                <h3>Reserve Cars Now</h3>
              </div>
            </div>
            <div className="card-body form-body-main-div">
              <div className="row d-flex flex-column flex-md-row gap-0 w-100 py-1 form-body-nested-div">
                <div className="col form-body-nested-div-2">
                  <div className="col col-md-8 reserve-input-div">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control border-color"
                      value={userData.username}
                      onChange={(e) => dispatchData({ type: 'SET_FIELD', field: 'username', value: e.target.value })}
                    />
                  </div>
                  <div className="col col-md-8 reserve-input-div">
                    <label htmlFor="carName" className="form-label">
                      Car Name:
                    </label>
                    <select
                      className="form-select border-color"
                      value={data.carName}
                      id="carName"
                      aria-label="Default select example"
                      onChange={(e) => dispatchData({ type: 'SET_FIELD', field: 'carName', value: e.target.value })}
                    >
                      <option value="">
                        {reservedCar.id ? reservedCar.model : 'Select Car model'}
                      </option>
                      {carsData?.map((car) => (
                        <option key={car.id} value={car.id}>
                          {car.model}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col col-md-8 reserve-input-div">
                    <label htmlFor="startLocation" className="form-label">
                      From City
                    </label>
                    <input
                      value={data.startCity}
                      onChange={(e) => dispatchData({ type: 'SET_FIELD', field: 'startCity', value: e.target.value })}
                      type="text"
                      className="form-control border-color"
                      id="startLocation"
                    />
                  </div>
                </div>
                <div className="col form-body-nested-div-2">
                  <div className="col col-md-8 reserve-input-div">
                    <label htmlFor="destination" className="form-label">
                      To Destination
                    </label>
                    <input
                      value={data.distnation_city}
                      onChange={(e) => dispatchData({ type: 'SET_FIELD', field: 'distnation_city', value: e.target.value })}
                      type="text"
                      className="form-control border-color"
                      id="destination"
                    />
                  </div>
                  <div className="col col-md-8 reserve-input-div">
                    <label htmlFor="reserved-date" className="form-label">
                      Reserved Date select
                    </label>
                    <input
                      value={data.reserveDate}
                      onChange={(e) => dispatchData({ type: 'SET_FIELD', field: 'reserveDate', value: e.target.value })}
                      type="date"
                      className="form-control border-color"
                      id="reserved-date"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-3 d-flex justify-content-center align-items-center">
                    <button type="submit" className="btn-color text-light px-4">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CarReservation;
