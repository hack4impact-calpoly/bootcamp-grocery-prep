import React, { useState, useEffect } from "react";

function Recipe() {
    const title = window.location.hash.substring(1);
    const [desc, setDesc] = useState("");
    const [servings, setServings] = useState(1);
    const [rating, setRating] = useState(5);
    const [allRatings, setAllRatings] = useState([]);
    const [image, setImage] = useState("");
    const [ingredients, setIngredients] = useState({});
    const [instructions, setInstructions] = useState([]);


    function findAverageRating(ratings) {
        let average = 0;
        for (var i = 0; i < ratings.length; i++) {
            average += ratings[i];
        }
        return (average / ratings.length).toFixed(1);
    }

    useEffect(() => {
        fetch("http://localhost:3001/api/recipe/" + title)
            .then(res => res.json())
            .then(singleRecipe => {
                let avgRating = findAverageRating(singleRecipe[0].ratings);
                setRating(avgRating);
                setAllRatings(singleRecipe[0].ratings);
                setDesc(singleRecipe[0].desc);
                setImage(singleRecipe[0].picture);
                setIngredients(singleRecipe[0].ingredients);
                setInstructions(singleRecipe[0].instructions);
            });

    }, []);

    function updateIngredientCount(num) {
        Object.keys(ingredients).map((item) => {
            var oldVal = ingredients[item];
            var newVal = (oldVal + oldVal / servings * num);
            return ingredients[item] = newVal;
        })
    }

    function increaseServings() {
        setServings(servings + 1);
        updateIngredientCount(1);
    }

    function decreaseServings() {
        if(servings > 1) {
            setServings(servings - 1);
            updateIngredientCount(-1);
        }
    }

    function postRating() {
        const newRating = document.getElementById("select-rating").value;
        var object = allRatings;
        object.push(Number(newRating));
        setAllRatings(object);
        let newAvgRating = findAverageRating(allRatings);
        setRating(newAvgRating);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id: title, rating: newRating})
        };

        fetch("http://localhost:3001/api/rating", requestOptions);
    }

    return (
        <div className="container">
            <div className="headline">
                <h1>{title}</h1>
                <h2>{desc}</h2>
                <p>{rating} ⭐</p>
            </div>
            <div className="showcase">
                <h3>Servings</h3>
                <button onClick={decreaseServings} id="sub">-</button>
                <span style={{ margin: "0 10px" }}>{servings}</span>
                <button onClick={increaseServings} id="add">+</button>
            </div>
            <br />
            <div className="rating">
                <label for="select-rating" id="rating-label">Rate Me! </label>
                <select id="select-rating">
                    <option selected hidden disabled>Select Rating</option>
                    <option value="1">1 ⭐</option>
                    <option value="2">2 ⭐</option>
                    <option value="3">3 ⭐</option>
                    <option value="4">4 ⭐</option>
                    <option value="5">5 ⭐</option>
                </select>
                <button onClick={postRating} id="post-rating">Post Rating</button>
            </div>
            <br />
            <br />
            <img style={{ height: "300px" }} src={image} alt="feature-img" />
            <h2>Ingredients</h2>
            <ul>
                {ingredients && Object.keys(ingredients).map((item) => {
                    return <li key={item}><span className="count" base="1">{ingredients[item]} </span>{item}</li>
                })}
            </ul>
            <h2>Instructions</h2>
            <ol>
                {instructions && Object.keys(instructions).map((instruction) => {
                    return <li key={instruction}>{instructions[instruction]}</li>
                })}
            </ol>
        </div>
    );
}

export default Recipe;