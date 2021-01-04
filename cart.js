import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Button } from 'react-bootstrap';



function Cart(props){
    const [ingredients, setIngredients] = useState({});
    let recipes;
    let id;
    const getId = () => {
        let temp = window.location.href.slice(22);
        id = temp.replace('%20',' ');
    }
    const findRecipe = (array) => {
        getId();
        if(id && id !== 'about'){
            for(let i = 0; i < array.length; i++){
                if(array[i].title === id){
                    recipes = array[i]
                }
            }
        }
    }
    const merge = (...argument) => {
        let target = {};
        const merger = (obj) => {
            for (let prop in obj) {
                if (!target.hasOwnProperty(prop)) {
                    target[prop] = obj[prop];
                }
                else{
                    target[prop] = Number(obj[prop]) + Number(ingredients[prop])
                }
            }
        };
        for (let i = 0; i < argument.length; i++) {
            merger(argument[i]);
        }
        return target;
    };
    

    const buttonClick = () => {
        findRecipe(props.rec);
        if(id && id !== 'about' ){
            setIngredients(merge(ingredients, recipes.ingredients))
        }
    }
    return(
        <Container fluid>
            <Row>
                <Col className = 'mt-3'>
                    <h3 className = 'text-center'>Your Cart</h3>
                </Col>
            </Row>
            <Row className = 'text-center'>
                <Col>
                    <Button onClick = {()=>{buttonClick()}}>Add to Cart</Button>
                </Col>
                <Col>
                    <Button onClick = {()=>setIngredients({})}>Empty Cart</Button>
                </Col>
            </Row>
            <Row className = 'mt-3'>
                <ul>
                    {ingredients ? Object.entries(ingredients).map(ingredient => (
                    <li key = {ingredient[0]}>{+(ingredient[1])} {ingredient[0]}</li> 
                    )) : <p>loading...</p>}
                </ul>
            </Row>
        </Container>
    )
}

export default Cart;