// import './Cart.module.css';
import React from 'react';

function Cart(props) {
    return  (
        <section class= "sidePanel">
        <div class="cart">
            <h1 >Shopping Cart</h1>
            <button onClick={() => props.emptyCart()} id='empty-cart'>Empty Cart</button>
            <ul id="ingredients">
                { props.cart && Object.keys(props.cart).map((name, size) => {
                    return (
                        <div>
                            <li key={name}><span className='count'>{props.cart[name]} {name}</span></li>
                        </div>
                    );
                })}
            </ul>
            </div>
        </section>
    );
}

export default Cart;
