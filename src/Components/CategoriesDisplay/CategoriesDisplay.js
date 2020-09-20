import React, { Component } from 'react';
import './CategoriesDisplay.css';
import { getCategories } from '../../helpers/apiCalls';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CategoryCard from '../CategoryCard/CategoryCard';

class CategoriesDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  createCards() {
    return this.state.categories.map((category) => {
      return (
        <Link to={`/${category.index}`} className='card-holder'>
          <CategoryCard name={category.name} />
        </Link>
      );
    });
  }

  componentDidMount() {
    getCategories()
      .then((results) => {
        this.setState({ categories: results });
      })
      .catch((error) => this.props.setError('Vecna has attacked out stores!! Please come back after an adventurer cleans this up.'));
  }

  render() {
    if (this.state.categories.length) {
      return <section className='categories-display'>{this.createCards()}</section>;
    } else {
      return <h1>Loading.....</h1>;
    }
  }
}

export default CategoriesDisplay;

CategoriesDisplay.propTypes = {
  setError: PropTypes.func,
};
