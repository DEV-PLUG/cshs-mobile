import { createStore } from 'redux';
import rootReducer from './reduces';

export const store = createStore(rootReducer);