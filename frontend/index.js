/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import Bukikurabe from './views/Bukikurabe';
import weapons from './_weapons.json';

require('./styles/index.scss');
require.context('./images');

ReactDOM.render(
  <Bukikurabe weapons={weapons} />,
  document.getElementById('main')
);
