import { createStore } from 'redux';

import reducers from './reducers';

const enhancer = __DEV__ ? console.tron.createEnhancer() : null;

const store = createStore(reducers, enhancer);

export default store;
