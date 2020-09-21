import React, { Component } from 'react';
import './CategoriesDisplay.css';
import { getCategories, getItem } from '../../helpers/apiCalls';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CategoryCard from '../CategoryCard/CategoryCard';
import ItemCard from '../ItemCard/ItemCard';

class CategoriesDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      searchPhrase: '',
      foundSearchItem: {},
      badSearch: false,
    };
  }

  createCards() {
    return this.state.categories.map((category) => {
      return (
        <Link to={`/${category.index}/items`} className='card-holder' key={category.index}>
          <CategoryCard name={category.name} />
        </Link>
      );
    });
  }

  componentDidMount() {
    this.props.changePageTitle("Leomund's Superhut");
    getCategories()
      .then((results) => {
        this.setState({ categories: results });
      })
      .catch((error) => {
        this.props.setError('Vecna has attacked out stores!! Please come back after an adventurer cleans this up.');
      });
  }

  updateSearch = (event) => {
    this.setState({ searchPhrase: event.target.value });
  };

  searchForItem = (event) => {
    const { searchPhrase } = this.state;
    event.preventDefault();
    const convertedSearch = searchPhrase.toLocaleLowerCase().replace(' ', '-');
    getItem(convertedSearch)
      .then((item) => {
        this.setState({ foundSearchItem: item, badSearch: false });
      })
      .catch((error) => this.setState({ badSearch: true, foundSearchItem: {} }));
  };

  render() {
    const isLoading = !this.state.categories.length;
    const { searchPhrase, badSearch, foundSearchItem } = this.state;
    return (
      <section className='categories-display'>
        <form className='search-bar'>
          <label htmlFor='search' className='search-label'>
            Enter an item name you would find in the players handbook:
          </label>
          <input type='text' id='search' className='search-input' onChange={this.updateSearch} value={searchPhrase}></input>
          <button aria-label='Find' onClick={this.searchForItem}>
            Search
          </button>
        </form>
        {badSearch && <h1 className='search-error'>We could not find that item in our stores check the spelling or try a different search</h1>}
        {foundSearchItem.index && <ItemCard item={foundSearchItem} setError={this.props.setError} addItemToCart={this.props.addItemToCart} />}
        {isLoading && <h1>Loading...</h1>}
        {!isLoading && this.createCards()}
      </section>
    );
  }
}

export default CategoriesDisplay;

CategoriesDisplay.propTypes = {
  setError: PropTypes.func,
  changePageTitle: PropTypes.func,
  addItemToCart: PropTypes.func,
};
