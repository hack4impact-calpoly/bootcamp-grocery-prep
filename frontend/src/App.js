import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import Recipe from './components/Recipe'

import './css/App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {  
          cart: {
            ingredients: [],
            sizes: [],
          }
      };
  }

  emptyCart = () => {
    console.log("emptying cart")
    this.setState({
      cart: {
        ingredients: [],
        sizes: [],
      }
    })
  }

  addToCart = (ingredients, servings) => {
    let cart = this.state.cart
    for (var item in ingredients) {
      var amount = Math.round(ingredients[item] * servings * 100) / 100 ;
      let index = cart.ingredients.indexOf(item)
      if (index === -1) {
        cart.ingredients.push(item)
        cart.sizes.push(amount)
      }
      else if (ingredients[item] !== -1){
        cart.sizes[index] += amount
      }
    }
    this.setState({cart: cart})
  }

  render() {
    let cart = this.state.cart
    return (
      <div className="App">
        <Router>
          <NavBar/>
          <Switch>
              <Route path="/about"><About/></Route>
              <Route path="/recipes/:recipe"><Recipe random={false} cart={cart} emptyCart={this.emptyCart} addToCart={this.addToCart}/></Route>
              <Route path="/random"><Recipe random={true} cart={cart} emptyCart={this.emptyCart} addToCart={this.addToCart}/></Route>
              <Route><Home cart={cart} emptyCart={this.emptyCart} addToCart={this.addToCart}/></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
