import './Home.css';
import Header from '../Header/Header.js';
import Recipe from '../Recipe/Recipe.js';
import Cart from '../Cart/Cart.js';
import RecipeLinks from '../RecipeLinks/RecipeLinks.js';
import React from 'react';

class Home extends React.Component {
  
  constructor(props){
        super(props);
    }


  render () {
  return (
    <div className = 'Home'>
      <body className='home-body'>

        <main>
          <RecipeLinks />
        </main>

        </body>
    </div>
  );}
}


export default Home;
