import styles from './Cart.module.css';
import { useEffect } from 'react'

function Cart(props) {
  useEffect(() => {
    console.log('Cart updated!')
  }, props.cartState)

  return (
    <div>
      <header>
        <h1>Your Cart</h1>
      </header>
      <button onClick={() => props.emptyCart()} className={styles.emptyButton}>Empty Cart</button>
      <div>
        {props.cartState && Object.keys(props.cartState).map(ingred => 
        <div key={ingred} className = 'ingredientsForCart'>
          {props.cartState[ingred]} - {ingred}
        </div>)}
      </div>
    </div>
  );
}

export default Cart;