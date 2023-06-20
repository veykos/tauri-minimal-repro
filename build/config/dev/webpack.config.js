import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import path from 'path';
import CONSTANTS from '../../constants.js';

export default {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },
    optimization: {
        minimize: false,
    },
    module: {
    },
    devServer: {
        port: 8000,
        host: 'localhost',
        historyApiFallback: {
            disableDotRule: true,
            index: '/'
        },
        client: {
            overlay: {
                errors: true,
                warnings: false
            }
        }
    },
    output: {
        filename: 'index.js',
        path: path.resolve(CONSTANTS.DIST_DIR, './dist'),
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            templateContent: `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <meta charset="utf-8"/>
                                <meta name="viewport" content="width=device-width, initial-scale=1" />
                                <title>MINIMAL REPRO</title>
                            </head>
                            <body>
                                <div id="root"></div>
                            </body>
                            </html>
                            `
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        })
    ],
}