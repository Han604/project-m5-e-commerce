import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//components
import GlobalStyles from '../components/GlobalStyles/GlobalStyles';
import Header from '../components/Header/header';
import Homepage from '../components/Homepage/Homepage';
import Shop from '../components/Shop/Shop';
import ItemDetails from '../components/ItemDetail/ItemDetail';
import Cart from '../components/Cart';
import Purchased from '../components/Purchased';
import FourOhFour from '../components/FourOhFour/FourOhFour';
import Footer from '../components/Footer/Footer';
import About from '../components/About/About';

// Import actions
import {
  receiveAllProducts,
  requestAllProducts,
  receiveProductsError,
  requestAllCompanies,
  receiveAllCompanies,
  receiveCompaniesError,
} from '../actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetches all the products
    dispatch(requestAllProducts());
    fetch('/products')
      .then((res) => res.json())
      .then((data) => dispatch(receiveAllProducts(data)))
      .catch((err) => dispatch(receiveProductsError()));
  }, []);

  useEffect(()=> {
        // Fetches all the companies
        console.log('ding')
    dispatch(requestAllCompanies());
    fetch('/companies')
      .then((res) => res.json())
      .then((data) => dispatch(receiveAllCompanies(data)))
      .catch((err) => dispatch(receiveCompaniesError()));
  },[])

  return (
    <Router>
      <div style={{ padding: '0 2.5% 0 2.5%', position:'relative'}}>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Homepage />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/shop'>
            <Shop />
          </Route>
          <Route exact path='/shop/:id'>
            Shop with filter
          </Route>
          <Route exact path='/product/:id'>
            <ItemDetails />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route exact path='/purchased'>
            <Purchased />
          </Route>
          <Route exact path='*'>
            <FourOhFour />
          </Route>
        </Switch>
      <Footer />
      </div>
      <GlobalStyles />
    </Router>
  );
}
export default App;
