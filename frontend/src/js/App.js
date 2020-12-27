
import '../css/App.css';
import React from 'react';
import Header from './components/Header';
import Cart from './components/Cart';
import RecipeList from './components/RecipeList';
import Recipe from './components/Recipe';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from '../About'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };
  }

  updateCart = (items) => {
    const cart = this.state.cart;
    let index = 0;
    for(var i=0; i<items.length; i++)
    {
      if (cart[i] === undefined) {
        cart[i] = items[i];
      }
      else{
        cart.push(items[i]);
      }
    }

    this.setState({cart: cart});
  }

  emptyCart = () => this.setState({ cart: [] });

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Cart cart ={this.state.cart} emptyCart={this.emptyCart}/>
        <br></br>
        <br></br>
        <Switch>
          <Route exact path='/'>
            <main>
              <RecipeList/>
            </main>
          </Route>
          <Route path='/recipe'>
            <main>
              <Recipe updateCart={this.updateCart}/>
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

