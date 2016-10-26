import '../config/env';

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';

const PORT = 8080;
const app = express();
const webpackCompiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(webpackCompiler, {
    publicPath: '/',
  })
);

/* eslint-disable no-console */
app.listen(PORT, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.info(`Open http://localhost:${PORT}`);
});

