import styles from "../styleFiles/Cart.module.css";
import React from "react";

class Cart extends React.Component {
  render() {
    return (
      <div className={styles.cartStyle}>
        <h2>Cart</h2>
	<button id="emptyCart" onClick={this.props.clearCart}>Clear Cart</button>
	{
	  this.props.shoppingCart && Object.keys(this.props.shoppingCart).map(ingr => {
	    return <div>
	      <p>{ingr}:<span>{this.props.shoppingCart[ingr]}</span></p>
	    </div>;
	  })
	}
      </div>
    );
  }
}

export default Cart;
