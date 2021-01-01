import './App.css';
import Header from './Header.js';
import View from './View.js'
import Chef from './Chef.js'
import { BrowserRouter, Route , Switch} from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Route path='/Chef'>
              <Chef />
            </Route>
            <Route path='/'>
              <View />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;