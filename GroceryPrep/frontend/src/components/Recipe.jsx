import React, { useEffect, useState } from 'react';
import './Recipe.css';

const Recipe = (props) => {
  const { setCartItems } = props;
  const [curRecipe, setCurRecipe] =  useState('');
  const [rating, setCurRating] =  useState(0);
  const [data, setData] =  useState({});
  const [ingredients, setIngredients] =  useState([]);
  const [instructions, setInstructions] =  useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3000/api/recipe/' + curRecipe);
      res
        .json()
        .then(res => setData(res))
    }
    fetchData();
  }, [curRecipe]);

  function addToCart(ingredients) {
    for (let i = 0; i < ingredients.length; i++) {
      setCartItems(cartItems => ( [...cartItems, ingredients[i]]))
    }
  };

  useEffect(() => {
    let ratings = data.ratings;
    if (ratings) {
      const total = ratings.reduce((acc, c) => acc + c, 0);
      setCurRating(total / ratings.length);
    }
    let ingredients = data.ingredients;
    if (ingredients) {
      setIngredients(ingredients);
    }
    let instructions = data.instructions;
    if (instructions) {
      setInstructions(instructions);
    }
  }, [data.ratings, data.ingredients, data.instructions]);

  return (
    <div className="background"> 
      <h1 >Recipes</h1>
      <button className="mealText" onClick={() => setCurRecipe('Cereal')}>Cereal</button>
      <button className="mealText" onClick={() => setCurRecipe('Toast')}>Toast</button>
      <button className="mealText" onClick={() => setCurRecipe('Cookies')}>Cookies</button> 
      <button className="mealText" onClick={() => setCurRecipe('Pizza')}>Pizza</button> 
      {curRecipe ? (
        <div className="mealPadding">
          <div className="mealName"> 
            Recipe for <span>{data.title}</span> 
            <span className="mealRating"> 
              {rating} ☆ 
            <button className="buyButton" onClick={() => addToCart(ingredients)}>Add to Cart</button>
            </span>
          </div>
          <div className="mealDescription"> 
            Description: <span>{data.desc}   (Serves: {data.serving})</span>
          </div>

          <div> 
            <span><img src={data.picture} height="250" alt="Food"></img></span>
          </div>
          
          <div> 
            INGREDIENTS             
          </div> 
          <div className="mealPadding"> 
            {ingredients.map((ingredient, index) => (<li key={index}>{ingredient}</li>))}
          </div>
          <div> INSTRUCTIONS </div>
          <div className="mealPadding"> 
          {instructions.map((instruction, index) => (<li key={index}>{instruction}</li>))}
          </div>
        </div>
      ) : null }
    </div>

  );
}

export default Recipe;