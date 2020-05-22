const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
	//バンドルするファイル（エントリーポイント）
	entry: './src/index.js',
	//コンパイル先
	output: {
		filename: 'main.js',
		path: outputPath
	},
	//ローダー登録
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [//ローダーは逆順に実行される
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				loader: 'url-loader',
				options: {
					//500バイトを超えるものはbase64文字列化しない
					limit: 500,
					name: './images/[name].[ext]'
				}
			}
		]
	},
	//デフォルトで開く仮想サーバーのディレクトリ
	devServer: {
		contentBase: outputPath
	}
}