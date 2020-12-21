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

      empty = () => this.setState({cart : []});

      update = (items) => {
         const cart = this.state.cart;
         for(const i in items) {
            if (cart[i] === undefined) {
               cart[i] = +(items[i]);
            } else {
               cart[i] += +(items[i]);
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
                  <Cart cart={this.state.cart} empty={this.emptyCart} />
               </main>
            </Route>

            <Route path='/recipe'>
               <main>
                  <Food update={this.update}/>
                  <Cart cart={this.state.cart} empty={this.empty} />
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
