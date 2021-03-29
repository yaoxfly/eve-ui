  # Request 发起请求
基于 `axios/flyio` 封装的一个请求库,支持 `web`、`app`、小程序(使用 `fiyio` 做请求)等 ; 支持`restFul`接口可发送,`get` 、`post`、`patch`、`put`、`delete` 等请求; 支持 `axios` 和 `fly.js` 库的切换可进行拦截处理,自动弹出 `http` 请求错误、请求异常信息,未登录拦截等功能,具体实现通过配置参数、方法等实现。
 
 
### parameter
参数顺序按以下排列
| 参数   | 说明 | 类型  | 必填 | 可选值 | 默认值 | 方法差异说明 |
| ----| - | ------- | ----- | - | -|-|-|
| url  | url地址 | string | 是 | — |—|—|
| params  | 传到后台的参数 | object | 否 | — | {} | — |
| type  |请求类型 | string | 是 | get、post、put、patch、delete | get | 只在requests方法中使用，其他方法没有这个参数| 
| config  | 配置项，具体参数看下表 | object | 否 | — | — | 当前参数在requests方法中排列在第四位,在其他方法中排列在第三位 |


### config
当前参数没有顺序
| 参数   | 说明 | 类型  | 必填 | 可选值 | 默认值 | 方法差异说明 |
| ----| - | ------- | ----- | - | -|-|-|
| loading  | 是否开启loading,当全局loadding配置为true时才有效 | string | 否 | true | — | — |
| qs  | 是否开启qs 转换 | boolean | 否 | — | true | — |
| headers  |设置请求头--可用来传递参数 |object | 否 | —  | {} | 只在requests方法中使用，其他方法没有这个参数| 
| responseType  | 响应类型 | string | 否 | — | '' | —  |
| paramType  | 参数类型 | string | 否 | params：请求的参数跟在url后面; data：请求的参数在body里 | — | — |