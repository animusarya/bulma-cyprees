import { createStore } from 'easy-peasy';
import schema from './schema';

const store = createStore(schema, {
  name: 'MyAwesomeStore',
  devTools: true
});

export default store;
