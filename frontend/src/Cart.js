function Cart(props) {
    return (
        <div>
            <h1>Cart</h1>
            <button onClick={props.emptyCart} style={{marginBottom: "10px"}}>Empty Cart</button>
            <br />
            {Object.entries(props.cart).map(([item, amount]) => {
                return <div id={item}>{amount} - {item}</div>
            })}
        </div>
    );
}

export default Cart;