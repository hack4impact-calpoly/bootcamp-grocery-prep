import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";

function RecipeOverview() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/recipe")
        .then(res => res.json())
        .then(allRecipes => setRecipes(allRecipes));
    });

    return (
        <div className="container">
            <h2>List of Recipes by Country</h2>
            <div>
                {recipes && recipes.map(recipe => {
                    const title = recipe.title;
                    return <Link className="recipeLink" to={"recipe/#" + title}>{title}</Link>})}
            </div>
        </div>
    )
}

export default RecipeOverview;