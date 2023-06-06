/* eslint-disable */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	target: 'node',
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'swc-loader',
				exclude: /node_modules/,
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false,
					},
				},
				extractComments: false,
			}),
		],
	},

	externals: {
		bcrypt: 'commonjs bcrypt',
		compression: 'commonjs compression',
		cors: 'commonjs cors',
		dotenv: 'commonjs dotenv',
		express: 'commonjs express',
		googleapis: 'commonjs googleapis',
		redis: 'commonjs redis',
		joi: 'commonjs joi',
		'express-session': 'commonjs express-session',
		passport: 'commonjs passport',
		'http-errors': 'commonjs http-errors',
		jsonwebtoken: 'commonjs jsonwebtoken',
		mongoose: 'commonjs mongoose',
		'mongoose-autopopulate': 'commonjs mongoose-autopopulate',
		'mongoose-delete': 'commonjs mongoose-delete',
		'passport-google-oauth2': 'commonjs passport-google-oauth2',
		'passport-local': 'commonjs passport-local',
		swagger: 'commonjs swagger',
		'swagger-jsdoc': 'commonjs swagger-jsdoc',
		'swagger-ui-express': 'commonjs swagger-ui-express',
		yaml: 'yaml',
		morgan: 'commonjs morgan',
		multer: 'commonjs multer',
		helmet: 'commonjs helmet',
		nock: 'commonjs2 nock',
		'mock-aws-s3': 'commonjs2 mock-aws-s3',
	},
};
