import './App.css';
import Header from './Header.js';
import Cart from './Cart.js';
import Recipe from './Recipe.js';
import Home from './Home.js';
import React, { Component } from 'react';
import './index.js';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from './About.js';

class App extends Component {

    constructor(props) {
             super(props);
             this.state = {
                cart: [],
                ingredients: []
             }
             this.updateCart = this.updateCart.bind(this);
             this.emptyCart = this.emptyCart.bind(this);
          }


    updateCart (newCart) {
        this.setState({
            cart: this.state.cart.concat(newCart)
        })
    }

    emptyCart () {

        this.setState({
            cart: ''
        })
    }

    updateServings (update) {

        this.setState({
            servings: this.state.servings + -1
        })
    }

    render() {
        return (
           <div>

               <BrowserRouter>
               <Header />
               <Switch>
               <Route exact path="/about">
                    <About />
               </Route>
               <Route path="/">
                    <main>
                       <Switch>
                       <Route path= "/recipe/:name">
                       <Recipe
                            onCartChange = { this.updateCart }
                            cart = { this.state.cart }
                            name= { window.location.href.split(':')[3]}
                            onUpdateServings = { this.updateServings }
                            onUpdateAmounts = { this.updateAmounts }
                            />
                       </Route>
                        <Route path= "/about">
                            <About />
                        </Route>
                        <Route exact path= "/">
                            <Home />
                        </Route>
                        </Switch>
                    <Cart
                        cart = { this.state.cart }
                        onEmptyCart = { this.emptyCart }/>
                  </main>
            </Route>
            </Switch>
            </BrowserRouter>
        </div>
);
};
};

export default App;
