import React, { Component } from "react";

import '../css/about.css'

class About extends Component {
    render() {
        return (
            <div class="aboutPage">
				<h1>About the Chef</h1>
				<p>
					Greetings! If you're like me, nothing compares to a delicious homemade meal. 
					I come from a humble background of eating only my parents' cooking and 805, 
					but over the past two years I have learned several tasty recipes after living with 
					a kitchen and an ever present appetitie. On this site, you can find several of my 
					favorite recipes that are relatively quick and easy to make, but never fail to satisfy 
					my taste buds.
				 </p>
				 <p>
					Feel free to try out my recipes and let me know if anything is unclear or tastes bad. 
				</p>
				<p>
					Notice: Cook at your own risk. Yummy Food is not responsible for burnt food or allergic reactions
				 </p>
				 <div class="images">
					<img src = "images/me1.jpg" alt="Emily" class = "image"></img>
					<img src = "images/me2.jpg" alt="Emily" class = "image"></img>
				</div>
			</div>
        );
    }
}

export default About;