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
      pageTitle: "Leomund's Superhut",
    };
  }

  changePageTitle = (newTitle) => {
    this.setState({ pageTitle: newTitle });
  };

  render() {
    const { cartItems, error, pageTitle } = this.state;
    return (
      <div className='App'>
        <Header pageTitle={pageTitle} cart={cartItems} />
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
            this.changePageTitle("Leomund's Superhut");
            return <CategoriesDisplay />;
          }}
        />
        <Route
          path='/error'
          render={() => {
            this.changePageTitle("Leomund's Broken Superhut");
            return <ErrorPage />;
          }}
        />
        <Route
          path='/:category/items'
          render={({ match }) => {
            this.changePageTitle(match.params.category);
            return <SingleCategoryDisplay />;
          }}
        />
        <Route
          path='/cart'
          render={() => {
            this.changePageTitle('Cart Checkout');
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
