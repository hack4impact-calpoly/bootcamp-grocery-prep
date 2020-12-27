import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         list: []
      };
   }

   componentDidMount() {
      fetch(`http://localhost:4000/api/recipe`)
      .then(res=>res.json())
      .then(data => this.setState({list: data}));
   }

   render() {
      return (
         <div className='home'>
         	<p></p>
	        <div className="topImg">
	           <img src={process.env.PUBLIC_URL+'/images/home.jpg'} alt="img of a cafe"/>
	        </div>
            <h2>Welcome to Sticks Cafe</h2>

            <p>Lets enjoy a nice drink together~!</p>

            <h3>Menu</h3>
            <div className='menu'>
               {this.state.list && this.state.list.map(item => {
                  const title = item.title;
                  const name = item.name;
                  return <p><Link to={'/recipe/' + title}>{name}</Link></p>;
               })}
            </div>
         </div>
      );
   }
}

export default Home;
