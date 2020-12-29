import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Recipe from './components/Recipe';
import Cart from './components/Cart';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const [cartItems, setCartItems] = useState([]);

  /* TODO: Render items in cart when cart is changed */
  // below doesnt work
  useEffect(() => {
    setCartItems(cartItems); // force rerender
  }, [cartItems]);
  
  return (
    <div className="App">
      <Navigation />
      <Container fluid>
        <Row>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <main>
              <Recipe setCartItems={setCartItems}/>
            </main>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4}>
            <Cart cartItems={cartItems} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
