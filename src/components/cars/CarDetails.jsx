import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar';
import SkeletonLoading from './SkeletonLoading';
import { fetchCarById } from '../../redux/features/carsAction';
import { reserveCar } from '../../redux/features/carsSlice';

function CarDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { carById, isLoading } = useSelector((state) => state.cars);
  const { userId } = JSON.parse(localStorage.getItem('Token')) || {};
  useEffect(() => {
    dispatch(fetchCarById({ userId, carId: id }));
  }, [dispatch, id]);

  const handleReserve = (id) => {
    dispatch(reserveCar(id));
    navigate(`/reservations/${carById.id}`);
  };

  return (
    <>
      <Navbar />
      {isLoading ? (<SkeletonLoading />) : (
        <div className="details-page">
          <div className="img-container">
            <img src={carById.image} alt="car-img" className="details-img" />
          </div>
          <div className="details-container">
            <div className="car-name-container">
              <p className="car-name">{carById.name}</p>
              <p className="car-model">{carById.model}</p>
            </div>
            <div className="car-amount-container">
              <p className="car-finance">
                <span>Finance Fee</span>
                <span>{carById.finance_fee}</span>
              </p>
              <p className="car-total">
                <span>Total Amount</span>
                <span>{carById.total_amount}</span>
              </p>
              <p className="car-duration">
                <span>Duration</span>
                <span>{carById.duration}</span>
              </p>
            </div>
            <p className="discount">Enjoy 5.9% OFF Today! Reserve now for exclusive savings! 🛍️✨</p>

            <button
              type="button"
              className="btn-color  rounded-5 px-4 py-2 "
              onClick={() => handleReserve(carById.id)}
            >
              <span className="me-3 text-light">
                {carById.reserved ? 'Not Available' : 'Reserve'}
              </span>
              <FontAwesomeIcon
                icon={faArrowCircleRight}
                style={{ color: '#ffffff' }}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CarDetails;
