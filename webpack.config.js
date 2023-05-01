const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './public/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      }
    ],
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    open: true,
  },
};
