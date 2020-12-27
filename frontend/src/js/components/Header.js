import '../../css/Header.css'
import {Link} from 'react-router-dom'
import {Route, Switch} from 'react-router-dom';

function Header(){
    return  (
        <header>
            <h1>A-MEAL-IA</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to='/about'>About the Chef</Link>
            </nav>
        </header>
    );
}

export default Header;