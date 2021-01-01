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
    this.state ={}
  }


  render(){
    return (
      <div className="App">
        <BrowserRouter>

          <Header />

          <Route exact path='/'>
            <main>
              <RecipeList />
              <Cart />
            </main>
          </Route>

          <Route path='/recipe'>
            <main>
              <Recipe />
              <Cart />
            </main>
          </Route>
          
        </BrowserRouter>
      </div>
    );


  }

}

export default App;
