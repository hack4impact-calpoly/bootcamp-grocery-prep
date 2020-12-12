import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header.js'
import About  from './pages/About.js'

class App extends React.Component {
	
	render() {
		return (
			<BrowserRouter>
				<Header />
				<Route exact path='/about'>
					<About />
				</Route>
			</BrowserRouter>
		);
	}
}

export default App;
