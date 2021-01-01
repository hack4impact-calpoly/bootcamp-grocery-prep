import './RecipeList.css';
import React from 'react';

class RecipeList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            //title: "random"
        };
    }

    componentDidMount(){
        
        fetch(`http://localhost:3001/api/recipe/`)
            .then(res => res.json())
            .then(data => {
                this.setState({allRecipies: data})
                console.log(this.state.allRecipies)
            });
    }

    render(){
        return(
            <div>
                <p>RECIPE LIST COMPONENT</p>
                <p>{this.state.data}</p>
                <ul>
                    {
                        this.state.allRecipies && this.state.allRecipies.map((curItem) => {
                            return <li key={curItem}>{curItem.title}</li>;
                        })
                    }
                    
                </ul>

            </div>

        )

    }

}

export default RecipeList;