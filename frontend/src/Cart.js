import './Cart.style.css';
import React from 'react';


function Cart(props) {
  return (
      <div className="bord">
          <h2>Cart</h2>
          
          <ul>
           {
             Object.keys(props.contents).map((curKey) => {
               return <li key={curKey}><span>{props.contents[curKey]}</span> {curKey}</li>;
             })
           }
         </ul>
         <button onClick={() => props.empty()}>Empty</button>
      </div>
  );
}

//Researching to see why my class component didnt work, but a functional component like the one
//in the example worked

// class Cart extends React.Component{

//   constructor(props){
//     super(props)
//     this.state = {
//       contents: this.props.contents,
//       emptyCart: props.empty
//     }
//   }


//   componentDidUpdate(){
//     console.log("UPDATED****************************************")
//     console.log(this.state.contents)
//   }

//   render(){
//     return (
//       <div className="bord">
//         <p>This is the cart component</p>
//         <button onClick={() => this.state.emptyCart()}>Empty</button>

//         <ul>
//           {
//             Object.keys(this.state.contents).map((curKey) => {
//               return <li key={this.props.contents}><span>{this.state.contents[curKey]}</span> {curKey}</li>;
//             })
//           }
//         </ul>
//       </div>
//     );
//   }
  
// }

export default Cart;