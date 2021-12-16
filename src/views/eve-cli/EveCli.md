# eve-cli
`Eve CLi` 是一个基于 `Vue.js` 进行快速开发的完整系统，提供： 通过 `@eve/cli` 实现干净极简，不掺杂任务业务的项目脚手架，开箱即用。 内置了简单的模板，可自定义添加和删除模板。 默认模板里集成了： 
```js
. eve-ui 组件 
. 基于axios/flyio封装的的request请求类库 
. 顶部导航，左边菜单，中间布局，面包屑，页签等基础布局，做好了基础建设，无需再搭建框架，可直接快速开发业务。
. 分模块路由
. 动态路由和动态面包屑
. keepAlive
. 多环境配置
. gzip 压缩
. 正式环境打包清除console.log
. store结构分离，模块化。
. mock
. 公共config,包含多环境
. 兼容ie11
. 404错误界面
```
`Eve CLi` 致力于将 `Vue` 生态中的工具基础标准化。它帮你搭建好了基础框架，提供些公用类库，这样你可以专注在撰写应用上，而不必花好几天再去写基础布局，搭建基础框架，纠结配置等问题。
# 安装

```js
npm i @eve/cli -g
```
> 下载的镜像地址和eve-ui的地址一样，可参考eve-ui的安装步骤，[参考链接](http://192.168.208.9:9080/eve-ui/#/install)。

# 使用

#### 创建工程
由于当前脚手架包含私域的包`eve-ui`,外部的镜像如`npm`、`taobao`、`cnpm`等镜像下载不了，所以当前所有步骤最好在`enpm`的镜像下，`enpm`可以下载私域域的包，同时也可以下载外域的包，特别是下载完脚手架后使用`npm i`来初始化脚手架，这个步骤要在`enpm`的镜像下执行，否则`eve-ui`会初始化失败，如果在`enpm`镜像下执行初始化操作，还是发生了错误，可把脚手架项目中的`package.json`文件中把`eve-ui`删除或者注释掉，切换到`npm`、`taobao`等其他镜像先下载外域的包，再切换到私域的镜像下载`eve-ui`。

``` js
eve create [自定义的工程名]  //如果创建失败，出现chalk、ora 、Es Module 错误等页面拉到最后《Q问题》有解决方案
# or
eve create [模板名]  
//示例
eve create yaoxfly-admin //自定义工程名，使用内置模板
# or
eve create eve-admin  //指定模板，可使用自定义模板
```
>  脚手架内置了模板 `eve-admin`，也支持添加自定义的模板，创建工程时输入自定义的工程名(类似vue-cli)就默认拉取内置模板的工程, 也可指定模板，如 `eve create eve-admin` , 模板名不可随意填写，只能填写自己添加的或者内置的模板名，工程名可自定义。

#### 添加模板

``` js
eve add
```

##### 添加的模板地址的格式

###### 自定义的类型(支持私域的GitLab)

```js
// [类型]-[ip/域名]-[端口]:用户名/工程名
gitlab-192.168.204.241-9080:Frye/eve-simple-pc-frame //范例
```

###### GitHub 
```js
github:owner/name 或者 owner/name
```

###### GitLab 

```js
gitlab:owner/name
```


###### Bitbuckets 
```
bitbucket:owner/name
```

> 默认是 master 分支, 但你可以指定分支，使用的是# ，如 gitlab-192.168.204.241-9080:Frye/eve-simple-pc-frame#xzsp. 
#### 删除模板

``` js
eve delete
```

#### 查看模板列表

``` js
eve list
```


#### 查看版本

```js
eve -V
```
> 可以用这条命令来测试是否已经安装成功。


#### 查看帮助

```js
eve -help
```

# Q 问题

 `node`版本和第三方包版本升级都可能影响到当前工具的使用，在使用过程中如果出现`chalk`、`ora` 、`Es Module` 等错误，可以在安装`node`的目录中（一般是这个目录）找到`node_modules`，在`node_modules`中找到`@eve`目录 接着点击进去 找到`cli`目录  进入`cli`目录下的`node_modules`， 哪个依赖包出现问题 就在这个目录下重新下那个依赖包 比如`chalk`出问题 就  `npm i chalk`,直至问题解决。