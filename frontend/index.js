import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Bukikurabe from './views/Bukikurabe';
import { actions } from './actions';

const {
  REQUEST_INITIAL_DATA,
} = actions;

require('./styles/index.scss');
require.context('./images');

store.dispatch(REQUEST_INITIAL_DATA());

ReactDOM.render(
  <Provider store={store}>
    <Bukikurabe.Container />
  </Provider>,
  document.getElementById('main')
);
