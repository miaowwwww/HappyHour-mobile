var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var webpackMd5Hash = require('webpack-md5-hash');
var extractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: {
		app: './src/index.js',
		vendor: './src/vendor.js'
	},
	output: {
		filename: 'js/[name][hash:8].js',
		path: path.resolve(__dirname, 'dist'),
		chunkFilename: 'js/[name]-[chunkhash:8].js'
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
					// options: {
					// 	presets: ['es2015', 'react', 'stage-0']
					// }
				}
			},
			{
				test: /\.less$/,
				use: extractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'less-loader'],
					publicPath: '../'
				})
			},
			{
				test: /\.(jpe?g|png|woff|svg|eot|ttf)$/,
				use: 'url-loader?limit=4092&name=images/[name][hash:8].[ext]'
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html',
			title: 'HappyHour-m'
		}),
		// new webpackMd5Hash(),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['app', 'vendor']
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: {
					options: {
						plugins: [autoprefixer({
							browsers: ['last 4 versions']
							// flexbox: false
						})]
					}
				}
			}
		}),
		new extractTextPlugin({
			filename: 'css/style[contenthash:6].css',
			disable: true,
			allChunks: true
		}),
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
			}
		}
	}

	
}