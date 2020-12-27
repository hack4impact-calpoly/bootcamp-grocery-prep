import { Link } from "react-router-dom"

function Header() {
    return (
        <header>
            <h1>Food around (some) of the World</h1>
            <nav>
                <Link className="a" to="/">Home</Link>
                <Link className="a" to="/about">About</Link>
            </nav>
        </header>
    );
}

export default Header;