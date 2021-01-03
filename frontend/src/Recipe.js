import styles from './Recipe.styles.css';
import React from 'react';


class Recipe extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            updateCart: props.addToCart,
        };
    }

    componentDidMount(){
        const name = window.location.hash.substr(1)
        //console.log(name)
        fetch(`http://localhost:3001/api/recipe/` + name)
            .then(res => res.json())
            .then(data => {
                this.setState({...data})
                this.setState({servNum: 1})
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

    updateCount(ammount){

        if(this.state.servings + ammount < 1) return;

        const newIngredients = {}
        let curServ = this.state.servings

        this.setState({servings: curServ + ammount})

        for(let i in this.state.ingredients){
            let curAmmount = this.state.ingredients[i]
            newIngredients[i] = (this.state.ingredients[i]/curServ) * ammount + curAmmount
        }

        this.setState({ingredients: newIngredients})
    }

    render(){

        return(
            <div>
                <h1 >{this.state.title}</h1>

                <p>Rating: <span id="rating">{this.state.avgRating} </span></p>

                <button onClick={() => this.postARating()}>POST</button>

                <select id="user-rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                
                
                <p></p>

                <span>
                <button onClick={() => this.updateCount(-1)}>-</button>
                </span>
                <span>Servings: <span id="serving-count">{this.state.servings}</span></span>
                <span>
                <button onClick={() => this.updateCount(1)}>+</button>
                </span>

                

                <div className="pageimage">
                    
                </div>
                
                <div className="ingredients">
                <h3>Ingredients</h3>
                <ul className={styles.ingredients}>
                    {
                        this.state.ingredients && Object.keys(this.state.ingredients).map((curKey) => {
                            return <li key={curKey}><span className="counter">{this.state.ingredients[curKey]}</span> {curKey}</li>;
                        })
                    }
                    
                </ul>

                <button onClick={() => this.state.updateCart(this.state.ingredients)}>ADD TO CART</button>

                <div id="before"></div>
                </div>
                <p id="inst"></p>
                

                <h3>Reviews:</h3>
            </div>
        );

    }

    

}


export default Recipe;