import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import horseAndCart from '../../assets/horse-cart.png';

const Header = ({ pageTitle, cart }) => {
  return (
    <header>
      <button className='return-to-storefront-button'>Return to Storefront</button>
      <h1 className='page-title'>{pageTitle}</h1>
      <button className='my-cart-button'>
        My Cart {cart.length}
        <img src={horseAndCart} className='horse-cart-img' alt={`Horse pulling a cart`} />
      </button>
    </header>
  );
};

export default Header;

Header.propTypes = {
  pageTitle: PropTypes.string,
  cart: PropTypes.array,
};
