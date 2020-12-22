import React from 'react';
import './food.css';
import TM from './images/tunaMelt.JPG';
import FR from './images/fancyRamen.JPG';
import MC from './images/mugCake.JPG';
import C from './images/crepes.JPG';

class Food extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         updateCart: props.updateCart,
      };
   }

   componentDidMount() {
      const id = window.location.hash.substr(1);
      fetch("http://localhost:3001/api/recipe/" + id)
      .then(res => res.json())
      .then(json => {
         const food = json[0];
         this.setState({...food});
         document.title = json[0].title;
         
         let rating = json[0].ratings.reduce((a, b) => a + b) / json[0].ratings.length;
         rating = rating.toFixed(2);
         this.setState({rating : rating});
         });
   }

   updateCount(dir) {
      if (this.state.servings + dir <= 0) {
         return;
      }

      const curS = this.state.servings;
      const newC = [];
      this.state.ingredients && this.state.ingredients.map((item) => {
            const curC = item.Amount; 
            const place = item.Item;
            newC.push({Item: place, Amount: Number(((curC/ curS) * (curS + dir)).toFixed(2)).toString()});
      })

      console.log(newC);
      this.setState({ingredients: newC, servings: this.state.servings + dir})
   }

   postRating() {
      const newestRating = +(document.getElementById("ratingSelection").value);

      const newRatings = [...this.state.ratings, newestRating];
      console.log(newRatings);
      this.setState({ratings: newRatings});
      console.log(newestRating + this.state.ratings.reduce((a,b) => a + b));
      const num = (newestRating + this.state.ratings.reduce((a,b) => a+b));
      const denom = (this.state.ratings.length + 1);
      console.log(num/denom);
      let rate = (num/denom).toFixed(2).toString();
      console.log(rate);
      this.setState({rating: rate});
      console.log(this.state.ratings);

      const toSend = {
         _id : this.state._id,
         rating : newestRating
      }

      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Origin','http://localhost:3000');

      fetch('http://localhost:3001/api/rating', {
         method: 'POST',
         headers: headers,
         body: JSON.stringify(toSend),
      });
   }

   getImage() {
      if (this.state.picture === './images/tunaMelt.JPG') {
         return TM;
      } else if (this.state.picture === './images/mugCake.JPG') {
         return MC;
      } else if (this.state.picture === './images/fancyRamen.JPG') {
         return FR;
      } else {
         return C;
      }
   }

   addToCart() {
      this.state.updateCart(this.state.ingredients);
   }

   render() {

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

                  <p className='desc'>{this.state.desc}</p>
                  <p></p>
           <div className='display'>
               <div className='info'>

                  <div className='servings'>
                     <h2 className="box">Servings</h2>
                     <button onClick={() => this.updateCount(-1)}>-</button>
                     <span id='count'>   {this.state.servings}   </span>
                     <button onClick={() => this.updateCount(1)}>+</button>
                  </div>

                  <div className='rating'>
                     <h2 className="box">Rate Me!</h2>
                     <h2></h2>
                     <select id="ratingSelection" defaultValue='none'>
                        <option value='none' disabled hidden> Select Rating</option>
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
                  <img src={this.getImage()} height='550px' alt={this.state.title}></img>
               </div>

            </div>

            <h1>Ingredients</h1>
            <ul>
               {this.state.ingredients && this.state.ingredients.map((item) => {
                  return <li key={item.Item}>{item.Amount} {item.Item}</li>;
               })}
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
