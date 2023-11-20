import React from 'react';
import PropTypes from 'prop-types';

const ReservationList = ({ reservations, onRemoveReservation }) => (
  <>
    <div className="m-3">
      {reservations && reservations.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="col">
              <div className="card h-100">
                <div className="card-body d-flex flex-column align-items-center">
                  <h5 className="card-title mb-3">
                    <img
                      src={reservation.carImage}
                      alt="Car"
                      className="img-fluid rounded-start"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </h5>
                  <p className="card-text">
                    <strong>Reserved Date:</strong>
                    {' '}
                    {reservation.reserved_date}
                  </p>
                  <div className="city-container d-flex flex-column align-items-center ">
                    <div className="city ml-4">
                      <strong>Start City:</strong>
                      {' '}
                      {reservation.start_city}
                    </div>
                    <div className="arrow">&#124;</div>
                    <div className="arrow">&#8595;</div>
                    {' '}
                    {/* Down arrow */}
                    <div className="city">
                      <strong>Destination City:</strong>
                      {' '}
                      {reservation.destination_city}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onRemoveReservation(reservation.id)}
                    >
                      Cancel Reservation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reservations available.</p>
      )}
    </div>
  </>
);

ReservationList.propTypes = {
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      reserved_date: PropTypes.string.isRequired,
      start_city: PropTypes.string.isRequired,
      destination_city: PropTypes.string.isRequired,
      user_id: PropTypes.number.isRequired,
      car_id: PropTypes.number.isRequired,
      carImage: PropTypes.string.isRequired,
    }),
  ),
  onRemoveReservation: PropTypes.func.isRequired,
};

ReservationList.defaultProps = {
  reservations: [],
};

export default ReservationList;
