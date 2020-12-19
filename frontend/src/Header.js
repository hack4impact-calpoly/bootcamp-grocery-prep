import './Header.css';
import { BrowserRouter, NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>GROCERY PREP</h1>

      <nav>

        <NavLink to='/'>HOME</NavLink>
        <NavLink to='/about'>ABOUT</NavLink>

      </nav>

    </header>
  );
}

export default Header;