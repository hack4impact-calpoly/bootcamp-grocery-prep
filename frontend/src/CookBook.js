import styles from './CookBook.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CookBook() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/recipe`)
    .then(response => response.json())
    .then(json => setData(json.map(element => <Link to={'/recipe/' + element.title} key={element._id}>{element.title}</Link>)))
  }, [])

  return (
    <div className={styles.recipeFormat}>
      <header>
        <h1>Welcome to Grocery Prep</h1>
      </header>
      <p>I have some tasty treats and meals below. Please help yourself!</p>
      <h2 className={styles.recipeHeaderFormat}>Recipes</h2>
      <div className={styles.recipeLink}>
        {data}
      </div>
    </div>
  );
}

export default CookBook;