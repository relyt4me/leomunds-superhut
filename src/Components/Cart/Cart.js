import React, { Component } from 'react';
import './Cart.css';
import PropTypes from 'prop-types';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCost: 0,
      modifyInput: 0,
    };
  }

  createCartList() {
    return this.props.cartItems.map((item) => {
      const { name, cost, currency, index } = item;
      return (
        <li className='cart-item' key={index}>
          <h3 className='cart-item-title'>{name}</h3>
          <p className='cart-item-cost'>
            {cost} {currency}
          </p>
          <button onClick={() => this.props.removeItem(index)}>Remove</button>
        </li>
      );
    });
  }

  addAllCosts() {
    return this.props.cartItems.reduce((totalCost, item) => {
      let convertedCost;
      if (item.currency === 'gp') {
        convertedCost = item.cost * 100;
      } else if (item.currency === 'sp') {
        convertedCost = item.cost * 10;
      } else if (item.currency === 'sp') {
        convertedCost = item.cost;
      }
      return (totalCost += convertedCost);
    }, 0);
  }

  convertCostToCurrency(cost) {
    const brokenCost = Math.round(cost).toString().split('');
    do {
      brokenCost.unshift('0');
    } while (brokenCost.length < 4);
    const gold = brokenCost.slice(0, brokenCost.length() - 2);
    const silver = brokenCost[brokenCost.length() - 2];
    const copper = brokenCost[brokenCost.length() - 1];
    return `${gold} gp, ${silver} sp, ${copper}, cp`;
  }

  updatePriceModifyInput(event) {
    this.setState({ modifyInput: event.target.value });
  }

  render() {
    const { totalCost, modifyInput } = this.state;
    return (
      <section className='cart-page'>
        <article className='cart-list'>
          <ul>
            <li className='cart-item cart-item-header'>
              <h3 className='cart-item-title'>Name</h3>
              <p className='cart-item-cost'>Cost</p>
              <button onClick={this.props.clearCart}>Clear Cart</button>
            </li>
            {this.createCartList}
          </ul>
          <h3 className='cart-list-total-items'>{this.props.cartItems.length} items in your cart</h3>
        </article>
        <article className='cart-value-card'>
          <h2 className='cart-total-value'>
            {goldTotal} gold, {silverTotal} silver, {copperTotal} copper
          </h2>
          <label htmlFor='price-modify' className='price-modify-label'>
            Price Modify: {modifyInput * 100} %
          </label>
          <input type='range' id='price-modify' name='price-modify' min='-1' max='1' step='0.1' onChange={this.updatePriceModifyInput}></input>
          <h3 className='modified-total'>{() => this.convertCostToCurrency(totalCost - totalCost * modifyInput)}</h3>
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
};
