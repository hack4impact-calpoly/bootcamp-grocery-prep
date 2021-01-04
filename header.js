import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";


function Header(){
    return(
        <Container fluid className='p-0'>
            <Row className="bg-dark p-2">
                <Col>
                    <h3 className = " display-5 text-white text-left">Archie's Recipe Website</h3>
                </Col>
                <Col xs={4}>
                    <nav className = "navbar text-white">
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About me</Link>
                    </nav>
                </Col>
            </Row>
        </Container>
    )
}

export default Header;