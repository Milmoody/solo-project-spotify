const path = require('path');

module.exports = (env) => {
    return{
        mode: env.NODE_ENV,
        entry: './client/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname,"build")
        },
        devServer: {
            publicPath: '/build/',
            // hot: true,
            proxy: {
                '/items': 'http://localhost:3000'
            }
        },
        devtool: 'source-map',     
        module: {
            rules: [
                {
                    test: /\.jsx?/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.s?css/,
                    use: ['style-loader', 'css-loader', 'scss-loader']
                }    
            ]
        }
    }
}