# utils工具类
utils工具类主要作用于规范表单的正则验证，开发人员针对不同项目中遇到一些常用的表单验证，可以直接使用相应的正则验证方法即可，要是没有找到相应的正则表达式，可自行在项目中自行添加验证，或通知管理员统一收集，在新版本集成。

# 引用方式-全局
在`main.js`文件中引入
```js
import utils from '@yaoxfly/eve-ui/tools/eve-utils.umd.min.js'
Vue.prototype.$utils = utils 
```
接着在页面中使用,比如电话号码验证

```js
{ validator: this.$utils.checkMobilePhone, trigger: 'blur' }
```

# 演示代码

```html
<el-form ref="form" :model="formValidate" :rules="formValidateRules" label-width="160px">
	<el-form-item class="eve-common-fixed-error" label="手机" prop="mobilePhone">
         <el-input
            class="eve-common-input"
            :size="size"
            v-model="formValidate.mobilePhone"
            placeholder="请输入"
            />
        <!-- 自定义表单错误提示 -->
        <template slot="error" slot-scope="scope">
            <el-tooltip class="eve-common-form-error-tip" :content="scope.error">
                <i class="el-icon-warning-outline"></i>
            </el-tooltip>
        </template>
	</el-form-item>
</el-form>
```

```js
export default {
  data () {
    return {
      formValidate: {
          mobilePhone: '', // 移动电话
        }
      formValidateRules: {
        mobilePhone: [
            { required: true, message: '必填项', trigger: 'blur' },//必填项校验
            { validator: this.$utils.checkMobilePhone, trigger: 'blur' }//手机号输入正则校验
        ],
       }
    }
  }
}
```

# 引用方式-按需
在页面中引入，电话号码验证
```js
import { checkMobilePhone } from '@yaoxfly/eve-ui/tools/eve-utils.umd.min.js' 
```
在页面中使用
```js
{ validator: checkMobilePhone, trigger: 'blur' }
```

# 演示代码

```html
<el-form ref="form" :model="formValidate" :rules="formValidateRules" label-width="160px">
	<el-form-item class="eve-common-fixed-error" label="手机" prop="mobilePhone">
         <el-input
            class="eve-common-input"
            :size="size"
            v-model="formValidate.mobilePhone"
            placeholder="请输入"
            />
        <!-- 自定义表单错误提示 -->
        <template slot="error" slot-scope="scope">
            <el-tooltip class="eve-common-form-error-tip" :content="scope.error">
                <i class="el-icon-warning-outline"></i>
            </el-tooltip>
        </template>
	</el-form-item>
</el-form>
```

```js
import { checkMobilePhone } from '@yaoxfly/eve-ui/tools/eve-utils.umd.min.js' 
export default {
  data () {
    return {
      formValidate: {
          mobilePhone: '', // 移动电话
        }
      formValidateRules: {
        mobilePhone: [
            { required: true, message: '必填项', trigger: 'blur' },//必填项校验
            { validator: checkMobilePhone, trigger: 'blur' }//手机号输入正则校验
        ],
       }
    }
  }
}
```


# Function

| 方法名      |说明           | 备注|
| ------------ | ------- | ----------------- |
|checkMobilePhone| 手机号 | 1、11位数字组成<br/>2、数字1开头<br/>3、第二位 最新的手机号现在是 3,4,5,6,7,8,9 几个数字 |
|checkFixedPhone | 固定电话 | 区号：0开头的3或4位的数字<br/>号码：7或8位的数字<br/>分机号：1-6位的数字<br/>连接符：- |
|checkFax | 传真 |  区号（3到4位数字）+电话号码（7到8位数字）+分机号（1到6位数字）<br/>例如：010-26737123-888|
|checkEmail | 电子邮箱  |     邮箱基本格式是 *****@**.**<br/>@以前是一个 大小写的字母或者数字开头，紧跟0到多个大小写字母或者数字或 . _ - 的字符串<br/>@之后到.之前是 1到多个大小写字母或者数字的字符串<br/>.之后是 1到多个 大小写字母或者数字或者.的字符串<br/>  /^[a-zA-Z0-9][a-zA-Z0-9._-]*\@[a-zA-Z0-9]{1,10}\.[a-zA-Z0-9\.]{1,20}$/A<br/>  这里限制了@之后 和 .之后的字符串位数，如果不够可以自行修改。                   |  
|checkPostalCode | 邮政编码 | 中国邮政编码为不以0开头的6位纯数字 |
|checkIdCheck | 身份证格式校验 |—|
|checkSocialCreditCode | 统一社会信用代码 |—|
|checkAllDigital | 纯数字 | — |
|checkAllChinese | 纯中文 | — |
|checkAllLetters | 纯字母 | — |    
|checkNumberAndLetter | 数字+字母  | — |  
|checkCarNumber | 车牌号（含新能源）  | — |  
|checkIsIp | IP地址  | ip分为四段，以.连接 ，每段都是3位数字<br/>第一段可以是一位的 1-9，两位的01-99，三位的001-255<br/>第二段可以是一位的 0-9，两位的00-99，三位的000-255<br/>第三段可以是一位的 0-9，两位的00-99，三位的000-255<br/>第四段可以是一位的 1-9，两位的01-99，三位的001-255 |  
|checkNumberAndLetterAndChinese | 中英文、数字   | — |  
|isIdeographNumUnderline | 中英文、数字及下划线组成，且不能为纯下划线  | — | 
|isBrackets | 中英文、下划线及括号（中英文括号）组成   | — | 
|isIdeographUnderline | 中英文及下划线组成，且不能为纯下划线    | — | 
|isLetterUnderline | 英文字母以及下划线组成，且不能为纯下划线    | — | 
|checkPassword | 密码校验    | 1、8-30位组合且包含字母、数字、特殊字符!<br />2、密码中不能包含中文！<br />3、密码中不能包含表情！ | 
|checkMoney |金额      | 金额数字校验，支持正数和负数以及小数点<br/>  首先分析下规则<br/>  1、负号可以可无<br/>  2、小数部分可有可无<br/>  3、最多精确到2位小数即分位<br/>  4、整数部分可以是0，整数部分最多9位  | 
|checkOfficersCard | 军官证     | 军官证的编号数字6、7、8位的都有。<br/>  数字前边是所在大军区的级别的单位简称有：南、北、沈、兰、成、济、广、参、证、后、装、海、空 。<br/>  通常来看，从军官证的前几位答中，是可以识别出军人所在单位的师旅级单位的，但是后几位完全是流水号，是随机的，没有任何意义。| 
