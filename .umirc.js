// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'insurance_education_web',
      dll: false,
      
      routes: {
        // 用于忽略某些路由，比如使用 dva 后，通常需要忽略 models、components、services 等目录
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  history: 'hash',
  targets: {
    ie: 11,
  }
}
