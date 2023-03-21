# 安装

### npm 安装
推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```js
npm i @yaoxfly/eve-ui
```

```js
npm i element-ui 
```
>  `@yaoxfly/eve-ui`基于`element-ui`，所以`element-ui`必须下载


### CDN

unpkg

```js
<!-- 引入样式 -->
<link rel="stylesheet" href="//unpkg.com/@yaoxfly/eve-ui/lib/eve-ui.css">

<!-- 引入组件库 -->
<script src="//unpkg.com/@yaoxfly/eve-ui"></script>
```

jsDelivr


```js
<!-- 引入样式 -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/@yaoxfly/eve-ui/lib/eve-ui.css">


<!-- 引入组件库 -->
<script src="//cdn.jsdelivr.net/npm/@yaoxfly/eve-ui"></script>
```


> 我们建议使用 CDN 引入 @yaoxfly/eve-ui 的用户在链接地址上锁定版本，以免将来 @yaoxfly/eve-ui 升级时受到非兼容性更新的影响。锁定版本的方法请查看[unpkg.com](https://unpkg.com/) 。


# 扩展 

由于众所周知的原因，网络可能会受到限制，使用npm镜像可能会导致下载缓慢，或下载不成功,这里推荐下nrm，可以切换其他镜像，比如taobao镜像

> 以下插件包，都基于`node.js`环境，请正确搭建好`node.js`环境，否则安装后可能无法正常使用。如果无法正常使用， 解决方案： [参考链接](https://blog.csdn.net/zixinghuanyue/article/details/100057262)。


###  全局安装 nrm

```js
npm i nrm@1.0.0 -g
```

>使用`nrm`命令失败，可以下载指定的版本，例如1.0.0版本，可根据自己的需求更改。


### 设置镜像地址

>鉴于`nrm`安装受限于`node版本`,计算机权限,等各种各样的问题，导致安装或使用的失败，所以特别的添加其他方式来设置镜像地址，实在无法解决nrm问题时，可尝试其他方式解决


#### nrm方式设置镜像

```js
nrm use taobao
```

> 可以使用`nrm ls`查看可切换的镜像地址 如果遇到使用`nrm ls`或其他`nrm`命令失败，可能原因是你的`node`版本过低或过高，支持不了最新版本的`nrm`,需要对`nrm`降级。

####  npm原生方式设置镜像

在终端中输入如下命令

临时使用
```js
npm --registry [镜像地址] install express
```

永久使用
```js
npm config set registry [镜像地址]
```

查看是否配置成功
```js
npm config get registry 
```
查看npm当前配置

```js
npm config list 
```

如果有其他特殊需求，比如切换到其他镜像，看以下操作

切换到npm原生镜像

```js
npm config set registry https://registry.npmjs.org/
```

切换到淘宝镜像

```js
npm config set registry https://registry.npm.taobao.org/
```

#### .npmrc方式设置镜像
在项目的根目录下(与src文件同级) 创建`.npmrc`写入下面内容

```js
registry= [镜像地址]
// 例如
registry=  https://registry.npm.taobao.org/
```

###  Q问题

1.当前组件库有用到`sass`，如果有报 `node-sass`、`sass-loader` 未安装，则可执行以下命令安装,如果工程中已经安装请跳过当前步骤。
```js
npm i node-sass  sass-loader --save-dev
```

2.插件版本更新后，重新下载插件，`package.json`版本已经更新，但内容未更新,解决方案如下：

```js
在node_modules 里找到 @yaoxfly/eve-ui 删除掉，先关闭编译器再删除，否则有权限问题，删除后再重新 执行 npm i @yaoxfly/eve-ui 
```