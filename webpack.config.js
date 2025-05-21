const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
<<<<<<< HEAD
=======
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: 'asset/resource',
      },
>>>>>>> f098293c3d2b5e2846605695e57df7758addf8c2
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
<<<<<<< HEAD
=======
      favicon: './public/logo.png', // Ajout du favicon
>>>>>>> f098293c3d2b5e2846605695e57df7758addf8c2
    }),
  ],  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    open: true,
    port: 3000,
    proxy: [{
      context: ['/api'],
      target: 'http://localhost:3001'
    }],
    historyApiFallback: true
  },
};