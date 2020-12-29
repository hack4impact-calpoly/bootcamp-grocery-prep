import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import './App.css';
import Home from './components/Navlinks/Home.js';
import RandomRecipe from './components/Navlinks/RandomRecipe.js';
import AboutTheChef from './components/Navlinks/AboutTheChef.js';
import Recipe from './components/Body/Recipe.js'
import Cart from './components/Body/Cart.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cart : [] };
  }

  updateCart = (ingredients) => {
    let added = false;
    const newCart = this.state.cart;
    for (const ingredient in ingredients) {
      const newItem = {}
      let ingredientText = Object.keys(ingredients[ingredient])[0]
      let ingredientCount = Object.values(ingredients[ingredient])[0]
      
      if (ingredientCount == 'null') {
        if (ingredientText.includes('to taste')) {
          ingredientText = ingredientText.split(",")[0]
        } 
        ingredientCount = 'to taste'
      }

      for (const i in newCart) {
        const currIngredient = Object.keys(newCart[i])[0]

        if (currIngredient === ingredientText && ingredientCount != 'to taste') {
          const currCount = Object.values(newCart[i])[0]
          const totalCount = +(ingredientCount) + +(currCount)
          newItem[ingredientText] = totalCount
          newCart[i] = newItem
          added = true
          break
        }
      }

      if (!added) {
        newItem[ingredientText] = ingredientCount
        newCart.push(newItem)
      }
    }
    
    this.setState({ cart : newCart })
  }

  emptyCart = () => this.setState({ cart: [] })

  render () {
    return (
      <BrowserRouter>	    	  
        <div className="App">
          <Navbar />
          <section>
            <Switch>
              <Route exact path='/'>
                <Home />
                <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
              </Route>

              <Route exact path='/random-recipe'>
                <RandomRecipe />
                <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
              </Route>

              <Route path='/recipe'>
                <Recipe updateCart={this.updateCart} />
                <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
              </Route>

              <Route path='/random-recipe'>
                <Recipe updateCart={this.updateCart} />
                <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
              </Route>

            </Switch>
          </section>
          <Switch>
              <Route exact path='/about-the-chef'>
                <AboutTheChef />
              </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
