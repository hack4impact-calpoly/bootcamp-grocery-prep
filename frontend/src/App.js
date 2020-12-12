import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header.js'
import Cart   from './components/Cart.js'
import RecipeList from './components/RecipeList.js'
import About  from './pages/About.js'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { cart: [] };
	}

	updateCart = (items) => {
		const cart = this.state.cart;
		for (const item in items) {
			if(cart[item] === undefined) {
				cart[item] = +(items[item]);
			}
			else{
				cart[item] += +(items[item]);
			}
		}

		this.setState({cart: cart});
	}

	emptyCart = () => this.setState({ cart: [] });

	render() {
		return (
			<BrowserRouter>
				<Header />
				<Route exact path='/'>
					<main id='browse'>
						<RecipeList />
						<Cart cart={this.state.cart} emptyCart={this.emptyCart} />
					</main>
				</Route>
				<Route exact path='/about'>
					<About />
				</Route>
			</BrowserRouter>
		);
	}
}

export default App;
