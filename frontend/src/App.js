import React from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";

import Style from './App.css';

import Header from "./Components/Header.js";
import AllRecipes from "./Components/AllRecipes.js";
import Recipe from "./Components/Recipe.js"
import Cart from "./Components/Cart.js";
import AboutMe from "./Components/AboutMe.js"

class App extends React.Component{

  //put cart state here
  constructor(props){
    super(props);
    this.state = {
      cart : {}
    }
  }

  emptyCart = () => {
    console.log("Cart gone")
    this.setState({
      cart : {}
    })
  }

  updateCart = (ingredients) => {
    const newCart = this.state.cart;
    for (const index in ingredients){
      if (newCart[index]){
        newCart[index] += ingredients[index]
      }
      else{
        newCart[index] = ingredients[index]
      }
    }
    this.setState({
      cart : newCart
    })
  }

  render() {
    console.log(this.state.cart)
    return (
      <BrowserRouter>
        <Header />
        <Switch>

          <Route exact path='/'>
            <main className={Style.root} id="home">
              <AllRecipes />
              <Cart empty={this.emptyCart} cart={this.state.cart}/>
            </main>
          </Route>

          <Route exact path="/about">
            <main id="AboutMe">
              <AboutMe />
            </main>
          </Route>

          <Route path="/recipe/">
            <main className={Style.root} id="home">
              <Recipe update={this.updateCart}/>
              <Cart empty={this.emptyCart} cart={this.state.cart}/>
            </main>

          </Route>
            
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
