import styles from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className={styles.header}>
        <h1>Grocery Prep</h1>
        <nav className={styles.nav}>
            <Link className={styles.link} to='/'>Home</Link>
            <Link className={styles.link} to='/Chef'>About the Chef</Link>
        </nav>
    </header>
  );
}

export default Header;