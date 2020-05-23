const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  // バンドルするファイル（エントリーポイント）
  entry: './src/index.js',
  // コンパイル先
  output: {
    filename: 'main.js',
    path: outputPath,
  },
  // ローダー登録
  module: {
    rules: [
      {
        enforce: 'pre', // 強制的に処理順を先頭にする（eslint-loader特有の設定）
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sc|c)ss$/,
        use: [// ローダーは逆順に実行される
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'url-loader',
        options: {
          // 500バイトを超えるものはbase64文字列化しない
          limit: 500,
          name: './images/[name].[ext]',
        },
      },
      {
        test: /\.html/,
        loader: 'html-loader',
      },
    ],
  },
  // デフォルトで開く仮想サーバーのディレクトリ
  devServer: {
    contentBase: outputPath,
  },
  // プラグイン設定
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  devtool: 'eval-source-map',
};
