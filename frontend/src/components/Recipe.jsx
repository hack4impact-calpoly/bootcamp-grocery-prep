import React from "react";
const url = "https://localhost:3001/api/recipe/";

class Recipe extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            addToCart: props.addToCart
        };
    }

    calculateRating (ratings) {
        let total = 0;
        for(const rate in ratings) {
            total += +(ratings[rate]);
        }
        return (total / ratings.length).toFixed(1);
    }

    componentDidMount() {
        const id = window.location.hash.substr(1);
        fetch(url + id)
        .then(response => response.json)
        .then(response => {
            this.setState({...recipe});
            let currentRating = this.calculateRatings(recipe.ratings);
            this.setState({avgRating: currentRating});
        })
    }

    updateRatings() {
        const rating = document.getElementById("rating");
        const updatedRatings = this.state.ratings;
        rating.innerHTML = "&star" + this.calculateRating(updatedRatings);
    }

    postNewRating() {
        const newRating = document.getElementById("select-rating").value;
        this.setState({ratings: [...this.state.ratings, newRating]});
        let currentRating = this.calculateRating(this.state.ratings);
        this.setState({a})
    }
}

export default Recipe;