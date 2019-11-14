/* eslint no-param-reassign: 0 */

import { action, selector } from 'easy-peasy';

const schema = {
  origin: {
    value: 'https://app.intellishare.online',
    project: {},
    update: action((state, payload) => {
      state.value = payload;
    }),
    updateProject: action((state, payload) => {
      state.project = payload;
    }),
  },
  isLoggedIn: {
    value: false,
    togggle: action((state, payload) => {
      state.value = payload;
    }),
  },
  user: {
    data: {},
    update: action((state, payload) => {
      state.data = payload;
    }),
  },
  active: {
    project: null,
    updateProject: action((state, payload) => {
      state.project = payload;
    }),
  },
  todos: {
    items: [{ id: 1, name: 'milk' }, { id: 2, name: 'bread' }],
    addTodo: action((state, payload) => {
      state.items.push(payload);
    }),
    getById: selector([state => state.items], (stateResolvers, runtimeArgs) => {
      const [items] = stateResolvers;
      const [id] = runtimeArgs;
      return items.find(todo => todo.id === id);
    }),
  },
};

export default schema;
