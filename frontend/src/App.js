import Header from "./Header";
import Cart from "./Cart";
import Recipe from "./Recipe"
import About from "./About"
import RecipeOverview from "./RecipeOverview";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(newItems) {
    const newCart = cart;
    for (const item in newItems) {
      if (item in newCart) {
        newCart[item] += newItems[item];
      }
      else {
        newCart[item] = newItems[item];
      }
    }
    setCart(newCart);
  }

  function emptyCart() {
    setCart([]);
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <main>
            <RecipeOverview />
            <Cart
              addToCart={addToCart}
              emptyCart={emptyCart}
              cart={cart}
            />
          </main>
        </Route>
        <Route exact path="/recipe">
          <main>
            <Recipe
              addToCart={addToCart}
            />
            <Cart
              cart={cart}
            />
          </main>
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
