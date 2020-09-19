import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import horseAndCart from '../../assets/horse-cart.png';

const Header = ({ pageTitle, cart }) => {
  return (
    <header className='page-header'>
      <Link to={'/storefront'}>
        <button className='return-to-storefront-button'>Return to Storefront</button>
      </Link>
      <h1 className='page-title'>{pageTitle}</h1>
      <Link to={'/cart'}>
        <button className='my-cart-button'>
          My Cart
          <img src={horseAndCart} className='horse-cart-img' alt={`Horse pulling a cart`} />
          <span className='number-in-cart'>{cart.length}</span>
        </button>
      </Link>
    </header>
  );
};

export default Header;

Header.propTypes = {
  pageTitle: PropTypes.string,
  cart: PropTypes.array,
};
