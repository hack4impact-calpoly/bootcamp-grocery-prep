import React from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import About from './pages/About';
import { Route, Switch } from 'react-router-dom';
import IndividualRecipe from './pages/IndividualRecipe';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {items:[]}
	}
		
	addToCart = (cartItems) =>{
		const items = this.state.items;
		for (var i = 0; i< cartItems.length; i++) {
			items.push(cartItems[i])
		}
		this.setState({items: items});
	}
	
	clearCart = () => {
		this.setState({items:[]})
	}
	
	render(){
		return (
			<div>
				<div className="Site-content">
					<Header />
					<main>
						<Switch>
							<Route path="/" component={Home} exact />
							<Route path="/recipes" render={(props) => (
								<Recipes items={this.state.items} clearCart={this.clearCart}/>
							  )}/>
							<Route path="/individual" render={(props) => (
								<IndividualRecipe items={this.state.items} addToCart={this.addToCart} clearCart={this.clearCart}/>
							  )} />
							<Route path="/about" component={About} />
							<Route component={Error} />
						</Switch>
					</main>
				</div>
				<Footer />
			</div>
  );}
}
export default App;
