import React from "react";

import './cart.css';

class ShoppingCart extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <div className="cart">
                <h2>Shopping Cart</h2>
                <div className="ingredients">
                    <button onClick={() => this.props.emptyCart()}>Empty Cart</button>
                    <ul className="cartList">
                        {Object.keys(this.props.cart) && Object.keys(this.props.cart).map(ingredient => {
                            return(
                                <li>{this.props.cart[ingredient]} {ingredient}</li>
                            )
                        })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default ShoppingCart