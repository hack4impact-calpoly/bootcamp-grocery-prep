import React from 'react';
import '../../css/RecipeList.css'
import { Link } from 'react-router-dom';

class RecipeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {list: []};
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/recipe/')
        .then(res => res.json())
        .then(data => this.setState({list: data}))
        document.title = "A-MEAL-IA";
    }

    getImage(name)
    {
        let image = require('./images/' + name);
        return image.default;
    }

    render() {
        return (
            <div>
                <div id= 'recipes'>
                    <h1> Recipes</h1>
                </div>
                    <div className='link-collection'>
                        {this.state.list && this.state.list.map(item => {
                            const id = item._id;
                            const title = item.title;
                            const picture = item.picture
                        return (
                            <div>
                              <Link to={'/recipe/#' + id}>{title}</Link>
                              <div className='food-pics'>
                                 <img src= {this.getImage(picture)} height='250px'></img>
                              </div>
                            </div>);
                        
                        })}
                </div>
            </div>
        );
    }
}

export default RecipeList;