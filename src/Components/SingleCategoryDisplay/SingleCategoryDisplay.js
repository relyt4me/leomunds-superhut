import React, { Component } from 'react';
import './SingleCategoryDisplay.css';
import { getCategories } from '../../helpers/apiCalls';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ItemCard from '../ItemCard/ItemCard;

class SingleCategoryDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsInCategory: [],
    };
  }

  createCards() {
    return this.state.itemsInCategory.map((item) => {
      return (
          <ItemCard item={item} />
      );
    });
  }

  componentDidMount() {
    getCategories()
      .then((results) => {
        this.setState({ categories: results });
      })
      .catch((error) => {
        this.props.setError('Vecna has attacked out stores!! Please come back after an adventurer cleans this up.');
      });
  }

  render() {
    const isLoading = !this.state.categories.length;
    return (
      <section className='categories-display'>
        {isLoading && <h1>Loading...</h1>}
        {!isLoading && this.createCards()}
      </section>
    );
  }
}

export default SingleCategoryDisplay;

SingleCategoryDisplay.propTypes = {
  setError: PropTypes.func,
};

