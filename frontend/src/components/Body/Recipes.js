import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Recipes.css';

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = { RecipeList: [] };
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/recipe')
            .then(res => res.json())
            .then(data => this.setState({ RecipeList : data})) 
    }

    render () {
        return (
            <div className='recipes-content'>
                <div className='recipes-recipes'>
                    <h1>Recipes</h1>
                    <div className='recipes-breakfast'>
                        <h2>Breakfast</h2>
                    </div>
                    <div className='recipes-breakfast-list'>
                        <ol className='recipes-breakfast-links'>
                            {this.state.RecipeList && this.state.RecipeList.slice(0, 3).map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={'/recipe/' + item.title} className='recipes-breakfast-item'>
                                            {item.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ol>
                        <div className='recipes-breakfast-img'>
                            <img src={process.env.PUBLIC_URL + '/Images/Breakfast/scrambled-egg-muffins-image.jpg'} alt='scrambled egg muffins' height='250px'/>
                        </div>
                    </div>
                    <div className='recipes-lunch'>
                        <h2>Lunch</h2>
                    </div>
                    <div className='recipes-lunch-list'>
                        <ol className='recipes-lunch-links'>
                            {this.state.RecipeList && this.state.RecipeList.slice(3, 6).map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={'/recipe/' + item.title} className='recipes-lunch-item'>
                                            {item.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ol>
                        <div className='recipes-lunch-img'>
                            <img src={process.env.PUBLIC_URL + '/Images/Lunch/veggie-wrap-image.jpg'} alt='veggie wrap' height='250px'/>
                        </div>
                    </div>
                    <div className='recipes-dinner'>
                        <h2>Dinner</h2>
                    </div>
                    <div className='recipes-dinner-list'>
                        <ol className='recipes-dinner-links'>
                            {this.state.RecipeList && this.state.RecipeList.slice(6, 9).map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={'/recipe/' + item.title} className='recipes-dinner-item'>
                                            {item.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ol>
                        <div className='recipes-dinner-img'>
                            <img src={process.env.PUBLIC_URL + '/Images/Dinner/rice-bowl-image.jpg'} alt='rice bowl' height='250px'/>
                        </div>
                    </div>
                    <div className='recipes-desserts'>
                        <h2>Desserts</h2>
                    </div>
                    <div className='recipes-desserts-list'>
                        <ol className='recipes-desserts-links'>
                            {this.state.RecipeList && this.state.RecipeList.slice(9, 12).map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={'/recipe/' + item.title} className='recipes-desserts-item'>
                                            {item.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ol>
                        <div className='recipes-desserts-img'>
                            <img src={process.env.PUBLIC_URL + '/Images/Desserts/smores-image.jpg'} alt="s'mores" height='250px'/>
                        </div>
                    </div>
                    <div className='recipes-snacks'>
                        <h2>Snacks</h2>
                    </div>
                    <div className='recipes-snacks-list'>
                        <ol className='recipes-snacks-links'>
                            {this.state.RecipeList && this.state.RecipeList.slice(12).map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={'/recipe/' + item.title} className='recipes-snacks-item'>
                                            {item.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ol>
                        <div className='recipes-snacks-img'>
                            <img src={process.env.PUBLIC_URL + '/Images/Snacks/carrots-and-hummus-image.jpg'} alt='carrots and hummus' height='250px'/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recipes;