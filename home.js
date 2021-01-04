import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";



function Home(props){
    return(
      <Container className = 'm-3'>
        <Row>
          <h1 className = 'display-5'> The One Stop Shop for Great Recipes</h1>
        </Row>
        <Row className = 'mt-3'>
          <h3>Click any of the links below for a delicious recipe!!</h3>
        </Row>
        <Row className = 'mt-3'>
          <ul>
            {props.rec.map(recipe => (
              <li key = {recipe.title}>
                <Link to={recipe.title}>{recipe.title}</Link>
              </li>
            ))}
          </ul>
        </Row>
        <Row className = 'mt-3'>
          <img src="https://www.thecookierookie.com/wp-content/uploads/2020/01/crockpot-taco-meat-beef-tacos-6-of-8-1.jpg" alt = '' height='300' width = '300' className = 'mr-3'></img>
          <img src="https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2019/06/Salsa.jpg" alt = '' height='300' width = '400' className = 'ml-3'></img>
        </Row>
      </Container>
    )
}


export default Home;