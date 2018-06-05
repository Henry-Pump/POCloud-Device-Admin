const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  watch: false,
  target: 'electron-main',
  entry: ['./app/src/renderer_process.jsx'],
  output: {
    path: `${__dirname}/app/build`,
    publicPath: 'build/',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
      chunkFilename: '[id].css',
    }),
  ],

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },

};
