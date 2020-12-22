import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header.js';
import Recipe from './Recipe.js';
import Cart from './Cart.js';
import About from './About.js';
import Food from './food.js';
import './App.css';

class App extends React.Component {
   
   constructor(props) {
      super(props);
      this.state = { cart: []};
   }

   emptyCart = () => this.setState({cart : []});

   updateCart = (items) => {
      const cart = this.state.cart;
      for(const i in items) {
         console.log(items[i]);
         console.log(items[i].Amount);
         if (cart[items[i].Item] === undefined) {
            cart[items[i].Item] = items[i].Amount;
         } else {
            cart[items[i].Item] += items[i].Amount;
         }
      }

      this.setState({cart: cart});
   }
   
   render() {

      return (
         <BrowserRouter>
            <Header />
            <Switch>
            <Route exact path = '/'>
               <main>
                  <Recipe />
                  <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
               </main>
            </Route>

            <Route path='/recipe'>
               <main>
                  <Food updateCart={this.updateCart}/>
                  <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
               </main>
            </Route>
         
            <Route exact path='/about'>
               <About />
            </Route>
            </Switch>
         </BrowserRouter>
      );
   }
}

export default App;
