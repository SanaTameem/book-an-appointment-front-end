import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const LogIn = () => {
  const { reset } = useForm();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.warn('Please fill in all fields');
    }
    try {
      const response = await fetch('https://rent-a-car-96dr.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: data.email,
            password: data.password,
          },
        }),
      });

      if (response.ok) {
        const token = response.headers.get('Authorization');
        if (token) {
          toast.success(
            'You logged in successfully',
          );
          reset();
          localStorage.setItem('token', token);
          navigate('/');
        } else {
          setError('Authentication failed. Please try again.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      toast.error(
        'An error occured while creating the account, please try again',
      );
      reset();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Sign In with Email and Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleInputChange}
          />
        </div>
        {error && <p className="error">{error}</p>}
        {' '}
        <div>
          <button type="submit">
            Log in
          </button>
        </div>
      </form>
      <div>
        <p>Not registered?</p>
        <Link to="/sign_up">
          <button type="submit">Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
