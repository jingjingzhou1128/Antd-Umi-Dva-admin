import routes from './route.config'

// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { 
        webpackChunkName: true,
        loadingComponent: './components/Loader/Loader',
      },
      title: {
        defaultTitle: 'UMI',
        format: '{parent}{separator}{current}',
        separator: '-'
      },
      dll: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
      locale: {
        default: 'en-US', //默认语言 en-US
        // baseNavigator: true, // 为true时，用navigator.language的值作为默认语言
        antd: true // 是否启用antd的<LocaleProvider />
      },
      headScripts: [
        { src: '<%= PUBLIC_PATH %>config.js' }
      ],
    }],
  ],
  routes,
  history: 'browser',
  outputPath: './dist',
  base: '/',
  publicPath: '/',
  targets: {
    ie: 11, // 支持IE11
  },
  treeShaking: true,
  cssLoaderOptions: {
    localIdentName: '[local]'
  },
  alias: {
    '@': require('path').resolve(__dirname, 'src'),
  },
  extraBabelPlugins: [
    [
      'import', 
      { 
        libraryName: 'antd', 
        style: true 
      }
    ]  //按需加载antd样式文件
  ],
  ignoreMomentLocale: true,
  // proxy: {
  //   '/api': {
  //     'target': 'http://127.0.0.1:8000/',
  //     'changeOrigin': true
  //   }
  // }
}
