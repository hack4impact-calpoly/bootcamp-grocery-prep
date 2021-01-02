import styles from "../styleFiles/Home.module.css";
import React from "react";
import {Link} from "react-router-dom";
import chef from "../images/chefBoyardee.jpg";

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    fetch("http://localhost:3001/api/recipe")
      .then(res => res.json())
      .then((data) => this.setState({recipeList: data}));
  }

  render() {
    return (
      <div className={styles.homeStyle}>
        <div id="mainIntro">
          <h1>Welcome to my cooking site!</h1>
	  <img src={chef}></img>
	  <h2>{"Important rules for using recipes from this site:"}</h2>
        </div>
        <div class="content">
	  <ol>
	    <li>Be safe!</li>
	    <li>Have fun!</li>
	    <li>Enjoy some good food!</li>
	  </ol>
        </div>
        <div class="subHeader">
          <h1>Recipes:</h1>
        </div>
        <br/>
	<div id="recipeLinks">
	  {
	    this.state.recipeList && this.state.recipeList.map(rec =>(
	      <div id="linkBox">
	        <Link to={"/recipe/#" + rec.title}>{rec.title}</Link>
	      </div>
	    ))
          }
	  <a href="https://www.papamurphys.com/">Pizza</a>
	</div>
      </div>
    );
  }
}

export default Home;
