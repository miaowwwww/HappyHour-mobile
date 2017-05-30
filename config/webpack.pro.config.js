var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var webpackMd5Hash = require('webpack-md5-hash');
var extractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');
var cleanWebpackPlugin = require('clean-webpack-plugin');

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
				test: /\.(less|css)$/,
				use: extractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'less-loader'],
					publicPath: '../'
				})
			},
			{
				test: /\.(jpe?g|png|gif|woff|svg|eot|ttf)$/,
				use: 'url-loader?limit=4092&name=images/[name].[ext]'
			},
		]
	},
	resolve: {
		extensions: ['.web.js', '.js', '.json', '.less'],
	},
	plugins: [
		new htmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.html'),
			filename: 'index.html',
			title: 'HappyHour-m-pro',
			favicon: path.resolve(__dirname, '../src/favicon.ico'),
		}),
		new webpackMd5Hash(),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['app', 'vendor']
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: {
					options: {
						plugins: [autoprefixer({
							browsers: ['ie >= 9', 'ios > 7', 'Android > 4'],
							// flexbox: false
						})]
					}
				}
			}
		}),
		
		new extractTextPlugin({
			filename: 'css/style.css',
			disable: false,
			allChunks: true
		}),

		new cleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../'),
			verbose: true,
			dry: false,
			exclude: [],
		}),

		// new webpack.optimize.UglifyJsPlugin({
		// 	beautify: false,
		// 	mangle: {
		// 		screw_ie8: true,
		// 		keep_fnames: true
		// 	},
		// 	compress: {
		// 		screw_ie8: false
		// 	},
		// 	comments: false
		// }),
	]
	
}