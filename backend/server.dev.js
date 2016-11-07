import '../config/env';

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';
import api from './api';

const PORT = 8080;
const app = express();
const webpackCompiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(webpackCompiler, {
    publicPath: '/',
  })
);

app.use('/api', api);

/* eslint-disable no-console */
app.listen(PORT, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.info(`Open http://localhost:${PORT}`);
});

