import './App.css';
import React from 'react';
import Header from './Components/Header/Header.js';
import Footer from './Components/Footer/Footer.js';
import Profile from './Components/Profile/Profile.js';
import Home from './Components/Home/Home.js';
import Cart from './Components/Cart/Cart.js';
import Recipe from './Components/Recipe/Recipe.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {cart: {} };
  }
  
  refreshCart = (items) =>
  {
    const cart = this.state.cart;
    let index = 0;
    var newCart = Object.assign({}, cart, items)
    this.setState( {cart: newCart});
    console.log(newCart);

  }
  emptyCart = () => this.setState({ cart: []});

  render() 
  {
      return (
        
      <div className="App">
        <BrowserRouter>
          <header className="App-header">
            <Header/>
          </header>
          <Switch>
            <Route exact path='/random'>
              <main>
                <Recipe refreshCart={this.refreshCart}/>
                <Cart refreshCart={this.refreshCart} cart={this.state.cart} emptyCart={this.emptyCart} />
              </main>
            </Route>
            <Route path='/recipe'>
              <main>
                <Recipe refreshCart={this.refreshCart}/>
                <Cart refreshCart={this.refreshCart} cart={this.state.cart} emptyCart={this.emptyCart} />
              </main>
            </Route>
            <Route exact path='/about'>
              <Profile />
            </Route>
            <Route exact path='/'>
              <main>
                <Home/>
                <Cart refreshCart={this.refreshCart} cart={this.state.cart} emptyCart={this.emptyCart}/>
              </main>
            </Route>
        </Switch>
        <Footer/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
