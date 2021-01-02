import './Cart.style.css';
import React from 'react';


class Cart extends React.Component{

  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return (
      <div className="bord">
        <p>This is the cart component</p>
        <button>Empty</button>
      </div>
    );
  }
  
}

export default Cart;