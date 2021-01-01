import styles from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1 className={styles.title}>Jillian's Grocery Prep</h1>
      <nav className={styles.navbar}>
            <Link className={styles.navitem} to="/">Home</Link>
            <Link className={styles.navitem} to="/about">About the Chef</Link>
            <a className={styles.navitem} href="/random">Random Recipe</a>
        </nav>
    </header>
  );
}

export default Header;