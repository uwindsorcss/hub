process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const miniCssPlugin = new MiniCssExtractPlugin({
  filename: "css/[name].css",
  chunkFilename: "css/[id].css",
});
environment.plugins.append("MiniCssExtract", miniCssPlugin);

module.exports = environment.toWebpackConfig()
