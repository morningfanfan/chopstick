var webpack = require("webpack");
var path = require('path');

module.exports = {
    entry: {
        entry1: path.join(__dirname, 'src').replace(/^([A-Z]:)/, v => v.toLowerCase()) + "/ui/index.jsx"
    },
    output: {
        filename: "./dist/[name].bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }, {
                test: /\.jsx?$/,
                loader: "babel-loader?presets[]=es2015&presets[]=react"
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        //"lodash": "_"
    }
};