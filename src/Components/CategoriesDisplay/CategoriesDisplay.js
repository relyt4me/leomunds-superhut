import React, { Component } from 'react';
import './CategoriesDisplay.css';
import { getCategories } from '../../helpers/apiCalls';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CategoriesDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  createCards() {
    return this.state.categories.map((category) => {
      return <h2>{category.name}</h2>;
    });
  }

  componentDidMount() {
    getCategories()
      .then((results) => {
        this.setState({ categories: results });
      })
      .catch((error) => console.log(error));
  }

  render() {
    if (this.state.categories.length) {
      return <section className='categories-display'>{this.createCards()}</section>;
    } else {
      return <h1>Loading.....</h1>;
    }
  }

  // resultsList = props.drinksList.map((drink) => {
  //   const alcoholContent = props.nonAlcoholicDrinks.find((nonAlcDrink) => nonAlcDrink.idDrink === drink.idDrink);
  //   return (
  //     <Link to={`/recipe/${drink.idDrink}/${drink.strDrink}`} key={drink.idDrink}>
  //       <DrinkCard id={drink.idDrink} name={drink.strDrink} image={drink.strDrinkThumb} alcoholContent={alcoholContent} />
  //     </Link>
  //   );
  // });
  // return <section className='categories-display'>CategoriesDisplay</section>;
}

export default CategoriesDisplay;

CategoriesDisplay.propTypes = {
  // logoutUser: PropTypes.func
};
