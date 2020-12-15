
import './Header.css';

function Header() {
  return (//what will be sent to the screen
    <header className={StyleSheet.header}>
      <h1>Grocery Prep</h1>
      <nav>
          <li><a className={StyleSheet.backButton} href="about.html">About The Chef!</a></li>
          <li><a className={StyleSheet.random} href="randomPage.html">Random Recipe</a></li>
      </nav>
    </header>
  );
}

export default Header;