import React, { Component } from 'react';
import './SingleCategoryDisplay.css';
import { getItemsInCategory } from '../../helpers/apiCalls';
import PropTypes from 'prop-types';
import ItemCard from '../ItemCard/ItemCard';

class SingleCategoryDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsInCategory: [],
    };
  }

  createCards() {
    return this.state.itemsInCategory.map((item) => {
      return <ItemCard item={item} setError={this.props.setError} />;
    });
  }

  componentDidMount() {
    getItemsInCategory(this.props.categoryId)
      .then((results) => {
        this.setState({ itemsInCategory: results });
      })
      .catch((error) => {
        this.props.setError('Bandits have blocked this trade route. Ill get my best sellswords on it');
      });
  }

  render() {
    const isLoading = !this.state.itemsInCategory.length;
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
  categoryId: PropTypes.string,
};
