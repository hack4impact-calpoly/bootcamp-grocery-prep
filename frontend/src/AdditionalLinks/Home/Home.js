import './Home.css';
import Header from '../Header/Header.js';
import Recipe from '../Recipe/Recipe.js';
import Cart from '../Cart/Cart.js';


function Home() {
  return (
    <div className = 'Home'>
      <body className='home-body'>

        <main>
          <Recipe />
          <Cart />
        </main>

        </body>
    </div>
  );
}


export default Home;
