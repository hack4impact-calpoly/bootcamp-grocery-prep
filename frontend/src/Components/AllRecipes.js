import React from "react";
import Styles from "./AllRecipes.module.css";

// import egg from "imgs/egg.jpeg"
// import milk from "imgs/golden_milk.jpeg"

class AllRecipes extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            list : []
        }
    }

    async componentDidMount(){
        const URL = "http://localhost:3001/api/recipe";

        fetch(URL)
        .then(res => {
            if (res.ok){
                return res
            }
            else{
                let error = new Error("ERROR AND I DON'T KNOW WHY!!!")
                throw(error)
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({list : data})
        })
        .catch(err => console.log(err))
     }

    render(){
        return(
            <main>
                <h1>
                These is all the Recipes on my site!
                </h1>
                <div className={Styles.pics}>
                    <img src={process.env.PUBLIC_URL+"/imgs/egg.jpeg"} height="200" width="225" alt="egg"></img>
                    <img src={process.env.PUBLIC_URL+"/imgs/golden_milk.jpeg"} height="200" width="150" alt="golden milk"></img>
                </div>
                <p className={Styles.intro}>Check out the links below:</p>
                <div className={Styles.links}>
                    {this.state.list.map(item => {
                        // const id = item._id;
                        const name = item.foodTitle;
                        return <a href={'/recipe/'+name} key={name}>{name}</a>;
                    })}
                </div>
            </main>
        );
}}

export default AllRecipes;