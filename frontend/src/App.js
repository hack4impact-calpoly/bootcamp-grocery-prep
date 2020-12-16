import React from 'react';

import Style from './App.css';

import Header from "./Components/Header.js";
import AllRecipes from "./Components/AllRecipes.js";
import Cart from "./Components/Cart.js";

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      currentCart : []
    }
  }

  clearCart(){
    this.setState({currentCart : []})
  }


  render() {
    return (
      <div>
          <Header className={Style.header} />
        <main>
          <recipes>
            <AllRecipes />
          </recipes>
          <cart>
            <Cart className={Style.cart} />
            {
              this.state.currentCart.map(current => {
                return <div>
                  test
                </div>
              })
            }
          </cart>
        </main>
      </div>
    );
  }
}

export default App;
