import logo from './logo.svg';
import './App.css';
import Header from './Header.js';
import Recipe from './Recipe.js';
import Cart from './Cart.js';


function App() {
  return (
    //<Header />
    <div className = 'App'>
        <body>

        <Header />
    	
        <main>
      	  <Recipe />
      	  <Cart />
    	</main>

        </body>
    </div>

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
