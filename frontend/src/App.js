import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header.js';
import Recipe from './Recipe.js';
import Cart from './Cart.js';
import About from './About.js';
import Home from './Home.js';
import RecipesOverview from './RecipesOverview.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };
  }

  addToCart = (items) => {
      console.log("add to cart")
      const currCart = this.state.cart;
      for(const i in items) {
        if (currCart[i] !== undefined) {
          currCart[i] += items[i]
        } else {
          currCart[i] = items[i]
        }
      }
      this.setState({cart: currCart});
  }

  emptyCart = () => {
    console.log("empty cart");
    this.setState({ cart: [] });
  }


  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
          <Switch>
            <Route exact path='/'>
                <Home/>
            </Route>
            <Route exact path='/recipes'>
                <main>
                  <RecipesOverview/>
                  <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
                </main>
            </Route>
            <Route exact path='/recipe'>
                <main>
                  <Recipe addToCart={this.addToCart} />
                  <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
                </main>
            </Route>
            <Route exact path='/about'>
                <About/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
