这个项目是基于 [Create React App](https://github.com/facebook/create-react-app).

## 可用的脚本

在项目目录中，您可以运行:

### `npm start`

在开发模式下运行应用程序.<br>
在浏览器打开 [http://localhost:3000](http://localhost:3000) 

如果您进行编辑，页面将重新加载.<br>
您还将在控制台中看到任何lint错误.

### `npm test`

以交互式监视模式启动测试运行器.<br>
更多信息 [测试](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

构建用于生产的应用程序到 `build` 文件夹.<br>
它正确地将React捆绑在生产模式中并优化构建以获得最佳性能。

构建被缩小，文件名包含哈希。<br>
您的应用已准备好部署!

更多信息 [发布](https://facebook.github.io/create-react-app/docs/deployment) .


## 参考

[customize-cra](https://github.com/arackaf/customize-cra)

[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

[React documentation](https://reactjs.org/).

## 目录结构

> 业务开发只需关注 src 目录

```
|--build                    // 打包代码
|--scripts                  // 编译/打包 配置
|--src                      // 开发源码
|--.env                     // 全局变量
|--.gitignore               // git 忽略配置文件
|--package-lock.json        // npm 依赖锁文件
|--package.json             // npm 项目配置文件
|--README.md                // 项目文档
|--tsconfig.json            // tslint 配置文件
```

## 开发指南

### 业务开发约定

- 业务开发禁止私自引用第三方包
- 业务开发只关注 src 目录下代码，提交时注意不要有 src 无关代码的修改

### 环境变量.env

- 除了一些内置变量（NODE_ENV和PUBLIC_URL）之外，变量名必须从REACT_APP_工作开始。
- 环境变量在构建时注入。如果需要在运行时注入它们，请[改为使用此方法](https://facebook.github.io/create-react-app/docs/title-and-meta-tags#generating-dynamic-meta-tags-on-the-server)。
