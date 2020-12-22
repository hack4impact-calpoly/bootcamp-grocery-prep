import React from "react";

import "./Recipe.css";

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: null,
      isFetching: false,
      servingSize: null,
      ratings: []
    };
  }

  async componentDidMount() {
    this.setState({ ...this.state, isFetching: true });
    try {
      const recipe = await this.getRecipe();
      this.setState({
        ...this.state,
        isFetching: false,
        recipe: recipe,
        servingSize: recipe.servings,
        ratings: recipe.ratings
      });
    } catch (e) {
      console.log(e);
      alert("Error occurred grabbing recipe");
      this.setState({ ...this.state, isFetching: false });
    }
  }

  async getRecipe() {
    const searchParams = new URLSearchParams(window.location.search);
    if (!searchParams.has('title')) {
      window.location.href = '/';
    }
    const response = await fetch(`http://localhost:3001/api/recipe/${searchParams.get('title')}`);
    if (!response.ok) {
      console.log(response);
      throw Error("Non 200 response code...");
    }
    const recipe = await response.json();
    return recipe;
  }

  addRating = async () => {
    const newRating = +(document.getElementById('rating-options')?.value);
    if (newRating < 1 || isNaN(newRating)) {
      alert('Rating must be between 1 and 5');
    } else {
      try {
        const response = await fetch('http://localhost:3001/api/rating', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({
              id: this.state.recipe._id,
              rating: newRating,
          })
        });
        if (response.ok) {
          const ratingsCopy = [...this.state.ratings, newRating];
          this.setState({...this.state, ratings: ratingsCopy})
        } else {
            alert('Could not add rating :(');
        }
      } catch (e) {
        console.log(e);
        alert("Error in adding rating");
      }
    }
  }

  addToCart = () => {
    const newIngredients = {};
    for (const {ingredient: ing, amount: amnt} of this.state.recipe.ingredients) {
      if (!amnt) {
        newIngredients[ing] = null;
      } else {
        newIngredients[ing] = this.getAdjustedServingSize(amnt);
      }
    }
    this.props.addToCart(newIngredients);
  }

  roundToTwoDecimals(val) {
    return Math.round(val * 100) / 100;
  }

  getAvgRating() {
    if (this.state.ratings.length === 0) {
      return 0;
    }
    return this.roundToTwoDecimals(this.state.ratings.reduce((a, b) => a + b) / (this.state.ratings.length));
  }

  changeServingSize(by) {
    const newServingSize = this.state.servingSize + by;
    if (newServingSize > 0) {
      this.setState({...this.state, servingSize: newServingSize});
    }
  }

  getAdjustedServingSize(baseAmount) {
    return this.roundToTwoDecimals((baseAmount / this.state.recipe.servings) * this.state.servingSize);
  }

  render() {
    const recipe = this.state.recipe;

    return this.state.isFetching || !recipe ?
      <p>Loading recipe...</p> : (
      <section id="recipe">
        <h1>{recipe.title}</h1>
        <div className="recipe-desc">
          <div className="recipe-desc-txt">
            <p>{recipe.desc}</p>
            <h3>Servings</h3>
            <div id="servings">
              <button id="decrement-serving" onClick={() => this.changeServingSize(-1)}>-</button>
              <p id="serving-size">{this.state.servingSize}</p>
              <button id="increment-serving" onClick={() => this.changeServingSize(1)}>+</button>
            </div>
            <h3 htmlFor="rating-options">Rate Me!</h3>
            <div id="ratings">
              <select defaultValue="-1" name="ratings" id="rating-options">
                <option value="-1" hidden disabled>Select Rating</option>
                <option value="1">1 ★</option>
                <option value="2">2 ★</option>
                <option value="3">3 ★</option>
                <option value="4">4 ★</option>
                <option value="5">5 ★</option>
              </select>
              <button onClick={this.addRating} id="post-rating">Post Rating</button>
            </div>
          </div>
          <div className="desc-nontxt">
            <div>
              <p id="avg-rating">{`${this.getAvgRating()}☆`}</p>
              <button onClick={this.addToCart} id="add-to-cart">Add to Cart</button>
            </div>
            <img src={recipe.picture} height="250" alt={recipe.title} />
          </div>
        </div>

        <h2>Ingredients</h2>
        <ul id="ingredients">
          {recipe.ingredients.map(({ingredient, amount}, i) => {
            return <li key={i}>{`${!!amount ? `${this.getAdjustedServingSize(amount) } ` : ''}${ingredient}`}</li>
          })}
        </ul>

        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((inst, i) => <li key={i}>{inst}</li>)}
        </ol>
      </section>
    );
  }
}
