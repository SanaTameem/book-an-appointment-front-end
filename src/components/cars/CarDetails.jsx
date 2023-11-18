import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { fetchCars } from '../../redux/features/carsSlice';
import Navbar from '../Navbar';

function CarDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const intId = parseInt(id, 10);
  const carData = useSelector((state) => state.cars.cars);
  const carDetails = carData.filter((item) => item.id === intId);
  useEffect(() => {
    if (carData.length === 0) {
      dispatch(fetchCars());
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      {carDetails.map((item) => (
        <div className="details-page" key={item.id}>
          <div className="img-container">
            <img src={item.image} alt="car-img" className="details-img" />
          </div>
          <div className="details-container">
            <div className="car-name-container">
              <p className="car-name">{item.name}</p>
              <p className="car-model">{item.model}</p>
            </div>
            <div className="car-amount-container">
              <p className="car-finance">
                <span>Finance Fee</span>
                <span>{item.finance_fee}</span>
              </p>
              <p className="car-total">
                <span>Total Amount</span>
                <span>{item.total_amount}</span>
              </p>
              <p className="car-duration">
                <span>Duration</span>
                <span>{item.duration}</span>
              </p>
            </div>
            <p className="discount">Enjoy 5.9% OFF Today! Reserve now for exclusive savings! 🛍️✨</p>
            <button type="button" className="reserve-btn">
              <FontAwesomeIcon icon={faGear} className="setting-icon" />
              Reserve
              <FontAwesomeIcon icon={faCircleChevronRight} className="setting-icon" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default CarDetails;
