
import React from 'react';

import Styles from './Cart.module.css';

class Cart extends React.Component{

    displayContents(){
        return <div>contents</div>
    }

    render(){
        return (
            <main className={Styles.main}>
                <h1>
                    Your Cart:
                </h1>
                <p>
                    {this.displayContents()}
                </p>
                <button className={Styles.button} >click</button>
            </main>

        );
    }
}

export default Cart;