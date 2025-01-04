import React, { useContext, useState } from 'react';
import './LoginPopUp.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify'; // Ensure you have toast functionality working

const LoginPopUp = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [curState, setState] = useState('Log In');
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Handle input changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Login or Sign Up logic
  const onLogin = async (e) => {
    e.preventDefault(); // Prevent form default submission

    let newUrl = url;
    if (curState === 'Sign Up') {
      newUrl += '/api/user/register'; // Sign up endpoint
    } else {
      newUrl += '/api/user/login'; // Login endpoint
    }

    try {
      // Log data for debugging
      console.log('Form Data:', data);
      const response = await axios.post(newUrl, data);
      console.log('API Response:', response); // Log response

      // Handle successful login
      if (response.data && response.data.token) {
        setToken(response.data.token); // Store token in context
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        setShowLogin(false); // Close the login popup
      } else {
        toast.error('Unexpected response format.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message); // Show error message
      } else {
        toast.error('An error occurred, please try again later.');
      }
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{curState}</h2>
          <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
        </div>
        <div className="login-popup-inputs">
          {curState !== "Log In" ? (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          ) : null}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="E-mail"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms and conditions</p>
        </div>
        <button type="submit" className="btn">
          {curState === 'Sign Up' ? 'Create Account' : 'Log In'}
        </button>

        {curState === 'Sign Up' ? (
          <p>Already have an account? <span onClick={() => setState('Log In')}>Log In</span></p>
        ) : (
          <p>Create a new account? <span onClick={() => setState('Sign Up')}>Click here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
