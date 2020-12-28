import './Header.css';

function Header() {
  return (
    <header>
      <h1>Milk Market</h1>
      <nav>
        <a href="main">Home</a>
        <a href="random">Random Recipe</a>
        <a href="about">About The Chef</a>
      </nav>
    </header>
  );
}

export default Header;