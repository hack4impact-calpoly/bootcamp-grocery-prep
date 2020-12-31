import logo from './logo.svg';
import './App.css';
import Home from './AdditionalLinks/Home/Home.js';
import Header from './AdditionalLinks/Header/Header.js';
import AboutMe from './AdditionalLinks/AboutMe/AboutMe.js';
import RandomRecipe from './AdditionalLinks/RandomRecipe/RandomRecipe.js';
import Recipe from './AdditionalLinks/Recipe/Recipe.js';
import RecipeDisplay from './AdditionalLinks/Recipe/RecipeDisplay.js';
import Cart from './AdditionalLinks/Cart/Cart.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

class App extends React.Component {
  constructor(props) {
     super(props);
     this.state = {cart: {}};
  }

  updateCart =  (ingredients) => {
     const cart = this.state.cart;
     for (const key in ingredients){
     	cart[key] = ingredients[key];
     }

     this.setState({ cart: cart });
  }

	
  emptyCart = () => { this.setState({ cart: {} }); }
 

  render() {
  return (
    <BrowserRouter>
       <div className='App'>    
       	  <Header /> 
          
	  <Switch>
	  <Route exact path='/'>
	     <main>
	     <Home />
	     <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
	     </main>
	  </Route>

	  <Route exact path='/about-me'>
	     <AboutMe />
	  </Route>

	  <Route exact path='/random-recipe'>
             <main>
             <RandomRecipe />
             <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
             </main>
          </Route>


	  <Route path='/random-recipe'>
	     <main>
	     <Recipe updateCart={this.updateCart}/>
             <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
	     </main>
	  </Route>

	  <Route path='/recipe'>
	     <main>
	     <Recipe updateCart={this.updateCart}/>
             <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
	     </main>
	  </Route>

          </Switch>

       </div>
    </BrowserRouter>

    //TUTORIAL BELOW
    //<div className="App">
    //  <header className="App-header">
    //    <img src={logo} className="App-logo" alt="logo" />
    //    <p>
    //      Edit <code>src/App.js</code> and save to reload.
    //    </p>
    //    <a
    //      className="App-link"
    //      href="https://reactjs.org"
    //      target="_blank"
    //      rel="noopener noreferrer"
    //    >
    //      Learn React
    //    </a>
    //  </header>
    //</div>
  );}
}

export default App;
