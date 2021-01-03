import './Cart.style.css';
import React from 'react';


class Cart extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      contents: props.contents,
      emptyCart: props.empty
    }
  }

  emptyTheCart(){
    this.state.emptyCart()
    this.setState({contents: {}})
  }

  render(){
    return (
      <div className="bord">
        <p>This is the cart component</p>
        <button onClick={() => this.emptyTheCart()}>Empty</button>

        <ul>
          {
            Object.keys(this.state.contents).map((curKey) => {
              return <li key={curKey}><span>{this.state.contents[curKey]}</span> {curKey}</li>;
            })
          }
        </ul>
      </div>
    );
  }
  
}

export default Cart;