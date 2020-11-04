/* id variable comes from random-recipie.js */
const postRating = async () => {
    let rating = document.getElementById("user-rating");
    if(!rating.checkValidity() || !rating.value) {
        console.log("Invalid Rating")
        return
    }

    ratingData = {
        "id": curRecipie._id,
        "rating": parseInt(rating.value)
    }
    postData(ratingData);
}

const postData = (ratingData) => {
    fetch('https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe', {
        method: "POST",
        body: JSON.stringify(ratingData)
    })
    .then(curRecipie.ratings.push(ratingData.rating))
    .then(displayRating(curRecipie.ratings))
    .catch((error) => {
        console.error('Error:', error);
    });
}