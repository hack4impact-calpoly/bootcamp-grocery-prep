import React from 'react'
import {Link} from 'react-router-dom'
import './Recipe.css'
import cerealPic from './images/cereal.jpg'
import pbjPic from './images/pbj.jpg'
import quesdillaPic from './images/quesdilla.jpg'
import trailMixPic from './images/trailMix.jpg'
const url = 'http://localhost:8000/api/recipe'

class RecipesOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            foodList: []
        };
    }

    componentDidMount(){
        fetch(url)
        .then(response => response.json())
        .then(data => this.setState({ foodList : data}));
        
    }

    render(){
        return (
            <section>
                <h1> Welcome to the Recipes Page :) </h1>
                 <p> Fill your tummy with something yummy! </p>
                 <p> Check out the different options below! </p>
                 
                <h2> Food </h2>
                <div id="RecipeLinks">
                    {this.state.foodList && this.state.foodList.map(foodItem => {
                        const title = foodItem.title;
                        const id = foodItem._id;

                        return (
                        <Link to={'/recipe/#' + id}>{title}</Link>
                        )
                    })}
                </div>
                <img id="imgDisplay" src={cerealPic} height="260" width="400" alt="Food Pic"></img>
                <img id="imgDisplay" src={pbjPic} height="260" width="400" alt="Food Pic"></img>
                <img id="imgDisplay" src={quesdillaPic} height="260" width="400" alt="Food Pic"></img>
                <img id="imgDisplay" src={trailMixPic} height="260" width="400" alt="Food Pic"></img>
            </section>
        )
    }

}

export default RecipesOverview;