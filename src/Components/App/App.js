import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Welcome from '../Welcome/Welcome';
import CategoriesDisplay from '../CategoriesDisplay/CategoriesDisplay';
import ErrorPage from '../ErrorPage/ErrorPage';
import SingleCategoryDisplay from '../SingleCategoryDisplay/SingleCategoryDisplay';
import Cart from '../Cart/Cart';
// import SingleItemDisplay from '../SearchItemDisplay/SearchItemDisplay'
import { Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [
        {
          currency: 'gp',
          cost: 3,
          name: 'Item1',
          index: 'item1',
        },
        {
          currency: 'sp',
          cost: 8,
          name: 'Item 2',
          index: 'item2',
        },
        {
          currency: 'cp',
          cost: 1,
          name: 'Item 3',
          index: 'item3',
        },
        {
          currency: 'gp',
          cost: 2000,
          name: 'Item 4',
          index: 'item4',
        },
      ],
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
              // this.changePageTitle("Leomund's Superhut");
              return <CategoriesDisplay setError={this.setError} />;
            }}
          />
          <Route
            path='/error'
            render={() => {
              // this.changePageTitle("Leomund's Broken Superhut");
              return <ErrorPage error={this.state.error} setError={this.setError} />;
            }}
          />
          <Route
            path='/:category/items'
            render={({ match }) => {
              // this.changePageTitle(match.params.category);
              return <SingleCategoryDisplay setError={this.setError} categoryId={match.params.category} addItemToCart={this.addItemToCart} />;
            }}
          />
          <Route
            path='/cart'
            render={() => {
              // this.changePageTitle('Cart Checkout');
              return <Cart cartItems={this.state.cartItems} clearCart={this.clearCart} removeItem={this.removeItem} />;
            }}
          />
        </Switch>
        {error && <Redirect to='/error' />}
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
