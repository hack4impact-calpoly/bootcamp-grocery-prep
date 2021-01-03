import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import './App.css';
import Header from './header/header.js';
import About from './about/about.js';
import Main from './main/main.js'
import Recipe from './main/recipe.js'
import ShoppingCart from "./main/cart.js"


class App extends React.Component {
    constructor(props){
      super(props)
      this.state={
        cart: {}
      }
    }

    updateCart = (ingredients) => {
      const cart = this.state.cart
      for (const ingredient in ingredients){
        const amount = ingredients[ingredient]
        if(cart[ingredient] === undefined){
          cart[ingredient] = +amount
        }
        else{
          cart[ingredient] += +amount
        }
      }
      this.setState({cart: cart})
    }

    emptyCart = () => {
      this.setState({cart: []})
    }

    render() {
      return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <section id="list">
              <Main />
              <ShoppingCart cart={this.state.cart} emptyCart={this.emptyCart}/>
            </section>
          </Route>
          <Route path="/recipe">
            <section id="recipe">
              <Recipe updateCart={this.updateCart} />
              <ShoppingCart cart={this.state.cart} emptyCart={this.emptyCart}/>
            </section>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    );
  }
}


export default App;
