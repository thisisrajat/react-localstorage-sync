var path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src/withLocalStorage.js'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'withLocalStorage.js',
    library: 'withLocalStorage',
    libraryTarget: 'umd',
  },

  devtool: 'source-map',

  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  }
}
