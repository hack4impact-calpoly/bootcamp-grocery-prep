import React, { Component } from 'react';
import { Link } from "react-router-dom";


class NavBar extends Component {
    render() {
        return (
            <div className="navbar">
                <h5>Yummy Food</h5>
                    <Link className="navbar-link" to="/">Home</Link>
                    <Link className="navbar-link" to="/random">Surprise Recipe</Link>
                    <Link className="navbar-link" to="/about">About the Chef</Link>
            </div>
        );
    }
}

export default NavBar;