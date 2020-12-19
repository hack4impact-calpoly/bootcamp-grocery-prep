import React from 'react';

import Style from './App.css';

import Header from "./Components/Header.js";
import AllRecipes from "./Components/AllRecipes.js";
import Cart from "./Components/Cart.js";

class App extends React.Component{

  render() {
    return (
      <div>
          <Header className={Style.header} />
        <main>
          <div>
            <AllRecipes />
          </div>
          <div>
            <Cart className={Style.cart} items={[1,2,3]}/>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
