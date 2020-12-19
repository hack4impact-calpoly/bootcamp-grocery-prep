import './Cart.css';
import React, { Component } from 'react';

class Cart extends Component {

    constructor(props) {
             super(props);
             this.state = {}
          }

    render() {
        return (
        <div class="cart">
            <h1>Your Cart</h1>
            <button id = "empty" onClick={() => this.emptyCart()}>Empty Cart</button>

            <ul>
                { this.props.cart && this.props.cart.map((ingredient, i) => {

                    		if(ingredient.amount !== undefined ){
                    		    return <li key= { i } >{ ingredient.amount + ingredient.name}</li>}
                    		else{
                    		    return <li key= { i } >{ ingredient.name }</li>
                    		}
                    		})}
            </ul>
        </div>
        );
    };


    emptyCart = () =>
          { this.props.onEmptyCart() }
    };


export default Cart;