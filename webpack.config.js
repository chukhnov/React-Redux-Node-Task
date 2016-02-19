var path = require('path');
var config = {
    entry: path.resolve(__dirname, 'client/index.js'),
    devtool: 'eval',
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }]
    }
};

module.exports = config;