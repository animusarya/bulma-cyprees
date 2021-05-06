/* eslint no-param-reassign: 0 */

import { action } from 'easy-peasy';

const schema = {
  origin: {
    value: 'https://app.website-reviews.online',
    project: {},
    update: action((state, payload) => {
      state.value = payload;
    }),
    updateProject: action((state, payload) => {
      state.project = payload;
    }),
  },
  active: {
    project: null,
    updateProject: action((state, payload) => {
      state.project = payload;
    }),
  },
  isLoggedIn: {
    value: false,
    toggle: action((state, payload) => {
      state.value = payload;
    }),
  },
  user: {
    data: {},
    update: action((state, payload) => {
      state.data = payload;
    }),
  },
};

export default schema;
