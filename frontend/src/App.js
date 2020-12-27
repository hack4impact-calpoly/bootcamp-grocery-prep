import Header from "./Header";
import Cart from "./Cart";
import Recipe from "./Recipe"
import About from "./About"
import RecipeOverview from "./RecipeOverview";
import { BrowserRouter, Route, Switch } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <main>
            <RecipeOverview />
            <Cart />
          </main>
        </Route>
        <Route exact path="/recipe">
          <main>
            <Recipe />
            <Cart />
          </main>
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
