/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import contextInjector from './middlewares/context-injector';
import StateReader from './state/reader';
import Bukikurabe from './views/Bukikurabe';
import weapons from './_weapons.json';
import { actions } from './actions';

const {
  FINISH_INITIAL_DATA_FETCH
} = actions;

require('./styles/index.scss');
require.context('./images');

const store = createStore(
  reducers,
  applyMiddleware(
    contextInjector(state => ({
      reader: new StateReader(state)
    }))
  )
);

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
