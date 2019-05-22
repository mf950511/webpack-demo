const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config.js')
const webpack = require('webpack')
module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [//加载从右往左
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',// 为各大浏览器加前缀
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: loaders => [
                require('autoprefixer')({
                  browsers: [
                    'last 10 Chrome version',
                    'last 5 Firefox version',
                    'Safari >= 6',
                    'ie > 8'
                  ]
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: { // webpack-dev-server配置
    clientLogLevel: 'warning',  // 输出日志级别
    hot: true, // 启动热更新
    contentBase: path.resolve(__dirname, 'dist'), // 静态服务地址
    publicPath: '/', // 浏览器访问路径
    compress: true, // 启用gzip压缩
    disableHostCheck: true,
    port: 9999,
    open: true, // 自动调起浏览器
    overlay: { // 出现错误或警告是否覆盖页面线上错误信息
      warnings: true,
      errors: true
    },
    quiet: true,
    proxy: { // 代理
      '/dev': {
        target: 'http://dev.xxxx.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^dev': '/order/api'
        }
      }
    },
    watchOptions: { // 监控文件相关配置
      poll: true,
      ignored: /node_modules/,
      aggregateTimeout: 300  // 默认值, 当你连续改动时候, webpack可以设置构建延迟时间(防抖)
    }
  },
  devtool: 'inline-source-map' //错误堆栈追踪
})