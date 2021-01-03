import './App.css';
import Header from './Header.js';
import Recipe from './Recipe.js';
import Cart from './Cart.js';
import RecipeList from './RecipeList.js';

import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      cartContents: {}
    };
  }

  updateCart = (ingredients) => {
    let tempCart = this.state.cartContents
    for (let i in ingredients){
      if(i in tempCart){
        tempCart[i] = tempCart[i] + ingredients[i]
      }
      else{
        tempCart[i] = ingredients[i]
      }
    }

    this.setState({cartContents: tempCart})
    // console.log("APP COMP")
    
    // console.log(this.state.cartContents)
  }

  clearCart = () =>{
    //console.log('*************************')
    this.setState({cartContents: {}})
    //console.log(this.state.cartContents)
  }


  render(){
    return (
      <div className="App">
        <BrowserRouter>

          <Header />
          
          <main>
          <Route path='/recipe'>
            <main>
              <Recipe addToCart={this.updateCart}/>
              
            </main>
          </Route>

          <Route exact path='/'>
            <main>
              <RecipeList />
              
            </main>
          </Route>
          <Cart contents={this.state.cartContents} empty={this.clearCart}/>
          </main>
          
          
        </BrowserRouter>
      </div>
    );


  }

}

export default App;
