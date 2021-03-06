const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  output: {
    publicPath: '/',
    chunkFilename: '[name].js',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /node_modules/i,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['@babel/preset-env', '@babel/flow'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  },
  mode: 'development', // production
  plugins: [
    new CopyPlugin([
      { from: 'public', to: '.' },
    ]),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      cache: true,
      sourceMap: true,
    })],
  },
  devServer: {
    writeToDisk: true,
    port: 5000,
  },
};
