import React from 'react';
import './Welcome.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <section className='page-welcome'>
      <h2>Welcome to Leomund's Superhut</h2>
      <p>
        To assist Dungeon Masters in running any town shop for your players inquiries. The Superhut can create a cart of items as the players request them and store the cost for you as a DM to see later. You can select categories from the storefront and browse our shelves adding things you see to your cart. Alternatively, you can search for any item by name in our searchbar and add the item there.
        After all the items have been gathered, select your cart to see the total gold value for your shopping list. If your players want to haggle for cost or if your looking to up the value in your town use the price adjust selector. You can always go to your cart to delete individual items the players no longer want or clear the cart all together to start over.
      </p>
      <Link to={'/storefront'}>
        <button className='get-started-button'>Get Started at the Storefront</button>
      </Link>
    </section>
  );
};

export default Welcome;

Welcome.propTypes = {
  pageTitle: PropTypes.string,
  cart: PropTypes.array,
};
