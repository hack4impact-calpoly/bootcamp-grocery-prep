import React, { Component } from "react";
import { Link } from "react-router-dom";

import Cart from './Cart'

import '../css/home.css';

class Home extends Component {
    render() {
        return (
            <div className="master-page">
				<div className="home">
					<h1 className="homeIntro">Welcome to my Yummy Food Page</h1>
					<h4 className="homeDescription">I will be sharing my favorite food recipes with you</h4>
					<div className="foodGroup">
						<h3>Snacks</h3>
						<img src="images/avocado-toast.jpg" alt="snack pic"></img>
						<ul>
							<li><Link to="recipes/avocado-toast">Avocado Toast</Link></li>
							<li><Link to="recipes/salad">Salad</Link></li>
						</ul>
					<div className="foodGroup">
						<h3>Breakfast</h3>
						<img src="images/breakfast-burrito.jpg" alt="breakfast pic"></img>
						<ul>
							<li><Link to="recipes/breakfast-burrito">Breakfast Burrito</Link></li>
							<li><Link to="recipes/cheerios">Cheerios</Link></li>
						</ul>
					</div>
					<div className="foodGroup">
						<h3>Lunch/Dinner</h3>
						<img src="images/pizza.jpeg" alt="dinner pic"></img>
						<ul>
							<li><Link to="recipes/pizza">Pizza</Link></li>
							<li><Link to="recipes/salmon">Salmon</Link></li>
						</ul>
					</div>
				</div>
				</div>
                <Cart cart={this.props.cart} emptyCart={this.props.emptyCart}/>
            </div>
        );
    }
}

export default Home;