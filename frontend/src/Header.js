import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header>
           <h1> Grocery Prep </h1>
           <nav>
               <Link to="/"> Home </Link>
               <Link to="/recipes"> Recipes </Link>
               <Link to="/about"> About the Chef </Link>
           </nav>
        </header>
    )
}

export default Header;