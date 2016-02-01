var path = require('path');
var config = {
    entry: path.resolve(__dirname, 'client/app.js'),
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