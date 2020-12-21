import React from 'react'
import './Cart.css';

function Cart(props) {
   return (
      <div className="cart"> 
         <h2>Your Shopping Cart</h2>

         <button onClick={() => props.empty()}>Trash It</button>
         { Object.keys(props.cart).map(item => {
            return <div key={item}>{item} - {Number((props.cart[item]).toFixed(2)).toString()}</div>
         })}
      </div>
   );
}

export default Cart
