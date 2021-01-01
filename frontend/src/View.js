import styles from './View.module.css'
import CookBook from './CookBook.js';
import Cart from './Cart.js';
import Recipe from './Recipe.js';
import { Route , Switch} from 'react-router-dom';
import { useState } from 'react'

function View() {
  const [cartState, updateCart] = useState({})
  function emptyCart() {
    updateCart({})
  } 
  function addItems(items) {
    // console.log(items)
    const cart = cartState;
    for (const item in items) {
      // console.log(`This is the item: ${item}`)
      if (cart[item] === undefined) {
        cart[item] = +(items[item]);
      } 
      else {
        cart[item] += +(items[item]);
      }
    }

    updateCart({...cart})
  }
  
  return (
    <div className={styles.mainScreen}>
      <Switch>
        <Route exact path='/recipe/:name'>
          <Recipe addItems={addItems} />
        </Route>
        <Route path='/'>
          <CookBook />
        </Route>
      </Switch>
      <Cart cartState={cartState} emptyCart={emptyCart} />
    </div>
  );
}

export default View;