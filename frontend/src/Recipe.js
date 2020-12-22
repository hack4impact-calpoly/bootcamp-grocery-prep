import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Recipe.module.css'
import C from "./images/crepes.JPG"
import FR from "./images/fancyRamen.JPG"

class Recipe extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         list: [],
      };
   }

   componentDidMount() {
      fetch("http://localhost:3001/api/recipe")
      .then(res => res.json())
      .then(data => this.setState({ list: data}));

      document.title = 'Main Page';
   }

   render() {
      return (
         <div className = {styles.Recipe}>

            <h1>Welcome to Grocery Prep</h1>

            <div>
               <h4>Your one stop shop for all things grocery and meal planning related needs!</h4>
               <h4>Feel free to check out some of the recipes below. Enjoy!</h4>
            </div>

            <div className = {styles.RecipeBox}>
               <h2>Recipes</h2>
            </div>

            <div className= {styles.display}>
               <div className = {styles.RecipeList}>
                  {this.state.list && this.state.list.map(item => {
                     const id = item._id;
                     const title = item.title;

                     return <div style = {{"white-space":"nowrap"}}><p></p><Link to={'/recipe/#' + id}>{title}</Link></div>;
                  })}
               </div>


               <div className= {styles.images}>
                  <img src={C} alt='Crepes'></img>
                  <img src={FR} alt='Fancy Ramen'></img>
               </div>
            </div>
         </div>
      )
   }
}

export default Recipe
