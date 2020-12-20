import React from 'react';

// import Styles from './Cart.module.css';

class Cart extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            cart : []
        }
    }

    emptyCart(){
        this.setState({cart : []})
    }

    updateCart(items){
    }

    displayContents(){
        return (null)
    }

    render(){
        this.updateCart(this.props.items)
        return (
            <main>
                <h1>
                    Your Cart:
                </h1>
                {this.displayContents()}
                <button onClick={() => {console.log("clicked"); this.emptyCart()}}>click</button>
            </main>

        );
    }
}

export default Cart;