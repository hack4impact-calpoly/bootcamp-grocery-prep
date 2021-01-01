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
        const name = window.location.hash.substr(1)
        console.log(name)
        fetch(`http://localhost:3001/api/recipe/` + name)
            .then(res => res.json())
            .then(data => {
                this.setState({...data})
                
            });
    }

    render(){
        return(
            <div>



            </div>

        )

    }

}

export default RecipeList;