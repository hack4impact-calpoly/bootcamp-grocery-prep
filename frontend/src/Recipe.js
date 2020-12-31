import Rating from './Rating'
import React from 'react'
import {withRouter} from 'react-router'
import style from './Recipe.module.css'

class Recipe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.userRating = React.createRef()

        this.postRating = this.postRating.bind(this)
        this.addToCart = this.addToCart.bind(this)
      }

    async componentDidMount() {
        const recipeName = this.props.match.params.recipeName //Access Recipe Name from URL
        let recipeData = await fetch('http://localhost:4000/api/recipe/' + recipeName);
        recipeData = await recipeData.json();
        this.setState(recipeData)
    }

    changeServing(change) {
        this.setState(state => ({servings: Math.max(state.servings + change, 1)}))
    }

    async postRating() {
        if(!this.userRating.current.checkValidity()) {
            console.log("Invalid Rating")
            return
        }

        let ratingValue = parseInt(this.userRating.current.value)
    
        let ratingData = {
            "id": this.state._id,
            "rating": ratingValue
        }

        await fetch('http://localhost:4000/api/rating', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ratingData)
        })

        this.updateRating(ratingValue)
    }

    updateRating(newRating) {
        this.setState(state => ({ratings: [...state.ratings, newRating]}))
    }

    addToCart() {
        let ingredientData = {}
        for (let curIngredient in this.state.ingredients) {
            ingredientData[curIngredient] = this.state.ingredients[curIngredient] * this.state.servings
        }
        this.props.updateIngredients(ingredientData)
    }


    render () {
        let ingredients = []
        if (this.state.ingredients) {
            for (let ingredient in this.state.ingredients) {
                ingredients.push(<li>{this.state.ingredients[ingredient] * this.state.servings} {ingredient}</li>)
            }
        }
        let instructions = this.state.instructions ? this.state.instructions.map(step => <li>{step}</li>) : []

        return (
            <div>
                <div className={style.titleHolder}>
                    <h1>{this.state.title}</h1>
                    <button className={style.addToCart} onClick={this.addToCart}>Add to Cart</button>
                </div>
                <div className={style.flex}>
                    <img className={style.img} src={process.env.PUBLIC_URL + '/images/' + this.state.pictureURL} 
                        alt={this.state.title} />
                    <div>
                        <p>{this.state.desc}</p>

                        <div className={style.centeredDiv}> 
                            <h3 className={style.h3}>Servings</h3>
                            <button className={style.button} onClick={() => this.changeServing(-1)}>
                                <svg className={style.svg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
                            </button>
                            <span className={style.numServings}>{this.state.servings}</span>
                            <button className={style.button} onClick={() => this.changeServing(+1)}>
                                <svg className={style.svg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
                            </button>
                        </div>
                        <div className={style.centeredDiv}>
                            <h3 className={style.h3}>Rating</h3>
                            <Rating color={"var(--emphasis)"} rating={this.state.ratings ? this.state.ratings : []}/>
                        </div>

                        <div className={style.centeredDiv}>
                            <h3 className={style.h3}>Submit a Rating</h3>
                            <input id="user-rating" type="number" min="1" max="5" required  ref={this.userRating}/>
                            <button className={style.submitUserRating} onClick={this.postRating}>Submit</button>
                        </div>
                    </div>
                </div>
            
                <h2 className={style.h2}>Ingredients</h2>
                <ul style={{listStyle: 'square'}}>{ingredients}</ul>
                
                <h2 className={style.h2}>Instructions</h2>
                <ol>{instructions}</ol>
            </div>
        )
    }
}

export default withRouter(Recipe) //withRouter makes it easier to parse URL on line 7