const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    
   entry: './src/app.js',
   output: {
       path: path.resolve(__dirname, './dist'),
       filename: 'js/bundle.js'
   },
   
   devtool: 'source-map',
   devServer: {
       port: 4000,
       open: true
   },
   module: {
       rules: [
           {
               test: /\.handlebars$/,
               loader: 'handlebars-loader'
           },
           {
               test: /\.(sa|sc|c)ss$/,
               use: [
                   MiniCssExtractPlugin.loader,
                   'css-loader',
                   {
                       loader: 'postcss-loader',
                       options: {
                           autoprefixer: {
                               browser: ['last 2 versions']
                           },
                           plugins: () => [
                               autoprefixer                               
                           ]
                       }
                   },
                   'sass-loader',
               ],
           },
           {
               test: /\.(jpg|png|gif)$/,
               use: [
                   {
                       loader: 'file-loader',
                       options: {
                           name: '[name].[ext]',
                           outputPath: 'static/',
                           useRelativePath: true
                       }
                   },
                   {
                       loader: 'image-webpack-loader',
                       options: {
                           mozjpeg: {
                               progressive: true,
                               quality: 65
                           },
                           // optipng.enabled: false will disable optipng
                           optipng: {
                               enabled: false,
                           },
                           pngquant: {
                               quality: '65-90',
                               speed: 4
                           },
                           gifsicle: {
                               interlaced: false,
                           },
                           // the webp option will enable WEBP
                           webp: {
                               quality: 75
                           }
                       }
                   }
               ]
           }
       ]
   },
   plugins: [
       new HtmlWebpackPlugin({
           title: 'Titulo HTML',
           template: './src/index.handlebars',
           minify: {
               html5: true,
               collapseWhitespace: true,
               caseSensitive: true,
               removeComments: true,
               removeEmptyElements: true
           }
       }),
       new MiniCssExtractPlugin({
           filename: "css/[name]-styles.css",
           chunkFilename: "[id].css"
       }),
   
       new CopyWebpackPlugin([{
       from:'src/assets/images/img',to:'assets/images/img'
       }])  

   ]
}