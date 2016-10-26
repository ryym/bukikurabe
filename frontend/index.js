import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Bukikurabe from './views/Bukikurabe';
import weapons from './_weapons.json';
import { actions } from './actions';

const {
  FINISH_INITIAL_DATA_FETCH
} = actions;

require('./styles/index.scss');
require.context('./images');

// TODO: Fetch data from backend.
setTimeout(() => {
  store.dispatch(FINISH_INITIAL_DATA_FETCH(weapons));
}, 300);

ReactDOM.render(
  <Provider store={store}>
    <Bukikurabe.Container />
  </Provider>,
  document.getElementById('main')
);
