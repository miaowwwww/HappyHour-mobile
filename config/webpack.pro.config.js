var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var webpackMd5Hash = require('webpack-md5-hash');
var extractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
	// devtool: 'cheap-module-eval-source-map',
	devtool: 'cheap-source-map',
	entry: {
		app: path.resolve(__dirname, '../src/index.js'),
		vendor: path.resolve(__dirname, '../src/vendor.js')
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, '../dist'),
		chunkFilename: 'js/[name].js'
		// publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'		
			},
			{
				test: /\.less$/,
				use: extractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'less-loader'],
					publicPath: '../'
				})
			},
			// {
			// 	test: /\.(jpg|png)$/,
			// 	use: 'url-loader?limit=8192&name=images/[name].[ext]'
			// },
			{
				test: /\.(jpe?g|png|woff|svg|eot|ttf)$/,
				use: 'url-loader?limit=4092&name=images/[name].[ext]'
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.html'),
			filename: 'index.html',
			title: 'HappyHour-m'
		}),
		new webpackMd5Hash(),
		new webpack.optimize.CommonsChunkPlugin({
			// name: 'vendor'
			// filename: 'react-vorder.js'
			names: ['app', 'vendor']
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: {
					options: {
						plugins: [autoprefixer({
							browsers: ['ie >= 9', 'ios > 7', 'Android > 4']
						})]
					}
				}
			}
		}),
		new extractTextPlugin({
			filename: 'css/style.css',
			disable: false,
			allChunks: true
		})
		// new webpack.LoaderOptionsPlugin({
		// 	minimize: true,
		// 	debug: false
		// }),
		// new webpack.optimize.UglifyJsPlugin({
		// 	beautify: false,
		// 	mangle: {
		// 		screw_ie8: true,
		// 		keep_fnames: true
		// 	},
		// 	compress: {
		// 		screw_ie8: true
		// 	},
		// 	comments: false
		// }),
	]
	
}