import './styleFiles/App.css';
import React from "react";
import Header from "./scripts/Header.js";
import Cart from "./scripts/Cart.js";
import Recipe from "./scripts/Recipe.js";
import Home from "./scripts/Home.js";
import AbouttheChef from "./scripts/AbouttheChef.js";
import {BrowserRouter, Route, Switch} from "react-router-dom";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.clearCart = this.clearCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.state = {shoppingCart: {}};
  }

  clearCart() {
    this.setState({shoppingCart: {}})
  }

  addToCart(ingredientList) {
    const newIngredients = this.state.shoppingCart;
    for(let ingr in ingredientList){
      newIngredients[ingr] = newIngredients.hasOwnProperty(ingr) ? +(ingredientList[ingr]) + newIngredients[ingr] : +(ingredientList[ingr]);
    }
    console.log(newIngredients);
    this.setState({shoppingCart: newIngredients});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
          <Switch>
	    <Route exact path="/">
              <main>
                <Home/>
	        <Cart shoppingCart={this.state.shoppingCart} clearCart={this.clearCart}/>
	      </main>
	    </Route>
	    <Route path="/recipe">
	      <main>
	    	<Recipe shoppingCart={this.state.shoppingCart} addToCart={this.addToCart}/>
	        <Cart shoppingCart={this.state.shoppingCart} clearCart={this.clearCart}/>
	      </main>
	    </Route>
	    <Route exact path="/aboutthechef">
	        <AbouttheChef/>
	    </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
