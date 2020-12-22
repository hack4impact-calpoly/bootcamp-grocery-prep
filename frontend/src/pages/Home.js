import React from "react";
import '../styles/home.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Home extends React.Component {
	render(){
		return(
			<div>
				<img className="intro-img" src={'/images/homefood.jpg'} alt="food" />
				<img className="circle-img"src={'/images/anna.png'} alt="anna" />
				<Card className="customCard" bg="white" text="white" style={{ width: '18rem' }}>
				<Card.Body>
					<Card.Title>HELLO!</Card.Title>
					<Card.Text>
						Welcome to my recipe website! This website features a compilation of some of my mom's recipes that she has collected over the years. I haven't learned how to cook most of them, unfortunately, but it's a goal of mine to work harder on making myself delicious food! I hope you enjoy this website!
					</Card.Text>
				</Card.Body>
				</Card>
			<div className="buttons">
				<Link to="/recipes"><Button className="button">Recipes</Button></Link>
				<Link to="/about"><Button className="button">About Me</Button></Link>
			
			</div>
			
		</div>
		);
	}
}

export default Home;