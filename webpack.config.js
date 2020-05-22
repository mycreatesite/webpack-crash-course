const path = require('path');

const outputPath = path.resolve(__dirname, 'dist')

module.exports = {
	//バンドルするファイル（エントリーポイント）
	entry: './src/index.js',
	//コンパイル先
	output: {
		filename: 'main.js',
		path: outputPath
	},
	//デフォルトで開く仮想サーバーのディレクトリ
	devServer: {
		contentBase: outputPath
	}
}