import React from 'react';
import './food.css';
import './images/tunaMelt.JPG';

class Food extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         angry: "test",
      };
   }

   componentDidMount() {
      const id = window.location.hash.substr(1);
      console.log(id);
      fetch("http://localhost:3001/api/recipe/" + id)
      .then(res => res.json())
      .then(json => {
         this.setState({...json});
         document.title = json[0].title;
         
         let rating = json[0].ratings.reduce((a, b) => a + b) / json[0].ratings.length;
         rating = rating.toFixed(2);
         this.setState({desc: json[0].desc});
         this.setState({picture: json[0].picture});
         this.setState({servings: json[0].servings});
         this.setState({title: json[0].title});
         this.setState({rating: rating});
         this.setState({instructions: json[0].instructions});
         this.setState({ingredients: json[0].ingredients});
      });
   }

   updateCount(dir) {
      if (this.state.servings + dir < 0) {
         return;
      }

      const curS = this.state.servings;
      const newC = {};
      for (const ingredient in this.state.ingredients) {
         const curC = +(this.state.ingredients[ingredient]);
         newC[ingredient] = Number(((curC / curS) * (curS + dir)).toFixed(2)).toString();
      }

      this.setState({ingredients: newC, servings: this.state.servings + dir})
   }

   render() {

      console.log(this.state.ingredients);
      return (
         <div className="food">

            <div className='head'>
               <h1 id='title'>{this.state.title}</h1>
               
               <div className='change'>
                  <div id='ratings'>
                     <span>{this.state.rating}</span> &#9734;
                  </div>

                  <button id="addCart" onClick={() => this.addToCart()}>Add to Cart</button>

               </div>
            </div>

            <div className='display'>
               <div className='info'>
                  <p className='desc'>{this.state.desc}</p>
                  <p></p>

                  <div className='servings'>
                     <h2 className="box">Servings</h2>
                     <button onClick={() => this.updateCount(-1)}>-</button>
                     <span id='count'>   {this.state.servings}   </span>
                     <button onClick={() => this.updateCount(1)}>+</button>
                  </div>

                  <div className='rating'>
                     <h2 className="box">Rate Me!</h2>
                     <h2></h2>
                     <select>
                        <option value=""> Select Rating</option>
                        <option value = "1">1</option>
                        <option value = "2">2</option>
                        <option value ="3">3</option>
                        <option value = "4">4</option>
                        <option value ="5">5</option>
                     </select>

                     <input id="rate" type="button"
                        value = "Rate"
                        onClick = {() => this.postRating()} />
                  </div>
               </div>
               <h2></h2>
               <div className="getImage">
                  <img src={this.state.picture} height='250px' alt={this.state.title}></img>
               </div>

            </div>

            <h1>Ingredients</h1>
            <ul>
             </ul>
                     
            <h1>Instructions</h1>
            <ul>
               {this.state.instructions && this.state.instructions.map((instruction, count) => {
                  return <li key={count}>{instruction}</li>;
               })}
            </ul>
         </div>
      );
   }
}

export default Food;
