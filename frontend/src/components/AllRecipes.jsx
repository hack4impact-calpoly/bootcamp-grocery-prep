import React from "react";
import { Link } from "react-router-dom";
const url = "https://localhost:3001/api/recipe";

class AllRecipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        };
    }

    componentDidMount() {
        fetch(url)
        .then(response => response.json())
        .then(data => this.setState({recipes : data}));
    }

    render() {
        return (
            <section>
                <h1>Recipes By Country</h1>
                <div id="recipes">
                    {this.state.foodList && this.state.foodList.map(foodItem => {
                        const title = foodItem.title;
                        const id = foodItem.id;
                        return (
                            <Link to={"/recipe/#" + id}>{title}</Link>
                        )
                    })}
                </div>
            </section>
        )
    }
}

export default AllRecipes;
