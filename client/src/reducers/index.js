import { combineReducers } from 'redux';

import products from './products-reducer';
import companies from './companies-reducer';
import cart from './cart-reducer';

export default combineReducers({ products, companies, cart });
