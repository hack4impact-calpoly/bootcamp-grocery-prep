import '../../css/Cart.css'

function Cart(props){
    return  (
        <section class= "test">
        <div class="cart">
            <h1 >Shopping Cart</h1>
            <button onClick={() => props.emptyCart()} id='empty-cart'>Empty Cart</button>
            { props.cart.map(item => {
                return <div key={item} class='cart-item'>{item}</div>
            })
            }
            </div>
        </section>
    );
}

export default Cart;