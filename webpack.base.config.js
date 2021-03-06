const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoader = require('vue-loader/lib/plugin')
module.exports = {
  entry: {
    react: './src/index.jsx',
    vue: './src/main.js'
  },
  module: {
    rules: [
      // vue文件编译
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      // 字体文件处理
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 文件大小小于limit参数，url-loader将会把文件转为DataUR
          limit: 10000,
          name: '[name]-[hash:5].[ext]',
          ourput: 'fonts/'
        }
      },
      // 处理文件
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name]-[hash:5].[ext]',
              outputPath: 'img/' // outputPath所设置的路径，是相对于 webpack 的输出目录。
              // publicPath 选项则被许多webpack的插件用于在生产模式下更新内嵌到css、html文件内的 url , 如CDN地址
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      // babel配置
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.jsx'],
    alias: {
      "@": path.resolve(__dirname, 'src/')
    }
  },
  plugins: [
    // 清除dist文件夹
    new CleanWebpackPlugin(),
    // 打包模板
    new HtmlWebpackPlugin({ // 自动引入文件链接
      inject: true, 
      hash: true, //为静态资源生成hash值
      cache: true,
      chunksSortMode: 'none',
      title: 'webpack4-demo',
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    // vue加载
    new VueLoader()
  ],
  optimization: {
    splitChunks:{ //启动代码分割，有默认配置项
      chunks: 'all'
    }
  },
}