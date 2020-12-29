// import React from 'react';

// class Navbar extends React.Component {

// }

// OR

import React, { Component } from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.css';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">Grocery Prep</h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                {/* <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/random-recipe'>Random Recipe</Link>
                    <Link to='/about-the-chef'>About the Chef</Link>
                </nav> */}
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                    // {MenuItems.map((item) => {
                        return (
                            <Link to={item.url} className={item.cName} onClick={this.toggleNavbar}>
                                {item.title}
                            </Link>
                            // <li key={index}>
                                // <a className={item.cName} href={item.url}>
                                //     {item.title}
                                // </a>
                            // </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default Navbar;