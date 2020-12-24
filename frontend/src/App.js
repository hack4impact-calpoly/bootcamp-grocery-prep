import React from "react";
import Header from "./components/Header";
import Recipe from "./components/Recipe";
import Cart from "./components/Cart";
import About from "./components/About";
import Home from "./components/Home";
import AllRecipes from "./components/AllRecipes"
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };
  }

  emptyCart = () => {
    this.setState({ cart: [] });
  }

  addToCart = (items) => {
    const currentCart = this.state.cart;
    for (const item in items) {
      if (currentCart[item] !== undefined) {
        currentCart[item] += items[i];
      } else {
        currentCart[i] = items[i];
      }
    }
    this.setState({ cart: currentCart });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/recipes">
              <main>
                <AllRecipes />
                <Cart
                  cart={this.state.cart}
                  emptyCart={this.emptyCart}
                />
              </main>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
