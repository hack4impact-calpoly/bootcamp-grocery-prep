import React, { Component } from 'react';

import '../css/cart.css' 

class Cart extends Component {

    render() {
        let { ingredients, sizes } = this.props.cart
        return (
            <div className="cart">
                <h1>Your Cart</h1>
                <button className="empty-cart-btn" onClick={this.props.emptyCart}>Empty Cart</button>
                <ul>
                    {ingredients && ingredients.map((item, i) => {
                        return <li key={i}>{sizes[i] === -1 ? "" : Math.round(sizes[i]*100)/100} {item}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default Cart;