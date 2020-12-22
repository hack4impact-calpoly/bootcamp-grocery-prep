import React from 'react';

// import Styles from './Cart.module.css';

class Cart extends React.Component{

    render(){
        return (
            <main>
                <h1>
                    Your Cart:
                </h1>
                <ul>
                {this.props.cart && Object.keys(this.props.cart).map(item =>{
                        if (this.props.cart[item] > 0){
                            return <li key={item}>{this.props.cart[item] + " " + item}</li>
                        }
                        else{
                            return <li key={item}>{item}</li>
                        }
                    })}
                </ul>
                <button onClick={() => {this.props.empty()}}>click</button>
            </main>

        );
    }
}

export default Cart;