import React from "react";
import {Link} from "react-router-dom";

import pic1 from "../imgs/avocado_toast.jpg";
import pic2 from "../imgs/oreos_and_milk.jpg";
import './Home.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      isFetching: false,
    };
  }

  async componentDidMount() {
    this.setState({...this.state, isFetching: true});
    try {
      this.setState({...this.state, isFetching: false, recipes: await this.getAllRecipes()});
    } catch (e) {
      console.log(e);
      alert('Error occurred grabbing all the recipes');
      this.setState({...this.state, isFetching: false});
    }
  }

  async getAllRecipes() {
    const response = await fetch("http://localhost:3001/api/recipe");
    if (!response.ok) {
      console.log(response);
      throw Error('Non 200 response code...');
    }
    const recipes = await response.json();
    return recipes;
  }

  generateRecipesDom() {
    return this.state.recipes.map((recipe) => {
      return <Link to={`/recipe?title=${encodeURIComponent(recipe.title)}`} key={recipe._id}>{recipe.title}</Link>
    });
  }

  render() {
    return (
      <section id="home">
        <h1>Welcome to Grocery Prep</h1>
        <p>Your one stop shop for all things grocery and meal planning related</p>
        <p>Feel free to check out some of the recipes below. I hope you enjoy!</p>

        <h2>Recipes</h2>

        {this.state.isFetching ?
          <p>Loading recipes...</p> :
          <div id="recipes-holder">
            {this.generateRecipesDom()}
          </div>
        }

        <div id="img-holder">
          <img src={pic1} alt="Avacado Toast" height="200" />
          <img src={pic2} alt="Oreos and Milk" height="200" />
        </div>
      </section>
    );
  }
}
