import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { fetchCars } from '../../redux/features/carsAction';
import CarItem from './CarItem';
import Navbar from '../Navbar';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import '../../assets/css/carousel.css';

const MainPage = () => {
  const dispatch = useDispatch();
  const carsData = useSelector((state) => state.cars.cars);
  const loading = useSelector((state) => state.cars.loading);
  const error = useSelector((state) => state.cars.error);

  const { id } = JSON.parse(localStorage.getItem('Token')) || {};
  useEffect(() => {
    dispatch(fetchCars(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        role="status"
      >
        Loading....
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        Error:
        {error}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ width: '100%' }} className="mainpage-container">
        <div>
          <div className="d-flex justify-content-center align-items-center flex-column mb-2 mt-5">
            <h1>Private Cars</h1>
            <small className="text-muted"> (Swipe to see more)</small>
          </div>
          {carsData && carsData.length > 0 ? (
            <Swiper
              pagination={{ clickable: true }}
              navigation
              modules={[Pagination, Navigation]}
              className="mySwiper"
              breakpoints={{
                375: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                760: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
            >
              {carsData.map((car) => (
                <SwiperSlide key={car.id}>
                  <CarItem
                    key={car.id}
                    car={car}
                    classNames={{
                      button: 'btn-slide m-2',
                      carBody: '',
                      imageContainer: 'image-container mb-2',
                      image: 'mb-2',
                      title: 'slide-title fw-bold text-uppercase',
                      description: 'slide-description text-muted',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>No cars available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
