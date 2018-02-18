var path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src/withLocalStorage.js'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'withLocalStorage.js',
    library: 'withLocalStorage',
    libraryTarget: 'umd',
  },

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
