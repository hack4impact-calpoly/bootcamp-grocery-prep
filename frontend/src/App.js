import './App.css';
import Header from './Header.js';
import Recipe from './Recipe.js';
import Cart from './Cart.js';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Recipe />
        <Cart />
      </main>
      
    </div>
  );
}

export default App;
