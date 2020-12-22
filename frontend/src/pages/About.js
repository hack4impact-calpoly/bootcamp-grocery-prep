// JavaScript Document\

import React from "react";
import '../styles/home.css';
import '../styles/about.css';
import Card from 'react-bootstrap/Card';

class About extends React.Component {
	render(){
		return(
			<div>
				<div className= "img-container">
					<img className="anna-img" src={'/images/a1.jpeg'} alt="a1" />
					<img className="anna-img" src={'/images/a2.jpeg'} alt="a2" />
					<img className="anna-img" src={'/images/a3.jpeg'} alt="a3" />
				</div>
				<Card className="customCard2">
				<Card.Body>
					<Card.Title>I'm Anna!</Card.Title>
					<Card.Text>
						<p>Hi everyone, welcome to my recipe website! I am no chef, so all of the recipes that I have on this website are from my mom. However, I am NOT a picky eater and I love all kinds of food! Sushi is one of my all time favorites.</p>

						<p>I was born and raised in Washington. When people ask, I usually say I’m from Seattle, but I’m actually from an area about 45 minutes outside of the city called Bothell. In my free time (when I’m not coding or doing homework) I love getting outdoors, especially in SLO. I normally walk to Poly Canyon at least twice per week; it’s one of my favorite places to go. I also love skiing, and I just recently got into roller blading! I’ve been surfing a few times but I haven’t stood up yet.</p>

						<p>I forgot to say that I’m also a huge movie nerd. Just thought I’d add that here. I also wanted to mention that Hack4Impact has been a huge part of my education at Cal Poly so far, I’ve gained more than I could have possibly imagined around all of the wonderful members of this club. I’ll be forever thankful.</p>
					</Card.Text>
				</Card.Body>
			
				</Card>
			
			<img className="anna-img anna-img-bottom" src={'/images/a6.jpeg'} alt="a6" />
			
		</div>
		);
	}
}

export default About;