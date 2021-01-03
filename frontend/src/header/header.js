import './header.css';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <header id="header">
        <h1><Link to="/">Knife's Edge</Link></h1>
        <nav>
            <Link class="navbar" to="/about">About the Team</Link>
        </nav>
    </header>
  );
}

export default Header;