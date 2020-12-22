// JavaScript Document

import React from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/recipes.css';

class Cart extends React.Component{
	constructor(props) {
		super(props);
	}
	
	render(){
	  return (
		  <div>
			<h1>Shopping Cart</h1>
		    <Button onClick={() => this.props.clearCart()} className="cart-button">Clear Cart</Button>
		    {this.props.items.map(item => {		
				return <h3><li><b className="quantity">{Object.values(item)[0] + " "}</b>{Object.keys(item)[0]}</li></h3>;
		  })}
		</div>
	  );
	}
}

export default Cart;
