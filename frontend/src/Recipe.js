import React from 'react';
// import { useState } from 'react';
import './Recipe.css';

class Recipe extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         updateCart: props.updateCart,
      };
   }

   componentDidMount() {
      fetch(`http://localhost:4000/api${ window.location.pathname }`)
         .then(res => res.json())
         .then(data => {
             this.setState({ ...data })

             let rating = data.ratings.reduce((a, b) => a + b) / data.ratings.length;
             rating = rating.toFixed(2);
             this.setState({avgRating: rating});
       });
   }

   updateCount(num) {
      if (this.state.servings + num <= 0)
         return;
      const curr = this.state.servings;
      const newCount = {};
      for (const ingred in this.state.ingredients) {
         const curCnt = +(this.state.ingredients[ingred]);
         newCount[ingred] = Number(((curCnt / curr) * (curr + num)).toFixed(2)).toString();
      }
      this.setState({ ingredients: newCount, servings: this.state.servings + num })
   }

   addToCart() {
      this.state.updateCart(this.state.ingredients);
   }

   postRating() {
      console.log("new");
      const newRating = +(document.getElementById('newRating').value);
      if (isNaN(newRating)) return;

      let updateRatings = this.state.ratings;
      updateRatings.push(newRating);
      this.setState({ratings: updateRatings});
      console.log(updateRatings);


      let calcRating = this.state.ratings.reduce((a, b) => a + b) / this.state.ratings.length;
      calcRating = calcRating.toFixed(2);
      console.log(calcRating);
      this.setState({avgRating: calcRating});
      console.log(this.state.avgRating);


      const ratingBody = {
         title: this.state.title,
         rating: newRating
      }
        
      fetch('http://localhost:4000/api/rating/', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(ratingBody)
      });

      console.log("done");
   }

   render() {
      console.log(this.state);
      return (
         <div className='recipe'>
            <div className="topImg">
            <img src={process.env.PUBLIC_URL + this.state.picture} alt={"img of " + this.state.name}/>
		      </div>
			<h2 className='title'>{ this.state.name }</h2>
            <p>{this.state.desc}</p>

         <div className='rating'>
            <p><span id='rating'>{this.state.avgRating}</span>☆</p>
            <label id='rating-label' for='selecting-rating'>Rate Me!</label>
            <select id='newRating' defaultValue='none'>
              <option value='none' disabled hidden>Select Rating</option>
              <option value='1'>1 &#9733;</option>
              <option value='2'>2 &#9733;</option>
              <option value='3'>3 &#9733;</option>
              <option value='4'>4 &#9733;</option>
              <option value='5'>5 &#9733;</option>
            </select>

            <p><button id='post-rating' onClick={() => this.postRating()}>Post Rating</button></p>
         </div>

         <h3>Ingredients</h3>

         <div className="serving">
            <h4>Servings</h4>
            <button id="sub" onClick={() => this.updateCount(-1)}>-</button>
            <span id="count">{this.state.servings}</span>
            <button id="add" onClick={() => this.updateCount(1)}>+</button>
         </div>
         
         <ul>
            {this.state.ingredients && Object.keys(this.state.ingredients).map((name) => {
               return <li><span className='amount'>{this.state.ingredients[name]}</span> {name}</li>;
            })}
         </ul>

         <button onClick={() => this.addToCart()}>Add to Cart</button>

         <h3>Instructions</h3>
         <ol>
            {this.state.instructions && this.state.instructions.map((instruction, count) => {
               return <li key={count}>{instruction}</li>;
            })}
         </ol>

         </div>
      );
   }
}

export default Recipe;
