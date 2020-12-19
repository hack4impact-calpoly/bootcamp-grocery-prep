import React from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";

import Style from './App.css';

import Header from "./Components/Header.js";
import AllRecipes from "./Components/AllRecipes.js";
import Cart from "./Components/Cart.js";
import AboutMe from "./Components/AboutMe.js"

class App extends React.Component{

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>

          <Route exact path='/'>
            <main className={Style.home}>
              <AllRecipes />
              <Cart items={[1,2,3]}/>
            </main>
          </Route>

          <Route exact path="/about">
            <main id="AboutMe">
              <AboutMe />
            </main>
          </Route>
            
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
