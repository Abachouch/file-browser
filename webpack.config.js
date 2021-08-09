const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = env => {
  return [
    {
      name: 'Main App',
      entry: './src/index.js',
      target: 'electron13.0-renderer',
      output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: './'
      },
      mode: env.MODE,
      devtool: env.MODE == 'development' ? 'eval' : 'source-map',
      watch: env.MODE == 'development',
      plugins: [
        new htmlWebpackPlugin({
          template: './src/index.html'
        })
      ],
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.s[ac]ss$/i,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
          {
            test: /\.(png|jp(e*)g|svg|gif)$/,
            // type : 'asset/resource',
            use: {
              loader: 'file-loader',
              options: {
                limit: 8000,
                name: 'icons/[hash]-[name].[ext]'
              }
            }
          }
        ]
      }
    },
    {
      name: 'Preview Window',
      entry: './src/app/preview/preview.js',
      target: 'electron13.0-renderer',
      output: {
        filename: 'preview.js',
        path: path.resolve(__dirname, 'build/preview'),
        publicPath: './'
      },
      mode: env.MODE,
      devtool: 'source-map',
      watch: env.MODE == 'development',
      plugins: [
        new htmlWebpackPlugin({
          template: './src/app/preview/preview.html',
          filename: 'preview.html',
          publicPath: './'
        })
      ],
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.s[ac]ss$/i,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
          {
            test: /\.(png|jp(e*)g|svg|gif)$/,
            use: {
              loader: 'file-loader',
              options: {
                limit: 8000,
                name: 'icons/[hash]-[name].[ext]'
              }
            }
          }
        ]
      }
    }
  ]
}
