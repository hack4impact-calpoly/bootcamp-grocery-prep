import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './header/Header';
import Home from './home/Home';
import Cart from './cart/Cart';
import Recipe from './recipe/Recipe';
import About from './about/About';
import './App.css';

function App() {
  const [cart, setCart] = useState({});

  const addToCart = (items) => {
    const cartCopy = {...cart};
    for (const item in items) {
      if (item in cartCopy) {
        cartCopy[item] += items[item];
      } else {
        cartCopy[item] = items[item];
      }
    }
    setCart(cartCopy);
  };

  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route>
            <main>
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route path='/recipe'>
                  <Recipe addToCart={addToCart} />
                </Route>
              </Switch>
              <Cart cart={cart} setCart={setCart} />
            </main>
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
