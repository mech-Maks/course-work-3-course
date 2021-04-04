let path = require('path');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'build.js',
        path: path.join(__dirname, 'build')
    },

    devServer: {
        filename: 'build.js',

        contentBase: path.join(__dirname, './'),
        port: 9000
    }
}