import './Recipe.css';
import React, { Component } from 'react';


class Recipe extends Component {

  constructor(props) {
         super(props);
         this.state = {
            title: '',
            rating: ''
         }
      }


  componentDidMount(){
        fetch('http://localhost:3001/api/recipe/:' + window.location.href.split(':')[3])
             .then(res => res.json())
             .then(data => this.setState({ ...data }))
             .then(() => this.updateRatings())
        }


  render() {
    return(

    <div class="recipe" ref={el => (this.instance = el)}>

        <div class="headline">
            <h1 id="title">{ (this.state.title).replace('-', ' ') }</h1>
            <div id="actions">
            <div id="ratings">
                <span id="rating">{ this.state.rating } &#9734;</span>
            </div>
            <button onClick= {() => this.updateCart()}>Add to Cart</button>
            </div>
        </div>

        <div class = "recipe-header">
            <div class = "recipe-description">
                <p>{ this.state.desc }</p>
                <div class="servings">
                    <h3>Servings:</h3>
                    <button id = "dec" onClick={() => this.updateAmounts(-1) }>-</button>
                    <span id = "serving-count">{ this.state.servings }</span>
                    <button id = "inc" onClick={() => this.updateAmounts(1) }>+</button>
                </div>
                <div class="rating">
                                <label for="select-rating" id="rating-label">Rate Me!</label>
                            <select id="select-rating">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <button id="post-rating" onClick={() => this.postRating(document.getElementById('select-rating').value)} >Post Rating</button>
                            </div>
            </div>

            <div><img alt = "food-pic" class='recipe_photo' src={ this.state.picture }/></div>
        </div>
        <h2>Ingredients</h2>
        <ul>
           { this.state.ingredients && this.state.ingredients.map((ingredient, i) => {
            						return <li key= { i } ><span class="count">{ ingredient.amount }</span>
            						{ ingredient.name }</li>})}
        </ul>
        <h2>Instructions</h2>
        <ol>
            { this.state.instructions && this.state.instructions.map((instruction, i) => {
                        return <li key={ i }>{ instruction }</li>})}
        </ol>
    </div>
  )}


   updateRatings() {
        let sum = 0;
        let size = this.state.ratings.length

        for (let i = 0; i < size; i++){
            sum += parseFloat(this.state.ratings[i])
                    }
        this.setState({
            rating: (sum/size).toFixed(2)
                    })
    };


  updateCart = () => {
          { this.props.onCartChange( this.state.ingredients ) }
    };


   updateAmounts = (val) => {
         console.log(val)
         let items = [...this.state.ingredients]
         let servingCount = +(this.state.servings) + val

         if (servingCount > 0){
            { items && items.map((ingredient, i) => {
             if (ingredient.amount !== undefined){
                ingredient.amount = (parseFloat(ingredient.amount) + val*(parseFloat(ingredient.amount)/(parseFloat(servingCount)-val))).toFixed(2) }
             })}
            this.setState({
                ingredients: items,
                servings: servingCount
            })
               }};


    postRating = async (rating) =>  {
        try {
                const URL = 'http://localhost:3001/api/recipe/:' + window.location.href.split(':')[3];
                const response = await fetch(URL)
                const jsonResponse = await response.json();


                await fetch(URL, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "id": this.state._id,
                        "rating": rating,
                        "name": this.state.title
                        })
                    })
                    .then(this.updateRatings())
                    .then(response => response.json())
                    .then(json => console.log(json))

            } catch (err){
                    console.log(err);
                 }
    };
    }


export default Recipe;