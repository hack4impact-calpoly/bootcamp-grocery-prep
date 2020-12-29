import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className = 'Header'>
    	<header>
      	  <h1>Grocery Prep</h1>

	  <nav>
	     <Link to='/'> Home </Link>
	     <Link to='/random-recipe'> Random Recipe </Link>
	     <Link to='/about-me'> About Me </Link>
	  </nav>

   	</header>
    </div>
  );
}

export default Header;
