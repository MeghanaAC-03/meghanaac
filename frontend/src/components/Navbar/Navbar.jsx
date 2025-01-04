import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext.jsx';

const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (event) => {
    // Close dropdown if clicking outside profile and dropdown
    if (!event.target.closest('.navbar-profile') && !event.target.closest('.navbar-profile-dropdown')) {
      setDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className='navbar'>
      <Link to='/'><img className="logo" src={assets.logo} alt="Logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' className={menu === 'home' ? 'active' : ''} onClick={() => setMenu('home')}>Home</Link>
        <a href='#explore-menu' className={menu === 'menu' ? 'active' : ''} onClick={() => setMenu('menu')}>Menu</a>
        <a href='#app-download' className={menu === 'mobile-app' ? 'active' : ''} onClick={() => setMenu('mobile-app')}>Mobile-App</a>
        <a href='#footer' className={menu === 'contact-us' ? 'active' : ''} onClick={() => setMenu('contact-us')}>Contact-us</a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="Search Icon" />
        <div className='navbar-cart-icon'>
          <Link to='/cart'><img src={assets.basket_icon} alt="Basket Icon" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button className='navbar-button' onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <button
              className='navbar-profile-button'
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <img src={assets.profile_icon} alt="Profile Icon" />
            </button>
            {dropdownOpen && (
              <ul className='navbar-profile-dropdown'>
                <li><img src={assets.bag_icon} alt="Bag Icon" />Orders</li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="Logout Icon" />Logout</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
