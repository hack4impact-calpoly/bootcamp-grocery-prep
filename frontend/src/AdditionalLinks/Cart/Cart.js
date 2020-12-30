import './Cart.css'


function Cart(props){
  return (
    <div className = 'Cart'>
       <h2>Cart</h2>
      
       <div className='emptyCart'>
	  <button id='empty' onClick={() => props.emptyCart()}> Empty Cart </button>
       </div>
 
       <ul>
	  { props.cart && Object.keys(props.cart).map((item) => {
		return (
			<div className='ingredients'>
			    {item + "-" + props.cart[item]}
			</div>
		);}
	  )}
       </ul>
    </div>
   );
}

export default Cart;
