/* eslint no-param-reassign: 0 */

import { action } from 'easy-peasy';

const schema = {
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
};

export default schema;
