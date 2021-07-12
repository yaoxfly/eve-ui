# utils工具类
utils工具类主要作用于规范表单的正则验证，开发人员针对不同项目中遇到一些常用的表单验证，可以直接使用相应的正则验证方法即可，要是没有找到相应的正则表达式，可自行在项目中自行添加验证，或通知管理员统一收集，在新版本集成。

# 引用方式-按需，全局（补充）

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
formValidate: {
	mobilePhone: '', // 移动电话
}
formValidateRules: {
    mobilePhone: [
        { required: true, message: '必填项', trigger: 'blur' },//必填项校验
        { validator: checkMobilePhone, trigger: 'blur' }//手机号输入正则校验
    ],
}
```

```js
/**
 * 手机号码
 * @param {*} rule
 *  手机号码规则：
    1、11位数字组成
    2、数字1开头
    3、第二位 最新的手机号现在是 3,4,5,6,7,8,9 几个数字
    ^1[3-9]\d{9}$
 * @param {*} value
 * @param {*} callback
 *
 */
export const checkMobilePhone = (rule, value, callback) => {
  const reg = /^1[3-9]\d{9}$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的手机号码！'))
    } else {
      callback()
    }
  }
}
```

# 正则方法清单

| utils中文名称                              | utils方法名称                  | 备注                                                         |
| ------------------------------------------ | ------------------------------ | ------------------------------------------------------------ |
| 手机号                                     | checkMobilePhone               | 1、11位数字组成<br/>2、数字1开头<br/>3、第二位 最新的手机号现在是 3,4,5,6,7,8,9 几个数字 |
| 固定电话                                   | checkFixedPhone                | 区号：0开头的3或4位的数字<br/>号码：7或8位的数字<br/>分机号：1-6位的数字<br/>连接符：- |
| 传真                                       | checkFax                       | 区号（3到4位数字）+电话号码（7到8位数字）+分机号（1到6位数字）<br/>例如：010-26737123-888 |
| 电子邮箱                                   | checkEmail                     | 邮箱基本格式是 *****@**.**<br/>@以前是一个 大小写的字母或者数字开头，紧跟0到多个大小写字母或者数字或 . _ - 的字符串<br/>@之后到.之前是 1到多个大小写字母或者数字的字符串<br/>.之后是 1到多个 大小写字母或者数字或者.的字符串<br/>  /^[a-zA-Z0-9][a-zA-Z0-9._-]*\@[a-zA-Z0-9]{1,10}\.[a-zA-Z0-9\.]{1,20}$/A<br/>  这里限制了@之后 和 .之后的字符串位数，如果不够可以自行修改。 |
| 邮政编码                                   | checkPostalCode                | 中国邮政编码为不以0开头的6位纯数字                           |
| 身份证格式校验                             | checkIdCheck                   |                                                              |
| 统一社会信用代码                           | checkSocialCreditCode          |                                                              |
| 纯数字                                     | checkAllDigital                |                                                              |
| 纯中文                                     | checkAllChinese                |                                                              |
| 纯字母                                     | checkAllLetters                |                                                              |
| 数字+字母                                  | checkNumberAndLetter           |                                                              |
| 车牌号（含新能源）                         | checkCarNumber                 |                                                              |
| IP地址                                     | checkIsIp                      | ip分为四段，以.连接 ，每段都是3位数字<br/>第一段可以是一位的 1-9，两位的01-99，三位的001-255<br/>第二段可以是一位的 0-9，两位的00-99，三位的000-255<br/>第三段可以是一位的 0-9，两位的00-99，三位的000-255<br/>第四段可以是一位的 1-9，两位的01-99，三位的001-255 |
| 中英文、数字                               | checkNumberAndLetterAndChinese |                                                              |
| 中英文、数字及下划线组成，且不能为纯下划线 | isIdeographNumUnderline        |                                                              |
| 中英文、下划线及括号（中英文括号）组成     | isBrackets                     |                                                              |
| 中英文及下划线组成，且不能为纯下划线       | isIdeographUnderline           |                                                              |
| 英文字母以及下划线组成，且不能为纯下划线   | isLetterUnderline              |                                                              |
| 密码校验                                   | checkPassword                  | 1、8-30位组合且包含字母、数字、特殊字符!<br />2、密码中不能包含中文！<br />3、密码中不能包含表情！ |
| 金额                                       | checkMoney                     | 金额数字校验，支持正数和负数以及小数点<br/>  首先分析下规则<br/>  1、负号可以可无<br/>  2、小数部分可有可无<br/>  3、最多精确到2位小数即分位<br/>  4、整数部分可以是0，整数部分最多9位 |
| 军官证                                     | checkOfficersCard              | 军官证的编号数字6、7、8位的都有。<br/>  数字前边是所在大军区的级别的单位简称有：南、北、沈、兰、成、济、广、参、证、后、装、海、空 。<br/>  通常来看，从军官证的前几位答中，是可以识别出军人所在单位的师旅级单位的，但是后几位完全是流水号，是随机的，没有任何意义。 |

# 代码集合

```js

```

