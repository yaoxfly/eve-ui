# Request 发起请求
基于 `axios/flyio` 封装的一个请求库,支持 `web`、`app`、小程序(使用 `fiyio` 做请求)等 ; 支持`restFul`接口可发送,`get` 、`post`、`patch`、`put`、`delete` 等请求; 支持 `axios` 和 `fly.js` 库的切换可进行拦截处理,自动弹出 `http` 请求错误、请求异常信息,未登录拦截等功能,具体实现通过配置参数、方法等实现。

### API
 requests 方法可传各种类型请求，可添加`headers`参数
```js
  Request.requests(url, param, type, config)
    .then(res=>{
      console.log(res, '请求状态200,即接口请求成功时执行')
    })   
    //可省略
    .catch(error => {
      console.log(error, '请求状态非200,500,401等,即接口请求失败时执行')
    })
     //可省略
    .finally(res => {
      console.log('接口请求无论成功还是失败都会执行')
    })
}
```
执行 get 请求

```js
  Request.get(url, param, config)
    .then(res=>{
      console.log(res)
    })
    //可省略
    .catch(error => {
      console.log(error, '请求返回的状态非200,是500,401等状态的，即接口请求失败时执行')
    })
     //可省略
    .finally(res => {
      console.log('接口请求无论成功还是失败都会执行')
    })
    
```

执行 post 请求

```js
  Request.post(url, param, config)
   .then(res=>{
    console.log(res)
   })
  //可省略
   .catch(error => {
       console.log(error, '请求返回的状态非200,是500,401等状态的，即接口请求失败时执行')
    })
     //可省略
   .finally(res => {
      console.log('接口请求无论成功还是失败都会执行')
    })
```

执行 put 请求

```js
  Request.put(url, param, config)
    .then(res=>{
      console.log(res)
    })
     //可省略
   .catch(error => {
       console.log(error, '请求返回的状态非200,是500,401等状态的，即接口请求失败时执行')
    })
     //可省略
   .finally(res => {
      console.log('接口请求无论成功还是失败都会执行')
    })

```

执行 patch 请求

```js
  Request.patch(url, param, config)
    .then(res=>{
      console.log(res)
    })
      //可省略
   .catch(error => {
       console.log(error, '请求返回的状态非200,是500,401等状态的，即接口请求失败时执行')
    })
     //可省略
   .finally(res => {
      console.log('接口请求无论成功还是失败都会执行')
    })
```

执行 delete 请求

```js
  Request.delete(url, param, config)
    .then(res=>{
      console.log(res)
    })
     //可省略
   .catch(error => {
       console.log(error, '请求返回的状态非200,是500,401等状态的，即接口请求失败时执行')
    })
     //可省略
   .finally(res => {
      console.log('接口请求无论成功还是失败都会执行')
    })
```

### 原生API

请求库内部有暴露`axios/fly`的对象。

请求库暴露出的原生对象，比原来的库，增加了自动弹出 http 请求错误、请求异常信息、未登录拦截、自动全局loading等功能。

如果在`config.js`文件中引入的是`axios`。

`axios`原生对象获取：

```js
import Request from '@/request/config' //根据你创建的名字和放置的位置引入，以下配置说明,有更详细的介绍。
cosnt axios =  Request.request
```

执行 `get` 请求
```js
// 为给定ID的user创建请求
axios.get('/user?ID=12345')
  .then(response=>{
      console.log(response);
    })
  //可省略
   .catch(error => {
      console.log(error, '请求状态非200,500,401等,即接口请求失败时执行')
    })
     //可省略
    .finally(res => {
      console.log('接口请求无论成功还是失败都会执行')
    })

// 上面的请求也可以这样做
 axios.get('/user', {
       params: {
          ID: 12345
        }
      })
  .then(response=> {
        console.log(response);
    })
  .catch(error=> {
        console.log(error);
    })
```

执行 post 请求
```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(response=> {
    console.log(response);
  })
  .catch(error=> {
    console.log(error);
  })
```

也可以通过向 `axios` 传递相关配置来创建请求

`axios(config)`
```js
// 发送 post 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
}).then(response=> {
 console.log(response)
})
```

```js
// 获取远端图片
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
}).then(response => {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});
```

