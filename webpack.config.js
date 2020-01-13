const path = require('path');

module.exports = {
	mode: "development", // "production" | "development" | "none"
	entry: {
		app: path.resolve(__dirname, 'src/index.jsx'), // string | object | array
	},
	output: {
		publicPath: '/',
		filename: 'index.js',
		path: path.resolve(__dirname, "dist"), // string
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader'],
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.css']
	},
	devServer: {
		contentBase:  ['./src', './pages'],
		host: 'localhost',
		port: 8080,
		historyApiFallback: true,
	}
};