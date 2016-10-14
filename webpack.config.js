const webpack = require('webpack');
const path = require('path');
const pkgJson = require('./package.json');
const hostname = require('os').hostname();

const devServerUrl = `http://${hostname}:3000/`;

const config = {
	entry: [
		'babel-polyfill',
		'./src/index.js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'index.js',
		library: pkgJson.name,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	},
	resolve: {
		alias: {
			lib: path.join(__dirname, 'src', 'lib')
		}
	}
};

if (process.env.NODE_ENV === 'production') {
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
	config.plugins.push(new webpack.optimize.DedupePlugin());
} else {
	config.devtool = '#eval';
	config.entry.unshift(`webpack-hot-middleware/client?path=${devServerUrl}__webpack_hmr`);
	config.entry.unshift('react-hot-loader/patch');
	config.output.publicPath = devServerUrl;
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
	config.plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = config;
