# React18-项目模板

## 依赖
`React18`、`React-Router v6`、`Redux/Toolkit`、`Ant Design v5`、`Axios`
## 能力
1. rem屏幕适配
2. 本地mock调试

## 开发环境
`node18`、`pnpm`
## 开发调试
### 下载依赖
```shell
nvm install 18
nvm use 18
npm i -g pnpm
pnpm i
```
### 项目启动
```shell
# backend环境
pnpm run start
# mock环境
pnpm run start-with-mock
```
### 跨域配置
1. 修改`src/setupProxy.js`中的`target`字段
```js
const Proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    Proxy.createProxyMiddleware('/api',{ 
      target:'http://192.168.1.111:8080', // 跨域改这里
      changeOrigin:true, 
      pathRewrite:{'/api':''} 
    })
  )
}
```
