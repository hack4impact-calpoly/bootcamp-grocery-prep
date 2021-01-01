
import styles from './Home.module.css';
import React from 'react';
import { Link } from 'react-router-dom';



class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {list: []}
  }
  componentDidMount() {
    fetch('http://localhost:3001/api/recipe/')
        .then(res => res.json())
        .then(data => this.setState({list: data}))
        document.title = "Jillian's Recipes!";
        
  }
  picturePath(picture)
  {
    let image = require('../../images/' + picture);
    return image.default;
  }

  render() 
  {
    return (
      <section>
        <h1>Welcome!</h1>
        <p>I promise you might enjoy at least one of these recipes</p>
        <div >
          {this.state.list && this.state.list.map(item => {
            const id = item._id;
            const title = item.title;
            const picture = item.picture;
            return (
              <div className={styles.recipegroup}>
                <div>
                <Link to={'/recipe/#' + id}>{title}</Link>
                <div className={styles.picture}>
                  <img src= {this.picturePath(item.picture)} height='250px'/>
                </div>
                </div>
              </div>
            ); 
          })}
        </div>
      </section>
    );
  }
}

export default Home;