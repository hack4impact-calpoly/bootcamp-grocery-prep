import React from 'react';
import './Navigation.css';
const Navigation = (props) => {
  return (
    <header>
      <h1 className="main-text">Grocery Prep</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/randomRecipe.html">Random Recipe</a>
        <a href="/about.html">About Me</a>
      </nav>
    </header>
  );
}

export default Navigation;