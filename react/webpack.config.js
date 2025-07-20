const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const react_src = path.resolve(__dirname, 'react_src');
const output_dir = path.resolve(__dirname, 'dist');
const node_modules = path.resolve(__dirname, 'node_modules');
const entry_point = path.join(react_src, '/home.jsx');

console.log(react_src);
console.log(node_modules);

module.exports = {
  // 1
  entry: {
	  homepage: path.join(react_src, '/home.jsx'),
	  secondpage: path.join(react_src, '/second.jsx'),
	  hostdetails: path.join(react_src, '/hostdetails.jsx')
  },
  // 2
  output: {
    path: output_dir,
    filename: '[name]_bundle.js',
    publicPath: '/react/dist/'
  },
  module: {
    rules: [
	{
	  test: /\.jsx?$/,
	  exclude: node_modules,
	  use: {
	     loader: "babel-loader",
	     options: {
		presets: ["@babel/preset-env", "@babel/preset-react"]
	     }
	  }
	}
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: 'template.html',
		chunks: ['homepage']
	}),
	new HtmlWebpackPlugin({
		filename: 'secondpage.html',
		template: 'template.html',
		chunks: ['secondpage']
	}),
	new HtmlWebpackPlugin({
		filename: 'hostdetails.html',
		template: 'template.html',
		chunks: ['hostdetails']
	})
  ],
  mode: "development"	
};
