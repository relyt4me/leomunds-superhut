import React, { Component } from 'react';
import './ItemCard.css';
import propTypes from 'prop-types';
import handIcon from '../../assets/telekinesis.png';
import { getItem } from '../../helpers/apiCalls';

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'Gold',
      cost: 0,
      name: 'New Item',
      index: '',
    };
  }

  componentDidMount() {
    getItem(this.props.item.index)
      .then((item) => {
        this.setState({ currency: item.cost.unit, cost: item.cost.quantity, name: item.name, index: item.index });
      })
      .catch((error) => this.props.setError('One of the items must have become possessed come back once we have dispelled this curse'));
  }

  render() {
    const { currency, cost, name } = this.state;
    return (
      <article className='item-card'>
        <p className='item-card-cost'>
          Cost: <br></br> {cost} {currency}
        </p>
        <h3 className='item-card-title'>{name}</h3>
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
