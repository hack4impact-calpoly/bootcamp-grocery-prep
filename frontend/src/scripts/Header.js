import styles from "../styleFiles/Header.module.css";
import React from "react";
import {Link} from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header className={styles.headerStyle}>
        <h1 class="siteName">{"Cole's Kitchen"}</h1>
	<nav>
	  <Link to="/">Home</Link>
	  <Link to="/aboutthechef">About the Chef</Link>
	</nav>
      </header>
    );
  }
}

export default Header;
