import React from 'react';

import './Cart.css';

function Cart(props) {
    const emptyCart = () => {
        props.setCart({});
    };

    return (
        <section id="cart">
            <h1>Your Cart</h1>
            <button onClick={emptyCart}>Empty Cart</button>
            <ul>
                {Object.entries(props.cart).map(([item, amount]) => {
                    return <li key={item}>{item}{!!amount ?  ` - ${amount}` : ''}</li>
                })}
            </ul>
        </section>
    );
}

export default Cart;
