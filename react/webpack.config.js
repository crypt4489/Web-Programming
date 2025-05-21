const path = require('path');

const react_src = path.resolve(__dirname, 'react_src');
const output_dir = path.resolve(__dirname, 'dist');
const node_modules = path.resolve(__dirname, 'node_modules');
const entry_point = path.join(react_src, '/home.jsx');

console.log(react_src);
console.log(node_modules);

module.exports = {
  // 1
  entry: entry_point,
  // 2
  output: {
    path: output_dir,
    filename: 'bundle.js'
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
  mode: "development"	
};
