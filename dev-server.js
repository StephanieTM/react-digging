const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const devConfig = require('./webpack.dev');
const didactConfig = require('./webpack.didact');
const env = require('./env');

let config = {};

const [type] = process.argv.slice(2);
switch (type) {
  case 'didact':
    config.webpackConfig = didactConfig;
    config.htmlFilePath = 'views/didact.html';
    config.ouputPath = 'dist_didact';
    break;
  default:
    config.webpackConfig = devConfig;
    config.htmlFilePath = 'views/index.html';
    config.ouputPath = 'dist';
}

const options = {
  contentBase: './dist',
  compress: true,
  hot: true,
  port: env.PORT || 3000,
  host: '0.0.0.0',
  historyApiFallback: {
    index: config.htmlFilePath,
  },
  index: config.htmlFilePath,
  writeToDisk: true,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3002',
      changeOrigin: true,
    },
  },
};

webpackDevServer.addDevServerEntrypoints(config.webpackConfig, options);
const compiler = webpack(config.webpackConfig);
const server = new webpackDevServer(compiler, options);

server.listen(options.port, options.host, () => {
  console.log(`dev server listening on port ${options.port}`);
})
