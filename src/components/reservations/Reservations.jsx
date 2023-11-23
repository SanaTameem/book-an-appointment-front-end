import React, { useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchCarById } from '../../redux/features/carsAction';
import { createCarReservation } from '../../redux/features/reservationAction';
import Navbar from '../Navbar';
import SkeletonLoading from '../cars/SkeletonLoading';

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

const Reservations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { carById, isLoading } = useSelector((state) => state.cars);
  const { userId } = JSON.parse(localStorage.getItem('Token')) || {};
  const userData = JSON.parse(localStorage.getItem('Token')) || {};
  const [data, dispatchData] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch(fetchCarById({ userId, carId: id }));
  }, [dispatch, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      reservation: {
        reserved_date: data.reserveDate,
        start_city: data.startCity,
        destination_city: data.distnation_city,
        user_id: userData.id,
        car_id: carById.id,
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
        {isLoading ? (<SkeletonLoading />) : (
          <form onSubmit={handleSubmit} className="nav-reserve-form">
            <div className="card m-4 nav-reserve-div">
              <div className="card-header header-title">
                <div className="col-12 d-flex justify-content-center">
                  <h3>Reserve Cars Now</h3>
                </div>
              </div>
              <div className="card-body form-body-main-div">
                <div className="row d-flex flex-column flex-md-row gap-0 w-100 py-1 form-body-nested-div">
                  <div className="col form-body-nested-div-2">
                    <div className="col col-md-8">
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="form-control border-color read-only"
                        value={userData.username}
                        readOnly
                        onChange={(e) => dispatchData({
                          type: 'SET_FIELD',
                          field: 'username',
                          value: e.target.value,
                        })}
                      />
                    </div>
                    <div className="col col-md-8">
                      <label htmlFor="carName" className="form-label">
                        Car Model
                      </label>
                      <input
                        type="text"
                        id="carName"
                        className="form-control border-color read-only"
                        value={carById.model}
                        readOnly
                        onChange={(e) => dispatchData({
                          type: 'SET_FIELD',
                          field: 'carName',
                          value: e.target.value,
                        })}
                      />
                    </div>
                    <div className="col col-md-8">
                      <label htmlFor="startLocation" className="form-label">
                        From City
                      </label>
                      <input
                        value={data.startCity}
                        onChange={(e) => dispatchData({
                          type: 'SET_FIELD',
                          field: 'startCity',
                          value: e.target.value,
                        })}
                        type="text"
                        className="form-control border-color"
                        id="startLocation"
                      />
                    </div>
                  </div>
                  <div className="col form-body-nested-div-2">
                    <div className="col col-md-8">
                      <label htmlFor="destination" className="form-label">
                        To Destination
                      </label>
                      <input
                        value={data.distnation_city}
                        onChange={(e) => dispatchData({
                          type: 'SET_FIELD',
                          field: 'distnation_city',
                          value: e.target.value,
                        })}
                        type="text"
                        className="form-control border-color"
                        id="destination"
                      />
                    </div>
                    <div className="col col-md-8">
                      <label htmlFor="reserved-date" className="form-label">
                        Reserved Date select
                      </label>
                      <input
                        value={data.reserveDate}
                        onChange={(e) => dispatchData({
                          type: 'SET_FIELD',
                          field: 'reserveDate',
                          value: e.target.value,
                        })}
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
        )}

      </div>
      <ToastContainer />
    </>
  );
};

export default Reservations;
