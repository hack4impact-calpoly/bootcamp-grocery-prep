import './RecipeList.css';
import React from 'react';
import {Link} from 'react-router-dom';

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
                <ul className={"itemList"}>
                    {
                        this.state.allRecipies && this.state.allRecipies.map((curItem) => {
                            return <Link className="itemLink" to={"/recipe/#" + curItem.title}><li className="itemList" key={curItem}>{curItem.title}</li></Link>;
                        })
                    }
                    
                </ul>

            </div>

        )

    }

}

export default RecipeList;