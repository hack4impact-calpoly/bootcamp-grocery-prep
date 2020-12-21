import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Header.module.css'

function Header() {
   return (
      <div className = { styles.Header}>

         <h1 style={{"padding-left": "3%", "padding-top":"1%"}}>Grocery Prep</h1>

         <nav className = { styles.navBar}>
            <Link style= {{"padding-right":"10%"}} to="/">Home</Link>
            <Link style ={{"white-space": "nowrap"}} to="/about">About the Chef</Link>
         </nav>
      </div>
   )
}

export default Header
