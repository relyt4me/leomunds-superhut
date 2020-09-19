import React from 'react';
import './CategoryCard.css';
import propTypes from 'prop-types';
import shelfIcon from '../../assets/stand.png';

const CategoryCard = ({ name }) => {
  return (
    <article className='category-card'>
      <img src={shelfIcon} className='bag-icon' alt={`Items sitting on a shelf`} />
      <h3 className='category-card-title'>{name}</h3>
    </article>
  );
};

CategoryCard.propTypes = {
  name: propTypes.string,
};

export default CategoryCard;
