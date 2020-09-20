import React, { Component } from 'react';
import './ItemCard.css';
import propTypes from 'prop-types';
import handIcon from '../../assets/telekinesis.png';

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: '',
      cost: 0,
      name: '',
      index: '',
    };
  }

  render() {
    const { currency, cost, name } = this.state;
    return (
      <article className='item-card'>
        <div className='item-card-cost'>
          Cost: {cost} {currency}
        </div>
        <h3 className='category-card-title'>{name}</h3>
        <button className='add-item-button'>
          Add to Cart
          <img src={handIcon} className='hand-icon' alt={`Item floating in hand`} />
        </button>
      </article>
    );
  }
}

ItemCard.propTypes = {
  item: propTypes.object,
};

export default ItemCard;
