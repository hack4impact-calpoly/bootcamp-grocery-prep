import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Recipe.module.css'

export default function Recipe(props) {
    let { name } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/api/recipe/${name}`)
        .then(response => response.json())
        .then(data => {setRecipe(data[0]);
            updateRating(calcAverage(data[0].ratings))
        })
    }, [])

    // console.log(recipe);

    // To update servings
    const [num, updateNum] = useState(1);

    function updateCount(dir) {
            if (num + dir <= 0) return;

            const currentServings = num;
            const ingredientPortions = document.getElementsByClassName('ingredientPortions')
            for (let portion = 0; portion < ingredientPortions.length; portion++) {
                const currentCount = +(ingredientPortions[portion].innerText);
                ingredientPortions[portion].innerText = Number(((currentCount / currentServings) * (currentServings + dir)).toFixed(2)).toString();
            }

            updateNum(num + dir);
    }

    // Code to post rating
    const [avgRat, updateRating] = useState(0)
    function postTheRating() {
        const ratingSelect = document.getElementById('rating_options')
        const ratingWanted = +(ratingSelect.options[ratingSelect.selectedIndex].value)
      
        const packetData = {
          title: recipe.title,
          rating: ratingWanted
        }
      
        console.log(packetData)
        fetch('http://localhost:3001/api/rating', {
            method: 'POST',
            body: JSON.stringify(packetData),
            headers: {     'Content-Type': 'application/json',   }
        })
        .then(() => {
            recipe.ratings.push(ratingWanted)
            updateRating(calcAverage(recipe.ratings))
        })
            .catch((err) => {
            console.error(err)
        })
    }

    function addToCart() {
        // console.log(recipe.ingredients)
        props.addItems(recipe.ingredients)
    }

    if (!recipe) 
        return <h2>Loading {name}...</h2>
    return(
        <div className={styles.recipeFormat}>
            <div className={styles.ratingContainer}>
                <h2>{recipe.title}</h2>
                <span>{avgRat} ☆</span>
            </div> 
            <p className={styles.desc}>{recipe.desc}</p>

            <div className={styles.showcase}>
                <div className={styles.portion_rate}>
                    <div>
                        <h3>Servings</h3>
                        <div>
                            <button onClick={() => updateCount(-1)} className={styles.plusAndMinusButton}>-</button>
                            <span className={styles.count}>{num}</span>
                            <button onClick={() => updateCount(1)} className={styles.plusAndMinusButton}>+</button>
                        </div>
                    </div>

                    <div>
                        <h3>Rate me!</h3>
                        <select name="Select Rating" id="rating_options">
                            <option value='none' selected hidden disabled>Select Rating</option>
                            <option value='1'>1 ☆</option>
                            <option value='2'>2 ☆</option>
                            <option value='3'>3 ☆</option>
                            <option value='4'>4 ☆</option>
                            <option value='5'>5 ☆</option>
                        </select>
                        <button onClick={() => postTheRating()} className={styles.post}>Post Rating</button>
                    </div> 

                    <button onClick={() => addToCart()} className={styles.addButton}>Add to Cart</button>

                </div>  

                <img className={styles.image} src={process.env.PUBLIC_URL + recipe.picture} alt={'Pictures/' + recipe.title}></img>

            </div>

            <div>
                <h3 className={styles.titles}>Ingredients</h3>
                <ul>
                    {recipe.ingredients && Object.keys(recipe.ingredients).map(ingred => 
                    <li key={ingred} className = 'ingredientsForCart'>
                        <span className = 'ingredientPortions'>{recipe.ingredients[ingred]}</span> {ingred}
                    </li>)}
                </ul>
            </div>

            <div>
                <h3 className={styles.titles}>Instructions</h3>
                <ol>
                    {recipe.instructions && Object.keys(recipe.instructions).map(instruct => 
                    <li key={recipe.instructions[instruct]}>
                        {recipe.instructions[instruct]}
                    </li>)}
                </ol>
            </div>

        </div>
    )
}

// To calculate the average
function calcAverage(list) {
    let sum = 0
    for (let x = 0; x < list.length; x++) {
        sum += list[x]
    }
    let avg = sum/list.length
    avg = avg.toFixed(1)
    return avg
}