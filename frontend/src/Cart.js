import './Cart.css'

function Cart(props) {
    return (
        <div id="Cart">
            <h1>Shopping Cart</h1>
            <button id="empty" onClick={() => props.emptyCart()}>Empty Cart</button>
            <p></p>
            { Object.keys(props.cart).map(ingred => {
                return <div key={ingred} id='item-in-cart'>{Number(props.cart[ingred]).toString()} {ingred}</div>
            })
            }
        </div>
    )
}

export default Cart;