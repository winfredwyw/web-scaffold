/**
 * @module: 覆盖webpack的配置
 * @author: Teacher Tang
 * @date: 2019-06-10 11:32:49
 */
const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// 微前端配置
const adMicro = () => config => {
  if (process.env.REACT_APP_MICRO === 'true' && process.env.NODE_ENV !== 'development') {
    // 入口
    config.entry = {
      main: path.join(__dirname, '.', '../src/index.micro.js')
    }

    // 输出模块
    config.output = Object.assign(config.output, {
      publicPath: process.env.PUBLIC_URL,
      filename: '[name].[hash:8].js',
      chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
      libraryTarget: 'amd',
      library: 'app_monitor'
    })

    // 抽离公共依赖
    config.externals = {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'axios': 'axios',
      'jquery': 'jQuery',
      'moment': 'moment'
    }

    // 单一出口
    config.optimization = Object.assign(config.optimization, {
      splitChunks: {},
      runtimeChunk: false
    });
  }

  return config
}

/**
 *
 * @param {object} config webpack配置
 */
const adOutput = () => config => {
  // 正式环境添加cdn支持
  if (process.env.REACT_APP_CDN === 'true') {
    config.output.publicPath = process.env.PUBLIC_URL
  }
  config.output.path = resolveApp('build')
  return config;
}

/**
 * 分析部署静态资源
 * @param {object} config webpack配置
 */
const addBundleAnalyzer = () => config => {
  if (process.env.npm_config_report) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    config.plugins.push(new BundleAnalyzerPlugin())
  }
  return config;
}

/**
 * 处理自定义打包优化，有利于静态资源缓存
 * @param {object} config webpack配置
 */
const adSplitChunks = () => config => {
  const splitChunks = {
    chunks: 'all',
    cacheGroups: {
      antd: {
        name: 'chunk-antd', // 单独将 antd 拆包
        chunks: "all",
        priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
        test: /[\\/]node_modules[\\/]antd[\\/]/,
        enforce: true,
        reuseExistingChunk: true
      },
      echarts: {
        name: 'chunk-echarts', // 单独将 echarts 拆包
        chunks: "all",
        priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
        test: /[\\/]node_modules[\\/]echarts[\\/]/,
        enforce: true,
        reuseExistingChunk: true
      },
      // 抽离公共样式
      styles: {
        name: 'styles',
        test: /\.css|.less$/,
        chunks: 'all',
        enforce: true,
        priority: 20,
      },
      libcommon: {
        name: 'chunk-libcommon',
        minSize: 30000, // 大于30K会被抽离到公共模块
        test: /[\\/]node_modules[\\/]/,
        minChunks: 3, // 最小公用次数
        maxAsyncRequests: 5, // 异步模块, 一次最多只能加载5个,
        maxInitialRequests: 3, // 入口模块最多只能加载3个
        priority: 10,
        chunks: 'all',
        reuseExistingChunk: true
      }
    }
  }
  config.optimization = Object.assign(config.optimization, { splitChunks });
  return config;
}

module.exports = {
  adMicro,
  adOutput,
  addBundleAnalyzer,
  adSplitChunks
}
