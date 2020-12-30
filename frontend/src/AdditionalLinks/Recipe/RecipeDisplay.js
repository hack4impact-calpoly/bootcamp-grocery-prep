import Cart from '../Cart/Cart.js';
import '../Home/Home.css';
import Recipe from './Recipe.js';

function RecipeDisplay() {
   return (
    <div className = 'Home'>
      <body className='home-body'>

        <main>
          <Recipe updateCart={this.updateCart}/>
          <Cart cart={this.state.cart} emptyCart={this.emptyCart}/>
        </main>

        </body>
    </div>
  );
}

export default RecipeDisplay;
