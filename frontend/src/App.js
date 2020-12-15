import './App.css';

import Header from "./Components/Header.js";
import Recipe from "./Components/Recipe.js";
import Cart from "./Components/Cart.js";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Recipe />
        <Cart />
      </main>
    </div>
  );
}

export default App;
