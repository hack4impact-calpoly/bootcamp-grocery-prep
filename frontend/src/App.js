import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Header from './Header.js';
import Recipe from './Recipe.js';
import Home from './Home.js';
import About from './About.js';
import Cart from './Cart.js';


class App extends React.Component {

   constructor(props) {
      super(props);
      this.state = { cart: [] };
   }

   updateCart = (items) => {
      const cart = this.state.cart;
      for (const item in items) {
         if (cart[item] === undefined) {
           cart[item] = +(items[item]);
         } else {
           cart[item] += +(items[item]);
         }
      }

    this.setState({cart: cart});
  }

   emptyCart = () => this.setState({ cart: [] })

   render() {
      return (
         <div>
            <BrowserRouter>
               <Header />
            <main>
                  <Switch>
                     <Route exact path='/'>
                        <Home />
                     </Route>

                     <Route path='/about'>
                        <About />
                     </Route>
                              
                     <Route path='/recipe'>
                        <Recipe updateCart={this.updateCart}/>
                     </Route>
                  </Switch>
               <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
            </main>
            </BrowserRouter>
         </div>
      );
   }
}

export default App;
