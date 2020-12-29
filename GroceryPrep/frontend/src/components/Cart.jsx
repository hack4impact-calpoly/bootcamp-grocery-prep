import React, { useEffect } from 'react';
import './Cart.css';

const Cart = (props) => {
  const {
    cartItems, 
  } = props;  
  
  return (
    <div className="background-style"> 
      Cart
      {cartItems ? (
      <div className="mealPadding"> 
        {cartItems.map((item, index) => (<li key={index}>{item}</li>))}
      </div>
      ): null}
    </div>
  );
}

export default Cart;