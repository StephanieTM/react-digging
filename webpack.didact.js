const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: ['./lib/didact/tutorial/Step1-TheCreateElementFunction.js'],
  },
  output: {
    filename: 'assets/scripts/[name].bundle.js',
    chunkFilename: 'assets/scripts/[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#763857',
                  'secondary-color': '#eeccdd',
                  'border-radius-base': '5px',
                  'padding-md': '12px',
                  'btn-default-color': 'rgba(0, 0, 0, 0.6)'
                },
                javascriptEnabled: true,
              }
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin(),
    ],
  },
  plugins: [
    // clean dir before build
    new CleanWebpackPlugin(),
    // generate didact.html file
    new HtmlWebpackPlugin({
      filename: 'views/didact.html',
      hash: true,
      inject: false,
      template: './app/views/didact.ejs',
    }),
    new webpack.ProgressPlugin({ profile: false }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: './tsconfig.json',
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
      eslint: {
        enabled: true,
        files: [
          './app/**/*.{ts,tsx}',
          './src/**/*.{ts,tsx}',
        ],
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].css',
      chunkFilename: 'assets/styles/[id].css',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist_didact'),
    publicPath: '/',
    hotUpdateChunkFilename: 'hot/[id].[fullhash].hot-update.js',
    hotUpdateMainFilename: 'hot/[runtime].[fullhash].hot-update.json',
  },
  optimization: {
    // moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 10,
      maxInitialRequests: 10,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },
};
