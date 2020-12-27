import './Cart.css';

function Cart(props) {
    return (
        <div className='cart'>
            <h1>Your Cart</h1>
            <div className='cartItems'>
               <p><button onClick={() => props.emptyCart()} className='emptyCart'>Empty Cart</button></p>
               <ul>
               { Object.keys(props.cart).map(item => {
                   return <div className='cartItem'>{Number((props.cart[item]).toFixed(2)).toString()} {item}</div>
               })
               } 
               </ul>
            </div>
        </div>
    );
}

export default Cart;
