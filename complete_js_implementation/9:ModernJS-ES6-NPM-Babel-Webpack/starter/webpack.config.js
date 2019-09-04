const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js'],

    output: {
        
        //Get current absolute path and resolve it to dist/js
        //For output
        //Path should match contentBase for file to be injected
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },

    //development does not minify code (moved to package.json script)
    // mode: 'development'

    devServer: {
        // Folder from which devpack should serve files
        contentBase: './dist'
    },

    plugins: [

        // We can use this plugin to generate HTML code
        // Without using a base html file
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],

    // Loaders enable us to use babel code with webpack
    // Or convert scss to css
    module: {
        rules: [
            {
                //Regex - find all js files (except node_modules)
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}