import './Home.css';
import Header from '../Header/Header.js';
import Recipe from '../Recipe/Recipe.js';
import Cart from '../Cart/Cart.js';
import RecipeLinks from '../RecipeLinks/RecipeLinks.js';

function Home() {
  return (
    <div className = 'Home'>
      <body className='home-body'>

        <main>
          <RecipeLinks />
          <Cart />
        </main>

        </body>
    </div>
  );
}


export default Home;
