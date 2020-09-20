import React from 'react';
import './ErrorPage.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import criticalFail from '../../assets/critical-fail.jpg';

const ErrorPage = ({ error, setError }) => {
  return (
    <section className='page-error'>
      <img src={criticalFail} className='critical-fail-icon' alt={`Red 20 sided dice set on fire with a rolled number of 1`} />
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
