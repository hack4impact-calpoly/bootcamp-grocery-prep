import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row, Button} from 'react-bootstrap';  

import axios from 'axios';

function Recipe(props){
    const [recipe, setRecipe] = useState({});
    const url = 'http://localhost:3001/api/recipe/' + window.location.href.slice(22)
    const fetchData = async() =>{
        const result = await axios.get(url);
        setRecipe(result.data[0])
    }
    useEffect(() =>{
        fetchData();
    
    },[])

    return(
        <Container fluid>
            <Row>
                <Col xs={4}>
                    <h1 className = 'm-5'>{recipe.title}</h1>
                </Col>
                <Col xs={3}className = 'm-5'>
                    <h1>Rating</h1>
                </Col>
                <Col>
                <Button xs={3}className = 'm-5'>Add to Cart</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Recipe;