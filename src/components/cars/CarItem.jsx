import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCarById } from '../../redux/features/carsAction';

const CarItem = ({ car, classNames }) => {
  const { id } = JSON.parse(localStorage.getItem('Token')) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDispatch = (carId) => {
    dispatch(fetchCarById({ userId: id, carId }));
    navigate(`/details/${carId}`);
  };

  return (
    <li style={{ width: '18rem' }}>
      <button
        onClick={() => handleDispatch(car.id)}
        className={classNames.button}
        type="button"
      >
        <div className={classNames.carBody}>
          <div className={classNames.imageContainer}>
            <img
              src={car.image}
              alt={car.name}
              className={classNames.image}
            />
          </div>
          <h6 className={classNames.title}>{car.name}</h6>
          <p className={classNames.discription}>{car.discription}</p>
        </div>
      </button>
    </li>
  );
};

CarItem.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    discription: PropTypes.string.isRequired,
  }).isRequired,
  classNames: PropTypes.shape({
    button: PropTypes.string,
    carBody: PropTypes.string,
    imageContainer: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    discription: PropTypes.string,
  }).isRequired,
};

export default CarItem;
