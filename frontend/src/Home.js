import RecipePreview from "./RecipePreview";
import React from 'react'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {recipes: []}
    }

    async componentDidMount() {
        let newRecipes = await fetch('http://localhost:4000/api/recipe');
        newRecipes = await newRecipes.json();
        this.setState({recipes: newRecipes})
    }

    render () {
        const recipes = this.state.recipes
        const recipePreviews = recipes.map(recipe => <RecipePreview recipe={recipe}/>)

        return (
            <div>
                <h1>Let's start cooking!</h1>
                {recipePreviews}
            </div>
        )
    }
}

export default Home