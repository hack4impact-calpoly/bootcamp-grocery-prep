import './Recipe.css';
import React from 'react';


class Recipe extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        const name = window.location.hash.substr(1)
        console.log(name)
        fetch(`http://localhost:3001/api/recipe/` + name, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => this.setState(...data));
    }

    render(){

        return(
            <div>
                <p>This is the recipe cpmponent: {this.state.title}</p>
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