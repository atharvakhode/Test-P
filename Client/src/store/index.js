import { combineReducers, createStore } from 'redux';
import cartitemsreducer from './cartitemsreducer';
import reducer from './reducer';

// Initialize the cart in localStorage if it doesn't exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Load cart items from localStorage
const savedCart = JSON.parse(localStorage.getItem('cart'));

// Define the initializeCart action
const initializeCart = (cartItems) => ({
    type: 'InitializeCart',
    payload: cartItems,
});

// Combine reducers
const combreducer = combineReducers({
    loggedin: reducer,
    cart: cartitemsreducer,
});

// Create the store
const store = createStore(combreducer);

// Dispatch the initializeCart action with the saved cart items
store.dispatch(initializeCart(savedCart));

export default store;
