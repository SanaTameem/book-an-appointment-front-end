import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { addNewCars, fetchCars } from '../../redux/features/carsAction';
import Navbar from '../Navbar';
import 'react-toastify/dist/ReactToastify.css';

// Define the initial state for the reducer
const initialState = {
  name: '',
  image: '',
  model: '',
  financeFee: '',
  totalAmount: '',
  discription: '',
  duration: '',
  pending: 'Add Cars',
};

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_PENDING':
      return { ...state, pending: action.value };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

const AddCarsForm = () => {
  const dispatch = useDispatch();
  const { id } = JSON.parse(localStorage.getItem('Token')) || {};
  // Use useReducer hook to manage state
  const [state, localDispatch] = useReducer(reducer, initialState);
  // Destructure values from the state
  const {
    name,
    image,
    model,
    financeFee,
    totalAmount,
    discription,
    duration,
    pending,
  } = state;

  const fieldHandlers = (field, value) => {
    localDispatch({ type: 'SET_FIELD', field, value });
  };

  const postDispatcher = () => {
    console.log('auth before dispatch:', id);
    const carsDetail = {
      name,
      image,
      model,
      finance_fee: financeFee,
      total_amount: totalAmount,
      discription,
      duration,
    };

    localDispatch({ type: 'SET_PENDING', value: '...Adding' });

    console.log('auth object:', id);
    dispatch(addNewCars({ car: carsDetail, id }))
      .then(() => {
        toast.success('Car added successfully!');
        localDispatch({ type: 'RESET_FORM' }); // Reset form data
      })
      .catch((error) => {
        toast.error(`Error adding car: ${error.message}`);
      })
      .finally(() => {
        dispatch(fetchCars(id));
        localDispatch({ type: 'SET_PENDING', value: 'Add Cars' });
      });
  };

  return (
    <>
      <Navbar />
      <div className="Add-car-container container mt-3">
        <div className="card">
          <div className="card-header header-title">
            <div className="col-12 d-flex justify-content-center">
              <h3>ADD CARS</h3>
            </div>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3 row">
                <div className="col-sm-12 col-md-6 mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="cars_name"
                    id="cars_id"
                    placeholder="Cars title"
                    value={name}
                    onChange={(e) => fieldHandlers('name', e.target.value)}
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="cars_photo"
                    id="cars_photo"
                    placeholder="Enter Image URL"
                    value={image}
                    onChange={(e) => fieldHandlers('image', e.target.value)}
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="cars_model"
                    id="cars_model"
                    placeholder="Cars model"
                    value={model}
                    onChange={(e) => fieldHandlers('model', e.target.value)}
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="cars_financefee"
                    id="cars_financefee"
                    placeholder="Cars finance fee"
                    value={financeFee}
                    onChange={(e) => fieldHandlers('financeFee', e.target.value)}
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="cars_totalAmount"
                    id="cars_totalAmount"
                    placeholder="Cars total Amount"
                    value={totalAmount}
                    onChange={(e) => fieldHandlers('totalAmount', e.target.value)}
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="cars_duration"
                    id="cars_Duration"
                    placeholder="Cars Duration"
                    value={duration}
                    onChange={(e) => fieldHandlers('duration', e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    cols="30"
                    rows="3"
                    className="form-control"
                    type="text"
                    name="cars_discription"
                    id="cars_Discription"
                    placeholder="Cars Discription"
                    value={discription}
                    onChange={(e) => fieldHandlers('discription', e.target.value)}
                  />
                </div>
                <div className="mb-3 d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-primary add-btn"
                    type="button"
                    name="Add-Cars"
                    id="AddCars"
                    onClick={postDispatcher}
                  >
                    {pending}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddCarsForm;
