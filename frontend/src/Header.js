import React from 'react'
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends React.Component {
   render() {
      return (
         <header>
            <h1>Sticks Cafe</h1>
            <nav>
               <Link to='/'>Home</Link> 
               <Link to='/about'>About Stick</Link>
            </nav>
         </header>
      );
   }
}

export default Header;
