import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import CategoriesDisplay from '../CategoriesDisplay/CategoriesDisplay';
import ErrorPage from '../ErrorPage/ErrorPage';
import SingleCategoryDisplay from '../SingleCategoryDisplay/SingleCategoryDisplay';
import Cart from '../Cart/Cart';
// import SingleItemDisplay from '../SearchItemDisplay/SearchItemDisplay'
import { Route } from 'react-router-dom';

class APP extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      error: '',
    };
  }

  render() {
    return <div className='App'></div>;
  }
}

export default App;

/**
 * APP
 *  Header * Search/ Page Title/ Back to Store/ Cart
 *  (CategoriesDisplay) -Cards
 *  (ErrorPage)
 *  (Cart)
 *  (ItemDisplay)- cards
 */