>  以上请求的方法中,都带有`catch`和`finally`方法,更多的内容参考: [axios官网](http://www.axios-js.com/);  如果用的是`flyio`请求,可以参考
 [flyio官网](https://www.npmjs.com/package/flyio)

### 配置说明
在`src`(源代码)文件夹新建`request`文件夹，放入请求库工具类(当前工具类默认已经集成在脚手架工程里，包括`src`文件夹和`index.js`文件)，在`request`文件夹里建立`config.js`文件(与`index.js`文件同级),并在`config.js`中引入请求库,以下是具体的配置。

```js
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import Request from './index' //引入请求库
import { Loading } from 'element-ui'
// import cache from '@/utils/cache.js' //缓存
import router from '@/router/index.js'
const $this = new Vue()
var loading = ''
Vue.use(Request)
export default new Request({
  /* 请求配置 */
  requestConfig: {
    request: axios, // 请求名 fly/axios
    type: 'axios', // 请求类型
    qs: qs,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    timeout: 30000,
    baseURL: process.env.VUE_APP_SERVER, //后台api的域名、ip等
    withCredentials: false,
    // 请求拦截前执行 ,config是axios/fly
    interceptionBefore: config => {
      //添加token
      // const token = cache.getCache('token')
      // if (token) {
      //   config.headers.Authorization = 'bearer' + ' ' + token
      // }
    },
    // 请求拦截后执行,即接口请求结束时执行
    interceptionAfter: response => { },
    // 是否JSONParse返回的数据--部分返回的数据不需要jsonParse
    jsonParse: response => {
      // 可自由添加不需要JSONParse的数据的逻辑方法,true就是需要false就是不需要的
      return true
    }
  },

  /* loading配置 */
  loading: {
    // 以下消息提示要200秒的延时,否则消息框会被提前关闭。
    isLoading: false, // 是否开启全局动画--默认关闭全局动画
    limitTime: 200, // 接口请求在xxxms内完成则不展示loading 0无限制
    // loading显示
    loadingShow: () => {
      setTimeout(() => {
        loading = Loading.service({
          lock: true,
          text: '',
          background: 'rgba(255, 255, 255, 0.3)'
        })
      }, 200)
    },
    // loading隐藏
    loadingHide: () => {
      setTimeout(() => {
        loading && loading.close()
      }, 200)
    }
  },

  /* 请求成功、异常的配置 */
  resError: {
    success: 'success', // 与后台规定的是否成功键值名
    key: 'code', // 与后台规定的状态码的键值名
    msg: 'msg', // 与后台规定的消息键值名 key值必须是msg,右边可改。
    value: -1, // 与后台规定的表示登录失败的code值,值相等时触发下面的notLogin方法
    // 接口异常(接口500,403等报错时执行）
    tipShow: (err, response) => {
      setTimeout(() => {
        $this.$Message({
          message: err,
          type: 'error'
        })
      }, 200)

      //后端使用http状态码返回时401时，登录失败的处理方式
      if (response.status === 401) {
        router.push({
          path: '/login'
        })
      }
    },

    // 登录失败时执行--与后台规定的表示登录失败的code值相等时触发的方法
    notLogin: err => {
      setTimeout(() => {
        $this.$Message({
          message: err,
          type: 'error'
        })
      }, 200)
    },

    // 请求状态码200, 但业务上不成功时执行,即code!==0
    notSuccessful: (code, err) => {
      setTimeout(() => {
        err && $this.$Message({
          message: err,
          type: 'error'
        })
      }, 200)
    }
  }
})
```

### 使用范例
在根目录下的`src`同级目录下创建`api`文件夹，在`api`文件夹里创建各个模块的`api`文件，例如在`api`文件里创建`test`模块的`test.js`文件，在文件中写入以下Api。

```js
import Request from '@/request/config' //根据你创建的名字和放置的位置引入
const test = {
    getTest: param => Request.get('/demo/getTest', param),
    postParamTest: param => Request.post('/demo/postParamTest', param, { paramType: 'params' }),
    postBodyTest: param => Request.post('/demo/postBodyTest', param),
    putTest: param => Request.put('/demo/putTest', param, { paramType: 'params' }),
    putBodyTest: param => Request.put('/demo/putBodyTest', param),
    deleteTest: param => Request.delete('/demo/deleteTest', param),
    deleteBodyTest: param => Request.delete('/demo/deleteBodyTest', param, { paramType: 'data' }),
    getToken: param => Request.requests('/user/login', param, 'delete', { paramType: 'params' })
}
export default test
```
在文件中引用

```js
import test from '@/api/test'
export default {
  name: 'Test',
  mounted () {
    this.getTest()
  },
  methods: {
    getTest () {
      test.getTest({})
        .then(res => {
          console.log(res, '请求状态200,即接口请求成功时执行')
        }).catch(res => {
          console.log(res, '请求状态非200,500,401等,即接口请求失败时执行')
        }).finally(res => {
          console.log('接口请求无论成功还是失败都会执行')
        })
    },
  }
}
```
### parameter
参数顺序按以下排列
| 参数   | 说明 | 类型  | 必填 | 可选值 | 默认值 | 方法差异说明 |
| ----| - | ------- | ----- | - | -|-|-|
| url  | url地址 | string | 是 | — |—|—|
| params  | 传到后台的参数 | object | 否 | — | {} | — |
| type  |请求类型 | string | 是 | get、post、put、patch、delete | get | 只在requests方法中使用，其他方法没有这个参数| 
| config  | 配置项，具体参数看下表 | object | 否 | — | {} | 当前参数在requests方法中排列在第四位,在其他方法中排列在第三位 |


### config
当前配置是个object，内置参数没有顺序。
| 参数   | 说明 | 类型  | 必填 | 可选值 | 默认值 | 方法差异说明 |
| ----| - | ------- | ----- | - | -|-|-|
| loading  | 是否开启loading,当全局loadding配置为true时才有效 | string | 否 | true | — | — |
| qs  | 是否开启qs 转换 | boolean | 否 | — | true | — |
| headers  |设置请求头--可用来传递参数 |object | 否 | —  | {} | 只在requests方法中使用，其他方法没有这个参数| 
| responseType  | 响应类型 | string | 否 | — | '' | —  |
| paramType  | 参数类型,详细说明见下表 | string | 否 | params：请求的参数跟在url后面; data：请求的参数在body里 | — | — |

### paramType
当前参数在不同的请求方法中默认值是不同的
|请求方法 |默认值 | 说明|
|--|--|--|
| requests | 根据`type`来决定,例如`type`是`get`那么当前请求方法的`paramType`默认值就是`params`，依次类推 | — |
| get   | params  | 请求的参数跟在url后面 |
| post  | data   | 请求的参数在body里|
| put   | data   | 请求的参数在body里|
| patch | data  |  请求的参数在body里|
| delete| params |  请求的参数跟在url后面|

