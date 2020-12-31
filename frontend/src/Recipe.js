import './Recipe.css';
import React from 'react';


class Recipe extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            //title: "random"
        };
    }

    componentDidMount(){
        const name = window.location.hash.substr(1)
        console.log(name)
        fetch(`http://localhost:3001/api/recipe/` + name)
            .then(res => res.json())
            .then(data => {
                this.setState({...data})
                let sum = 0
                for(var i = 0; i < data.ratings.length; i++){
                    
                    sum += data.ratings[i]
                }
                
                let rate = sum/data.ratings.length
                rate = rate.toFixed(2)
                console.log(rate)
                this.setState({avgRating: rate})
                let imgPath = `./../../public/` + data.picture
                console.log(imgPath)
                this.setState({picPath: imgPath})
                
                console.log(this.state.ratings)
            });
    }

    postARating(){
        const ratingSelector = document.getElementById("user-rating")
        const rating = Number(ratingSelector.options[ratingSelector.selectedIndex].value)
    
        this.updateCurRating(rating)
    
        const postData = {
            id: this.state._id,
            rating: rating
        }
    
        fetch(`http://localhost:3001/api/rating`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
    
    }

    updateCurRating(newRate){
        this.setState({ratings: [...this.state.ratings, newRate]})
        let sum = 0
        for(var i = 0; i < this.state.ratings.length; i++){
            
            sum += this.state.ratings[i]
        }
        
        let rate = sum/this.state.ratings.length
        rate = rate.toFixed(2)
        this.setState({avgRating: rate})
    }


    render(){

        return(
            <div>
                <h1 id="title">{this.state.title}</h1>
                <p>Rating: <span id="rating">{this.state.avgRating} </span></p>
                <select id="user-rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <button onClick={() => this.postARating()}>POST</button>
                <p id="test"></p>
                <p id="desc">{this.state.desc}</p>
                <p></p>

                

                <span>
                <button id="down">-</button>
                </span>
                <span>Servings: <span id="serving-count">1</span></span>
                <span>
                <button id="up">+</button>
                </span>

                <div className="pageimage">
                    <img src={this.state.picPath} alt='text'></img>
                </div>
                
                <div className="ingredients">
                <h3>Ingredients</h3>
                <ul id="ingredientList">
                    {
                        this.state.ingredients && Object.keys(this.state.ingredients).map((curKey) => {
                            return <li><span className="counter">{this.state.ingredients[curKey]}</span> {curKey}</li>;
                        })
                    }
                    
                </ul>

                <div id="before"></div>
                </div>
                <p id="inst"></p>
                

                <h3>Reviews:</h3>
            </div>
        );

    }

    

}

// function Recipe() {
//   return (
//     <div>
      
//       <p>This is the recipe cpmponent</p>
//     </div>
//   );
// }

export default Recipe;