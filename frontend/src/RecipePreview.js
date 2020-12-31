import React from 'react'
import style from './RecipePreview.module.css'
import Rating from './Rating'
import {Link} from 'react-router-dom'

class RecipePreview extends React.Component {
    render() {
        const recipe = this.props.recipe

        return (
            <Link to={'recipe/' + recipe.title} className={style.noStyling}>
                <div className={style.div}>
                    <img className={style.img} src={process.env.PUBLIC_URL + 'images/' + recipe.pictureURL} 
                        alt={recipe.title} />
                    <h2>{recipe.title}</h2>
                    <p>{recipe.desc}</p>
                    <Rating rating={recipe.ratings} />
                </div>
            </Link>
        );
    } 
}

export default RecipePreview