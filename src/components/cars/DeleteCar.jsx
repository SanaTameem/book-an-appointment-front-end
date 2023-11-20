import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCar, fetchCars } from '../../redux/features/carsAction';
import Navbar from '../Navbar';

function DeleteCar() {
  const dispatch = useDispatch();
  const carData = useSelector((state) => state.cars.cars);
  useEffect(() => {
    dispatch(fetchCars());
  }, [carData.length, dispatch]);

  const handleDelete = (carId, userId, authToken) => {
    dispatch(deleteCar({ carId, userId, authToken }));
  };

  return (
    <>
      <Navbar />
      <div className="delete-car-container">
        {carData.map((item) => (
          <div className="delete-item" key={item.id}>
            <img src={item.image} className="delete-item-img" alt="delete-item-img" />
            <div className="delete-details-container">
              <p className="delete-car-name">{item.name}</p>
              <p className="delete-car-model">{item.model}</p>
              <p className="delete-car-amount">{item.total_amount}</p>
            </div>
            <button type="button" className="delete-btn" onClick={() => handleDelete(item.id, item.userId, item.authToken)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default DeleteCar;
