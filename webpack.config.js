var path = require('path');
var webpack = require('webpack');
// var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var Dashboard = require('webpack-dashboard');
// var dashboard = new Dashboard();

module.exports = {
    devtool: 'eval',
    entry: './src/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            // {
            //     test: /\.css$/,
            //     loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            //     exclude: /node_modules/
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new DashboardPlugin(dashboard.setData)
    ],
    stats: {
        colors: true
    },
    devServer: {
        hot: true,
        quiet: true,
        inline: true,
        stats: false,
        watchOptions: { poll: 1000, ignored: /node_modules/ }
    }
};
