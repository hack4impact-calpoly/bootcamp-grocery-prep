import React from 'react';
import {Link} from "react-router-dom";

import './main.css';

class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state ={list: []}
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/recipe')
            .then(res => res.json())
            .then(data => this.setState({ list: data}))
    }


    render(){
        return(
            <main>
                <div class="info">
                    <h2>What is Knife's Edge?</h2>
                    <p>Knife's Edge is a conglomoration of recipes that is curated to suit every homecook across the world. <br/>
                    The following few recipes are simply a taste of whats we have to offer with dozens more recipes coming soon.</p>
                </div>
                <section>
                    {this.state.list && this.state.list.map(recipe => {
                        const id = recipe._id
                        const name = recipe.name
                        const desc = recipe.desc
                        const picture = recipe.picture
                        return (
                            <div class="info recipe">
                                <p class="desc">
                                    <Link to={"/recipe/#" + id}>{name}</Link>
                                    {desc}
                                </p>
                                <img src={process.env.PUBLIC_URL + picture}></img>
                            </div>
                            )
                    })}
                </section>
            </main>
        )
    }
}

export default Main;
