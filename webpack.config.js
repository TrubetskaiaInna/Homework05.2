var HtmlwebpackPlugin = require('html-webpack-plugin');

let path = require('path')
let conf ={
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Webpack-demos',
      filename: 'index.html'
    })
  ]
}

module.exports = conf
