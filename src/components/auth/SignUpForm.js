import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const { reset } = useForm();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password) {
      toast.warn('Please fill in all fields');
    }
    try {
      const response = await fetch('http://127.0.0.1:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        }),
      });

      if (response.ok) {
        toast.success(
          'You signed up successfully, you can now log-in with the email and password you just used',
        );
        localStorage.setItem('token', response.headers.get('Authorization'));
        reset();
        navigate('/login');
      }

      return null;
    } catch (error) {
      toast.error(
        'An error occured while creating the account, please try again',
      );
      reset();
    }
    return null;
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">
            Sign up
          </button>
        </div>
      </form>
      <div>
        <p>Already have an account?</p>
        <Link to="/login">
          <button type="submit">Log in</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
