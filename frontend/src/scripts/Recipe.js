import styles from "../styleFiles/Recipe.module.css";
import React from "react";

const getURL = "http://localhost:3001/api/recipe/";
const postURL = "http://localhost:3001/api/rating";

class Recipe extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const foodName = window.location.hash.substr(1);
    fetch(getURL + foodName)
      .then(res => res.json())
      .then((data) => this.setState({...data}));
  }

  postRating() {
    if(document.getElementById("ratingBox").value === "Select Rating"){
      alert('"Select Rating" is not a valid rating. Please adjust your rating and try again.');
      return;
    }
    const foodId = this.state._id;
    const newRate = +(document.getElementById("ratingBox").value);
    const newRtArray = this.state.ratings;
    newRtArray.push(newRate);
    this.setState(newRtArray);
    const data = {id: foodId, rating: newRate};
    fetch(postURL, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)});
  }

  updateServings(dir) {
    if(this.state.servings + dir < 1){
      return;
    }
    const newIngredients = {};
    for(let ingr in this.state.ingredients){
      newIngredients[ingr] = +((+(this.state.ingredients[ingr])/this.state.servings *(this.state.servings + dir)).toFixed(2).toString());
    }
    this.setState({servings: (this.state.servings + dir), ingredients: newIngredients});
  }

  render() {
    return (
      <div>
	<div class="content">
	  <h2 id="title">{this.state.title}</h2>
	  <button id ="addToCart" onClick={() => {this.props.addToCart(this.state.ingredients)}}>Add to Cart</button>
	  <br/>
	  <img src={process.env.PUBLIC_URL + this.state.picture}/>
	  <p id="description">{this.state.desc}</p>
	</div>
	<div id="ratingSection">
	  <h3 id="avgRating">Average Rating: {
	    this.state.ratings && (this.state.ratings.reduce((a, b) => a + b, 0)/(this.state.ratings.length)).toFixed(2)
	  }☆</h3>
	  <h3>Rate Me!</h3>
	  <select id="ratingBox">
	    <option value="Select Rating">Select Rating</option>
	    <option value="1">1 ☆</option>
	    <option value="2">2 ☆☆</option>
	    <option value="3">3 ☆☆☆</option>
	    <option value="4">4 ☆☆☆☆</option>
	    <option value="5">5 ☆☆☆☆☆</option>
	  </select>
	  <button id="ratingSubmit" onClick={() => this.postRating()}>Submit</button>
	</div>
	<div class="subHeader">
	  <h2>{"What you'll need:"}</h2>
	</div>
	<div class="content">
	  <div class="servings">
	    <p>Servings</p>
	    <button id="sub" onClick={() => this.updateServings(-1)}>-</button>
	    <span id="count">{this.state.servings}</span>
	    <button id="add" onClick={() => this.updateServings(1)}>+</button>
	  </div>
	  <ul id="ingredientList">
	    {
	      this.state.ingredients && Object.keys(this.state.ingredients).map(ingr => {
	        return <li><span>{this.state.ingredients[ingr]}</span> {ingr}</li>;
	      })
	    }
	  </ul>
	</div>
	<div class="subHeader">
	  <h2>Steps:</h2>
	</div>
	<div class="content">
	  <ol id="instructions">
	    {
	      this.state.instructions && this.state.instructions.map(instr =>(
	        <li>{instr}</li>
	      ))
	    }
	  </ol>
	</div>
      </div>
    );
  }
}

export default Recipe;
