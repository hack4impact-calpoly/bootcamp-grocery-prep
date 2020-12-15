
import Styles from './Header.module.css';

function Header() {
  return (//what will be sent to the screen
    <header>
      <h1>Grocery Prep</h1>
        <nav>
          <a className={Styles.linkText} href="/">Home</a>
          <a className={Styles.linkText} href="about.html">About The Chef!</a>
          <a className={Styles.linkText} href="randomPage.html">Random Recipe</a>
        </nav>
    </header>
  );
}

export default Header;