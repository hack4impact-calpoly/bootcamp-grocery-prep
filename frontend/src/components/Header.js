import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Header.module.css';

function Header() {
  return (
    <header>
		<h1><Link to="/">Anna's Recipes</Link></h1>
		<nav>
			<Link to="/recipes">Recipes</Link>
			<Link to="/about">About Me</Link>
		</nav>
    </header>
	  
  );
}

export default Header;