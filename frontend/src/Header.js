import './Header.css';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Milk Market</h1>
      <nav>
        <li><Link to="/">Home</Link></li>
        <li><Link to="random">Random Recipe</Link></li>
        <li><Link to="about">About The Chef</Link></li>
      </nav>
    </header>
  );
}

export default Header;