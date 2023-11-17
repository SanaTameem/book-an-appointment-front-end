import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewCars, fetchCars } from '../../redux/features/carsSlice';

const AddCarsForm = () => {
  const dispatch = useDispatch();
  const { id } = JSON.parse(localStorage.getItem('Token')) || {};
  const [name, setTitle] = useState('');
  const [image, setPhoto] = useState('');
  const [model, setModel] = useState('');
  const [financeFee, setFinanceFee] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [discription, setDiscription] = useState('');
  const [duration, setDuration] = useState('');
  const [pending, setPending] = useState('Add Cars');

  const nameHandlers = (e) => setTitle(e.target.value);
  const photoHandlers = (e) => setPhoto(e.target.value);
  const modelHandlers = (e) => setModel(e.target.value);
  const financeFeeHandlers = (e) => setFinanceFee(e.target.value);
  const totalAmountHandlers = (e) => setTotalAmount(e.target.value);
  const DiscriptionHandlers = (e) => setDiscription(e.target.value);
  const DurationHandlers = (e) => {
    const value = e.target.value.trim();
    const parsedValue = value === '' ? '' : parseInt(value, 10);
    setDuration(parsedValue);
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

    setPending('...Adding');

    console.log('auth object:', id);
    dispatch(addNewCars({ car: carsDetail, id }));

    setTimeout(() => {
      dispatch(fetchCars(id));
      setPending('Add Cars');
    }, 1000);
  };

  return (
    <div className="container mt-3">
      <div className="card ">
        <div className="card-header header-title">
          <div className="col-12 d-flex justify-content-center">
            <h2>ADD NEW Cars</h2>
          </div>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                name="cars_name"
                id="cars_id"
                placeholder="Cars title"
                onChange={(e) => {
                  nameHandlers(e);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="file"
                name="cars_photo"
                id="cars_photo"
                placeholder="Cars Photo"
                onChange={(e) => {
                  photoHandlers(e);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                name="cars_model"
                id="cars_model"
                placeholder="Cars model"
                onChange={(e) => {
                  modelHandlers(e);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                name="cars_financefee"
                id="cars_financefee"
                placeholder="Cars finance fee"
                onChange={(e) => {
                  financeFeeHandlers(e);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                name="cars_totalAmount"
                id="cars_totalAmount"
                placeholder="Cars total Amount"
                onChange={(e) => {
                  totalAmountHandlers(e);
                }}
              />
            </div>
            <div className="mb-3">
              <textarea
                cols="30"
                rows="10"
                className="form-control"
                type="text"
                name="cars_discription"
                id="cars_Discription"
                placeholder="Cars Discription"
                onChange={(e) => {
                  DiscriptionHandlers(e);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                name="cars_duration"
                id="cars_Duration"
                placeholder="Cars Duration"
                onChange={(e) => {
                  DurationHandlers(e);
                }}
              />
            </div>
            <div className="mb-3 d-flex justify-content-center align-items-center">
              <button
                className="btn btn-primary"
                type="button"
                name="Add-Cars"
                id="AddCars"
                onClick={() => {
                  postDispatcher();
                }}
              >
                {pending}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCarsForm;
