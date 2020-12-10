import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
	return (
		<header>
			<h1>My Favorite Recipes</h1>
			<nav>
				<Link to='/'>Home</Link>
				<Link to='/about'>About the Chef</Link>
			</nav>
		</header>
	);
}

export default Header;
