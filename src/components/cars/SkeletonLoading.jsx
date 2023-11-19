import React from 'react';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SkeletonLoading = () => (
  <div className=" container-md d-flex flex-column flex-lg-column gap-lg-4 flex-xl-row  p-1 ms-md-5 ms-lg-2">
    <div className="col skeleton skeleton-img w-100">
      <img
        alt=""
        className="img-fluid w-100 skeleton skeleton-img  rounded-1"
      />
    </div>
    <div className="col-xl-4">
      <ul className="list-group w-100 h-100">
        <li className="list-group-item skeleton skeleton-text  d-flex justify-content-end border-0" />
        <li className="list-group-item skeleton skeleton-text border-0">
          <p className="text-right" />
        </li>
        <li className="list-group-item skeleton skeleton-text group-item d-flex justify-content-between gap-5">
          <span />
        </li>
        <li className="list-group-item skeleton skeleton-text group-item d-flex justify-content-between gap-5">
          <span />
        </li>
        <li className="list-group-item skeleton skeleton-text group-item d-flex justify-content-between gap-5">
          <span />
        </li>
        <li className="list-group-item skeleton skeleton-text group-item d-flex justify-content-between gap-5">
          <span />
        </li>
        <li className="list-group-item skeleton skeleton-text border-0 mt-1">
          <p />
        </li>
      </ul>
      <div className="d-flex w-100 justify-content-end">
        <button
          type="button"
          className="btn  skeleton skeleton-button  rounded-5 px-4 py-2 "
        >
          <span className="me-3 text-light">Reserve</span>
          <FontAwesomeIcon
            icon={faArrowCircleRight}
            style={{ color: '#ffffff' }}
          />
        </button>
      </div>
    </div>
  </div>
);

export default SkeletonLoading;
