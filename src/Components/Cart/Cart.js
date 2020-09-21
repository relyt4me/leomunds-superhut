import React, { Component } from 'react';
import './Cart.css';
import PropTypes from 'prop-types';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceModify: 0,
    };
  }

  componentDidMount() {
    this.props.changePageTitle('Cart Checkout');
  }

  createCartList = () => {
    return this.props.cartItems.map((item) => {
      const { name, cost, currency, index } = item;
      return (
        <li className='cart-item' key={index}>
          <h3 className='cart-item-title'>{name}</h3>
          <p className='cart-item-cost'>
            {cost} {currency}
          </p>
          <button className='cart-item-button' onClick={() => this.props.removeItem(index)}>
            Remove
          </button>
        </li>
      );
    });
  };

  addAllCosts = () => {
    return this.props.cartItems.reduce((totalCost, item) => {
      let convertedCost;
      if (item.currency === 'gp') {
        convertedCost = item.cost * 100;
      } else if (item.currency === 'sp') {
        convertedCost = item.cost * 10;
      } else if (item.currency === 'cp') {
        convertedCost = item.cost;
      }

      return totalCost + convertedCost;
    }, 0);
  };

  convertCostToCurrency = (cost) => {
    const brokenCost = Math.round(cost).toString().split('');
    while (brokenCost.length < 4) {
      brokenCost.unshift('0');
    }
    const gold = brokenCost.slice(0, brokenCost.length - 2).join('');
    const silver = brokenCost[brokenCost.length - 2];
    const copper = brokenCost[brokenCost.length - 1];
    return `${gold} gp, ${silver} sp, ${copper} cp`;
  };

  updatePriceModifyInput = (event) => {
    this.setState({ priceModify: event.target.value });
  };

  render() {
    const totalCost = this.addAllCosts();
    const { priceModify } = this.state;
    return (
      <section className='cart-page'>
        <article className='cart-list'>
          <ul className='cart-list-holder'>
            <li className='cart-item cart-item-header'>
              <h3 className='cart-item-title'>Name</h3>
              <p className='cart-item-cost'>Cost</p>
              <button className='clear-cart-button' onClick={this.props.clearCart}>
                Clear Cart
              </button>
            </li>
            {this.createCartList()}
          </ul>
          <h3 className='cart-list-total-items'>{this.props.cartItems.length} items in your cart</h3>
        </article>
        <article className='cart-value-card'>
          <h2 className='cart-total-value'>
            <span className='cart-titles'>Total Cost: </span>
            <br></br>
            {this.convertCostToCurrency(totalCost)}
          </h2>
          <label htmlFor='price-modify' className='price-modify-label'>
            Price Modify: {priceModify * 100} %
          </label>
          <input type='range' id='price-modify' name='price-modify' min='-1' max='1' step='0.1' onChange={this.updatePriceModifyInput} value={priceModify}></input>
          <h3 className='modified-total'>
            <span className='cart-titles'>Modified Total: </span>
            <br></br>
            {this.convertCostToCurrency(totalCost + totalCost * priceModify)}
          </h3>
        </article>
      </section>
    );
  }
}

export default Cart;

Cart.propTypes = {
  cartItems: PropTypes.array,
  removeItem: PropTypes.func,
  clearCart: PropTypes.func,
  changePageTitle: PropTypes.func,
};
