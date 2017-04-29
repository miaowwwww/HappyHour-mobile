var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var webpackMd5Hash = require('webpack-md5-hash');
var extractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
	// devtool: 'cheap-module-eval-source-map',
	devtool: 'eval',
	entry: {
		app: path.resolve(__dirname, '../src/index.js'),
		vendor: path.resolve(__dirname, '../src/vendor.js')
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist')
		// chunkFilename: 'js/[name]-[chunkhash:8].js'
		// publicPath: ''
	},
	// resolve: {
	// },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
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
				test: /\.(jpe?g|png|woff|svg|eot|ttf)$/,
				use: 'url-loader?limit=4092&name=images/[name].[ext]'
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			}
		]
	},
	resolve: {
		// modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
		extensions: ['.web.js', '.js', '.json'],
	},
	plugins: [
		new htmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.html'),
			filename: 'index.html',
			title: 'HappyHour-m'
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
							browsers: ['ie >= 9', 'ios > 7', 'Android > 4']
							// flexbox: false
						})]
					}
				}
			}
		}),
		new extractTextPlugin({
			filename: 'css/style.css',
			disable: true,
			allChunks: true
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		open: true,
		// host: 'localhost',
		host: '0.0.0.0',
		port: 9999,
		hot: true,
		inline: true,
		historyApiFallback: true,
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: true,
				secure: false
			},
			"/header": {
				target: "http://localhost:3000",
				changeOrigin: true,
				secure: false
			},
			"/poster": {
				target: "http://localhost:3000",
				changeOrigin: true,
				secure: false
			},
			"/video": {
				target: "http://localhost:3000",
				changeOrigin: true,
				secure: false
			},
		}
	}

	
}