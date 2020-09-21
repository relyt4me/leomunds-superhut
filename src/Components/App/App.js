import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Welcome from '../Welcome/Welcome';
import CategoriesDisplay from '../CategoriesDisplay/CategoriesDisplay';
import ErrorPage from '../ErrorPage/ErrorPage';
import SingleCategoryDisplay from '../SingleCategoryDisplay/SingleCategoryDisplay';
import Cart from '../Cart/Cart';
import { Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      error: '',
      pageTitle: "Leomund's Superhut",
    };
  }

  addItemToCart = (item) => {
    this.setState({ cartItems: [...this.state.cartItems, item] });
  };

  removeItem = (index) => {
    let foundIndex = this.state.cartItems.findIndex((item) => {
      return item.index === index;
    });

    if (foundIndex === undefined) {
      return;
    }
    const copyOfCart = this.state.cartItems;
    copyOfCart.splice(foundIndex, 1);
    this.setState({ cartItems: copyOfCart });
  };

  clearCart = () => {
    this.setState({ cartItems: [] });
  };

  changePageTitle = (newTitle) => {
    this.setState({ pageTitle: newTitle });
  };

  setError = (errorMsg) => {
    this.setState({ error: errorMsg });
  };

  render() {
    const { cartItems, error, pageTitle } = this.state;
    return (
      <div className='App'>
        <Header pageTitle={pageTitle} cart={cartItems} />
        <Switch>
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
              return <CategoriesDisplay setError={this.setError} changePageTitle={this.changePageTitle} addItemToCart={this.addItemToCart} />;
            }}
          />
          <Route
            path='/error'
            render={() => {
              return <ErrorPage error={this.state.error} setError={this.setError} />;
            }}
          />
          <Route
            path='/:category/items'
            render={({ match }) => {
              return (
                <SingleCategoryDisplay
                  setError={this.setError}
                  categoryId={match.params.category}
                  addItemToCart={this.addItemToCart}
                  changePageTitle={() => {
                    this.changePageTitle(match.params.category);
                  }}
                />
              );
            }}
          />
          <Route
            path='/cart'
            render={() => {
              return <Cart cartItems={this.state.cartItems} clearCart={this.clearCart} removeItem={this.removeItem} changePageTitle={this.changePageTitle} />;
            }}
          />
          <Route
            render={() => {
              return <ErrorPage error={this.state.error} setError={this.setError} />;
            }}
          />
        </Switch>
        {error && <Redirect to='/error' />}
      </div>
    );
  }
}

export default App;
