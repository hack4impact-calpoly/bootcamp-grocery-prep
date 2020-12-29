import logo from './logo.svg';
import './App.css';
import Home from './AdditionalLinks/Home/Home.js';
import Header from './AdditionalLinks/Header/Header.js';
import AboutMe from './AdditionalLinks/AboutMe/AboutMe.js';
import RandomRecipe from './AdditionalLinks/RandomRecipe/RandomRecipe.js';
import Recipe from './AdditionalLinks/Recipe/Recipe.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
       <div className='App'>    
       	  <Header /> 
          
	  <Switch>
	  <Route exact path='/'>
	     <Home />
	  </Route>

	  <Route exact path='/about-me'>
	     <AboutMe />
	  </Route>

	  <Route exact path='/random-recipe'>
	     <RandomRecipe />
	  </Route>

	  <Route path='/recipe'>
	     <Recipe />
	  </Route>

          </Switch>

       </div>
    </BrowserRouter>

    //TUTORIAL BELOW
    //<div className="App">
    //  <header className="App-header">
    //    <img src={logo} className="App-logo" alt="logo" />
    //    <p>
    //      Edit <code>src/App.js</code> and save to reload.
    //    </p>
    //    <a
    //      className="App-link"
    //      href="https://reactjs.org"
    //      target="_blank"
    //      rel="noopener noreferrer"
    //    >
    //      Learn React
    //    </a>
    //  </header>
    //</div>
  );
}

export default App;
