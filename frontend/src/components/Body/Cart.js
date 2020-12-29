import React from 'react';
import './Cart.css';

function Cart(props) {
	return (
		<div className='cart-cart'>
			<h1>Your Cart</h1>
			<div className='cart-empty-cart-feature'>
					<button id='cart-empty-cart' onClick={() => props.emptyCart()}>Empty Cart</button>
			</div>
			<div className='cart-ingredients-list'>
				<ul id='cart-ingredients'>
					{props.cart && Object.keys(props.cart).map((item) => {
						return (
							<div className='cart-ingredient'>
								{ Object.keys(props.cart[item]) + " - " }
								<span id='cart-ingredient-count'>
									{ Object.values(props.cart[item]) != 'to taste' ? (+(Object.values(props.cart[item]))).toFixed(2) : Object.values(props.cart[item]) }
								</span>
							</div>
						)
					})}
				</ul>
			</div> 
		</div>
	);
}

export default Cart;