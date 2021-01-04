import React from 'react';
import { Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function About(){
    return(
        <Container fluid>
            <Row className = 'mt-3 ml-5'>
                <h1>About me!</h1>
            </Row>
            <Row className = 'mt-2 ml-5'>
                <p>
                    My name is Archie Jones and I am a first year software engineering student at Cal Poly!
                    Although I have yet to find my passion for cooking, every now and then I like to throw together a meal
                    and these are some of my favorite recipes!
                </p>
            </Row>
        </Container>
    )
}

export default About;