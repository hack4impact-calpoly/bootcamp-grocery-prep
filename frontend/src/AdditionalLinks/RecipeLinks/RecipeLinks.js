import React from 'react';


class Recipe extends React.Components {
  constructor(props){
	super(props);
	this.state = {};
  }

  componentDidMount() {
  fetch('http://localhost:3001/api/recipe')
    .then(res => res.json())
    .then(data => this.setState({ ...data }));
}

}
