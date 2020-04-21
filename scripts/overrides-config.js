/**
 * @module: 定制构建配置
 * @author: Yawei Wang 
 * @date: 2019-05-23 11:00:39 
 */
const path = require("path")
const webpack = require('webpack');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const ManifestPlugin = require('webpack-manifest-plugin');
const postcssSelectorNamespace = require('postcss-selector-namespace')
const { adMicro, adOutput, addBundleAnalyzer, adSplitChunks } = require('./overrides-webpack');
const {
  override,
  overrideDevServer,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addWebpackPlugin,
  adjustWorkbox,
  disableEsLint,
  addDecoratorsLegacy,
  addPostcssPlugins,
  setWebpackTarget,
  addWebpackExternals
} = require("customize-cra");

const resolve = function (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = override(
  // 自定义output配置
  adOutput(),

  // 自定义输出模块规范
  setWebpackTarget('web'),

  // 分析编译后的静态资源
  addBundleAnalyzer(),

  // decorator支持
  addDecoratorsLegacy(),

  // eslint支持
  disableEsLint(),

  // 按需加载，参考【https://github.com/ant-design/babel-plugin-import】
  fixBabelImports("babel-plugin-import", {
    libraryName: "antd",
    libraryDirectory: "es",
    // change importing css to less
    style: true                     
  }),

  // Less支持，参考【http://lesscss.org/usage/#less-options】 
  addLessLoader({
    javascriptEnabled: true,
    // Less Modules 动态命名格式，if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    // 支持参数 [path], [name], [local], and [hash:base64]
    localIdentName: '[name]--[hash:base64:5]',
    // 定制主体 https://ant.design/docs/react/customize-theme-cn
    modifyVars: { 
      "@primary-color": "#FF6710"
    }
  }),

  // Alias支持
  addWebpackAlias({
    '@src': resolve('../src')
  }),

  // Sitemap
  addWebpackPlugin(
    new SitemapPlugin(
      process.env.REACT_APP_ORIGIN,
      require(resolve('../src/sitemap.js')),
      {
        fileName: 'sitemap.xml',
        lastMod: true,
        changeFreq: 'daily',
        priority: '0.4',
        skipGzip: true
      }
    )
  ),

  // manifest
  addWebpackPlugin(
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    })
  ),

  // css namespace
  addPostcssPlugins([
    postcssSelectorNamespace({ namespace: function (csspath) {
      return ''
    }})
  ]),

  // Micro
  adMicro()
);