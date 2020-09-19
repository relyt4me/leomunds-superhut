import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Welcome from '../Welcome/Welcome';
import CategoriesDisplay from '../CategoriesDisplay/CategoriesDisplay';
import ErrorPage from '../ErrorPage/ErrorPage';
import SingleCategoryDisplay from '../SingleCategoryDisplay/SingleCategoryDisplay';
import Cart from '../Cart/Cart';
// import SingleItemDisplay from '../SearchItemDisplay/SearchItemDisplay'
import { Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      error: '',
    };
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <Route
          exact
          path='/'
          render={() => {
            return <Welcome />;
          }}
        />
        <Route
          path='/storefront'
          render={() => {
            return <CategoriesDisplay />;
          }}
        />
        <Route
          path='/error'
          render={() => {
            return <ErrorPage />;
          }}
        />
        <Route
          path='/:category/items'
          render={() => {
            return <SingleCategoryDisplay />;
          }}
        />
        <Route
          path='/cart'
          render={() => {
            return <Cart />;
          }}
        />
      </div>
    );
  }
}

export default App;

/**
 * APP
 *  Header * Search/ Page Title/ Back to Store/ Cart
 *  (Welcome)
 *  (CategoriesDisplay) -Cards
 *  (ErrorPage)
 *  (Cart)
 *  (ItemDisplay)- cards
 */
