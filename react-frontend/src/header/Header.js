import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    const getRandomRecipe = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/random-recipe');
            if (!response.ok) {
                const error = 'Unable to successfully get random recipe... non 200 code';
                console.log(error);
                alert(error);
            }
            const randomRecipe = await response.json();
            window.location.href = `/recipe?title=${encodeURIComponent(randomRecipe.title)}`;
        } catch(e) {
            console.log(e);
            alert('Unable to get random recipe from backend');
        }
    };

    return (
        <header>
            <h1>Grocery Prep</h1>
            <nav>
                <Link to='/'>Home</Link>
                <Link onClick={getRandomRecipe}>Random Recipe</Link>
                <Link to='about'>About the Chef</Link>
            </nav>
        </header>
    );
}

export default Header;