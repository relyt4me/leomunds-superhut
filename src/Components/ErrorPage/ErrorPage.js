import React from 'react';
import './ErrorPage.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ErrorPage = ({ error, setError }) => {
  return (
    <section className='page-error'>
      <h2>{error}</h2>
      <Link to={'/'}>
        <button className='return-home-button' onClick={() => setError('')}>
          Return Home
        </button>
      </Link>
    </section>
  );
};

export default ErrorPage;

ErrorPage.propTypes = {
  setError: PropTypes.func,
  error: PropTypes.string,
};
