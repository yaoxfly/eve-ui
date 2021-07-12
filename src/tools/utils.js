
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
/**
 * 固定电话
 * @param {*} rule
 *  电话号码规则：
    区号：0开头的3或4位的数字
    号码：7或8位的数字
    分机号：1-6位的数字
    连接符：-
    /0\d{2,3}-\d{7,8}/    //不支持分机号码
    /0\d{2,3}-\d{7,8}-\d{1,6}/   //必须有分机号码
    /0\d{2,3}-\d{7,8}(-\d{1,6})?/    //可填可不填分机号码
 * @param {*} value
 * @param {*} callback
 *
 */
export const checkFixedPhone = (rule, value, callback) => {
  const reg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的固定电话！'))
    } else {
      callback()
    }
  }
}

/**
 * 传真
 * @param {*} rule
 *  国内传真号码的通用格式：
    区号（3到4位数字）+电话号码（7到8位数字）+分机号（1到6位数字）
    例如：010-26737123-888
    /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/
 * @param {*} value
 * @param {*} callback
 *
 */
export const checkFax = (rule, value, callback) => {
  const reg = /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的传真！'))
    } else {
      callback()
    }
  }
}
/**
 * 电子邮箱
 * @param {*} rule
 *  先定义下规则：
  邮箱基本格式是 *****@**.**
  @以前是一个 大小写的字母或者数字开头，紧跟0到多个大小写字母或者数字或 . _ - 的字符串
  @之后到.之前是 1到多个大小写字母或者数字的字符串
  .之后是 1到多个 大小写字母或者数字或者.的字符串
  /^[a-zA-Z0-9][a-zA-Z0-9._-]*\@[a-zA-Z0-9]{1,10}\.[a-zA-Z0-9\.]{1,20}$/A
  这里限制了@之后 和 .之后的字符串位数，如果不够可以自行修改。
 * @param {*} value
 * @param {*} callback
 *
 */
  export const checkEmail = (rule, value, callback) => {
  // eslint-disable-next-line no-useless-escape
  const reg = /^[a-zA-Z0-9][a-zA-Z0-9._-]*\@[a-zA-Z0-9]{1,10}\.[a-zA-Z0-9\.]{1,20}$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的电子邮箱！'))
    } else {
      callback()
    }
  }
}
/**
 * 邮政编码
 * @param {*} rule
 * 规则：中国邮政编码为不以0开头的6位纯数字
 * ^[1-9]\d{5}$
 * @param {*} value
 * @param {*} callback
 *
 */
 export const checkPostalCode = (rule, value, callback) => {
  const reg = /^[1-9]\d{5}$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的邮政编码！'))
    } else {
      callback()
    }
  }
}
// 身份证格式校验
export const checkIdCheck = (rule, value, callback) => {
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    const res = idCheck(value)
    if (res !== '') {
      callback(new Error(res))
    } else {
      callback()
    }
  }
}
// 身份证检验规则
export const idCheck = idcard => {
  // 验证通过的话就不返回错误信息
  const Errors = [
    '',
    '身份证号码位数不对!',
    '身份证号码出生日期超出范围或含有非法字符!',
    '身份证号码校验错误!',
    '身份证地区非法!'
  ]
  const area = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }
  let Y, JYM
  let S, M
  const idcardArray = idcard.split('')
  // 身份号码位数及格式检验
  let ereg = ''
  switch (idcard.length) {
    case 15:
      // 地区检验
      if (area[parseInt(idcard.substr(0, 2))] === null) return Errors[4]
      if (
        (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0 ||
        ((parseInt(idcard.substr(6, 2)) + 1900) % 100 === 0 &&
          (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0)
      ) {
        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/ // 测试出生日期的合法性
      } else {
        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/ // 测试出生日期的合法性
      }
      if (ereg.test(idcard)) {
        return Errors[0]
      } else {
        return Errors[2]
      }
    // break
    case 18:
      // 地区检验
      if (area[parseInt(idcard.substr(0, 2))] === null) return Errors[4]
      if (
        parseInt(idcard.substr(6, 4)) % 4 === 0 ||
        (parseInt(idcard.substr(6, 4)) % 100 === 0 &&
          parseInt(idcard.substr(6, 4)) % 4 === 0)
      ) {
        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/ // 闰年出生日期的合法性正则表达式
      } else {
        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/ // 平年出生日期的合法性正则表达式
      }
      if (ereg.test(idcard)) {
        // 测试出生日期的合法性
        // 计算校验位
        S =
          (parseInt(idcardArray[0]) + parseInt(idcardArray[10])) * 7 +
          (parseInt(idcardArray[1]) + parseInt(idcardArray[11])) * 9 +
          (parseInt(idcardArray[2]) + parseInt(idcardArray[12])) * 10 +
          (parseInt(idcardArray[3]) + parseInt(idcardArray[13])) * 5 +
          (parseInt(idcardArray[4]) + parseInt(idcardArray[14])) * 8 +
          (parseInt(idcardArray[5]) + parseInt(idcardArray[15])) * 4 +
          (parseInt(idcardArray[6]) + parseInt(idcardArray[16])) * 2 +
          parseInt(idcardArray[7]) * 1 +
          parseInt(idcardArray[8]) * 6 +
          parseInt(idcardArray[9]) * 3
        Y = S % 11
        M = 'F'
        JYM = '10X98765432'
        M = JYM.substr(Y, 1) // 判断校验位
        if (M === idcardArray[17]) return Errors[0]
        // 检测ID的校验位
        else if (idcardArray[17] === 'X' || idcardArray[17] === 'x') {
          return Errors[0]
        } else return Errors[3]
      } else return Errors[2]
    // break
    default:
      return Errors[1]
    // break
  }
}
// 统一社会信用代码
export const checkSocialCreditCode = (rule, value, callback) => {
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    const res = checkSHXYDM(value)
    if (res !== '') {
      callback(new Error(res))
    } else {
      callback()
    }
  }
}
// 统一社会信用代码 精准校验
export const checkSHXYDM = (val) => {
  const errorMsg = '请输入正确的统一社会信用代码！'
  if (!val) {
    return ''
  }
  var Code = val.toString()
  // 验证第一位
  var validOne = '159Y'
  if (validOne.indexOf(Code.substring(0, 1)) < 0) {
    return errorMsg
  }
  // 验证第二位
  var validTwo = '1239'
  if (validTwo.indexOf(Code.substring(1, 2)) < 0) {
    return errorMsg
  }
  var patrn = /^[0-9A-Z]+$/
  // 18位校验
  // 英文，数字校验
  if (Code.length !== 18 || patrn.test(Code) === false) {
    return errorMsg
  }
  // 计算校验位
  var Ancode // 统一社会信用代码的每一个值
  var Ancodevalue // 统一社会信用代码每一个值对应数值
  var total = 0
  var weightedfactors = [
    1,
    3,
    9,
    27,
    19,
    26,
    16,
    17,
    20,
    29,
    25,
    13,
    8,
    24,
    10,
    30,
    28
  ] // 加权因子
  var str = '0123456789ABCDEFGHJKLMNPQRTUWXY'
  // 不用I、O、S、V、Z
  for (var i = 0; i < Code.length - 1; i++) {
    Ancode = Code.substring(i, i + 1)
    Ancodevalue = str.indexOf(Ancode)
    total = total + Ancodevalue * weightedfactors[i]
    // 权重与加权因子相乘之和
  }
  var logiccheckcode = 31 - (total % 31)
  if (logiccheckcode === 31) {
    logiccheckcode = 0
  }
  var Str = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y'
  var arrayStr = Str.split(',')
  logiccheckcode = arrayStr[logiccheckcode]

  var checkcode = Code.substring(17, 18)
  if (logiccheckcode !== checkcode) {
    return errorMsg
  }
  return ''
}
// 纯数字
export const checkAllDigital = (rule, value, callback) => {
  const reg = /^[0-9]+$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入纯数字！'))
    } else {
      callback()
    }
  }
}

// 纯中文
export const checkAllChinese = (rule, value, callback) => {
  const reg = /^[\u4e00-\u9fa5]+$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入纯中文！'))
    } else {
      callback()
    }
  }
}

// 纯字母
export const checkAllLetters = (rule, value, callback) => {
  const reg = /^[a-zA-Z]+$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入纯字母！'))
    } else {
      callback()
    }
  }
}

// 数字+字母
export const checkNumberAndLetter = (rule, value, callback) => {
  const reg = /^[a-zA-Z0-9]+$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入数字+字母！'))
    } else {
      callback()
    }
  }
}
/**
 * 车牌号（含新能源）
 * @param {*} rule
 民用车牌规则
  普通车牌（蓝牌、黄牌）
  车牌号码长度：7 位
  车牌号码格式：
  第1位：省份简称
  第2位：发证机关代码
  第3位：号码
  第4位：号码
  第5位：号码
  第6位：号码
  第7位：号码
  省份简称：京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新
  发证机关代码：ABCDEFGHJKLMNPQRSTUVWXY （无 I, O , Z 三个字母。其中O和Z属于特殊车牌类型）
  车牌号码：
  数字：0123456789
  字母：ABCDEFGHJKLNMxPQRSTUVWXYZ （说明：无 I, O 字母；）
  正则如下：
  /^[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][\dABCDEFGHJKLNMxPQRSTUVWXYZ]{5}$/

新能源车牌
  车牌号码长度：8 位
  车牌号码格式：
  第1位：省份简称
  第2位：发证机关代码
  第3位：号码
  第4位：号码
  第5位：号码
  第6位：号码
  第7位：号码
  第8位：号码
  新能源车牌现阶段号码长度为8位，按照现行新能源车牌号码规则：
  第3位：1-9DF
  第4位：1-9A-Z，无I、O字母；
  第5-7位：0-9
  第8位：1-9DF
  正则如下：
  /^[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][1-9DF][1-9ABCDEFGHJKLMNPQRSTUVWXYZ]\d{3}[1-9DF]$/

  同时验证两种的正则如下：
  /^([京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][1-9DF][1-9ABCDEFGHJKLMNPQRSTUVWXYZ]\d{3}[1-9DF]|[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][\dABCDEFGHJKLNMxPQRSTUVWXYZ]{5})$/
 * @param {*} value
 * @param {*} callback
 *
 */
export const checkCarNumber = (rule, value, callback) => {
  const reg = /^([京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][1-9DF][1-9ABCDEFGHJKLMNPQRSTUVWXYZ]\d{3}[1-9DF]|[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][\dABCDEFGHJKLNMxPQRSTUVWXYZ]{5})$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的车牌号！'))
    } else {
      callback()
    }
  }
}
/**
 * IP地址
 * @param {*} rule
 *规则：
  ip分为四段，以.连接 ，每段都是3位数字
  第一段可以是一位的 1-9，两位的01-99，三位的001-255
  第二段可以是一位的 0-9，两位的00-99，三位的000-255
  第三段可以是一位的 0-9，两位的00-99，三位的000-255
  第四段可以是一位的 1-9，两位的01-99，三位的001-255
  正则如下：
  ^((([1-9])|((0[1-9])|([1-9][0-9]))|((00[1-9])|(0[1-9][0-9])|((1[0-9]{2})|(2[0-4][0-9])|(25[0-5]))))\.)((([0-9]{1,2})|(([0-1][0-9]{2})|(2[0-4][0-9])|(25[0-5])))\.){2}(([1-9])|((0[1-9])|([1-9][0-9]))|(00[1-9])|(0[1-9][0-9])|((1[0-9]{2})|(2[0-4][0-9])|(25[0-5])))$
 * @param {*} value
 * @param {*} callback
 *
 */
export const checkIsIp = (rule, value, callback) => {
  const reg = /^((([1-9])|((0[1-9])|([1-9][0-9]))|((00[1-9])|(0[1-9][0-9])|((1[0-9]{2})|(2[0-4][0-9])|(25[0-5]))))\.)((([0-9]{1,2})|(([0-1][0-9]{2})|(2[0-4][0-9])|(25[0-5])))\.){2}(([1-9])|((0[1-9])|([1-9][0-9]))|(00[1-9])|(0[1-9][0-9])|((1[0-9]{2})|(2[0-4][0-9])|(25[0-5])))$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的IP地址!'))
    } else {
      callback()
    }
  }
}

// 仅由中英文及下划线组成，且不能为纯下划线
export const isIdeographUnderline = (rule, value, callback) => {
  const reg = /^([\u4e00-\u9fa5a-zA-Z]{1,})([_]{0,})$|([_]{1,})([\u4e00-\u9fa5a-zA-Z]{1,})$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('仅由中英文及下划线组成，且不能为纯下划线'))
    } else {
      callback()
    }
  }
}

// 中英文、下划线及括号（中英文括号）组成
export const isBrackets = (rule, value, callback) => {
  const reg = /^[\u4e00-\u9fa5_a-zA-Z.\\()\\（）]+$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('仅由中英文、下划线及括号（中英文括号）组成'))
    } else {
      callback()
    }
  }
}
// 仅由英文字母以及下划线组成，且不能为纯下划线
export const isLetterUnderline = (rule, value, callback) => {
  const reg = /^([a-zA-Z]{1,})([_]{0,})$|([_]{1,})([a-zA-Z]{1,})$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('仅由英文字母以及下划线组成，且不能为纯下划线'))
    } else {
      callback()
    }
  }
}
// 中英文、数字
export const checkNumberAndLetterAndChinese = (rule, value, callback) => {
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('仅由中英文及数字组成'))
    } else {
      callback()
    }
  }
}
// 仅由中英文、数字及下划线组成，且不能为纯下划线
export const isIdeographNumUnderline = (rule, value, callback) => {
  const reg = /^([\u4e00-\u9fa5a-zA-Z0-9]{1,})([_]{0,})$|([_]{1,})([\u4e00-\u9fa5a-zA-Z0-9]{1,})$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('仅由中英文、数字及下划线组成，且不能为纯下划线'))
    } else {
      callback()
    }
  }
}
// 字母开头且仅由字母、数字及下划线组成
export const isLetterNumUnderline = (rule, value, callback) => {
  const reg = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('字母开头且仅由字母、数字及下划线组成'))
    } else {
      callback()
    }
  }
}
/**
 * 密码校验
 */
export const checkPassword = (rule, value, callback) => {
  if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/.test(value)) {
    callback(new Error('8-30位组合且包含字母、数字、特殊字符!'))
  } else if (!/^[^\u4e00-\u9fa5]{0,}$/.test(value)) {
    callback(new Error('密码中不能包含中文!'))
  } else if (
    /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g.test(
      value
    )
  ) {
    callback(new Error('密码中不能包含表情!'))
  } else {
    callback()
  }
}

/**
 * 金额
 * @param {*} rule
 *金额数字校验，支持正数和负数以及小数点
  首先分析下规则
  1、负号可以可无
  2、小数部分可有可无
  3、最多精确到2位小数即分位
  4、整数部分可以是0，整数部分最多9位
  正则如下：
  ^(([1-9]\d{0,8}(\.\d{1,2})?)|(0\.[1-9]\d?))$
 * @param {*} value
 * @param {*} callback
 *
 */
  export const checkMoney = (rule, value, callback) => {
    const reg = /^(([1-9]\d{0,8}(\.\d{1,2})?)|(0\.[1-9]\d?))$/
    if (value === '' || value === undefined || value === null) {
      callback()
    } else {
      if (!reg.test(value)) {
        callback(new Error('请输入正确的金额!'))
      } else {
        callback()
      }
    }
  }

  /**
 * 军官证
 * @param {*} rule
 *军官证的编号数字6、7、8位的都有。
  数字前边是所在大军区的级别的单位简称有：南、北、沈、兰、成、济、广、参、证、后、装、海、空 。
  通常来看，从军官证的前几位答中，是可以识别出军人所在单位的师旅级单位的，但是后几位完全是流水号，是随机的，没有任何意义。
  正则如下：
  /^[南北沈兰成济广参证后装海空]\d{6,8}$/
 * @param {*} value
 * @param {*} callback
 *
 */
  export const checkOfficersCard = (rule, value, callback) => {
    const reg = /^[南北沈兰成济广参证后装海空]\d{6,8}$/
    if (value === '' || value === undefined || value === null) {
      callback()
    } else {
      if (!reg.test(value)) {
        callback(new Error('请输入正确的军官证!'))
      } else {
        callback()
      }
    }
  }

export default {
  checkMobilePhone,
  checkFixedPhone,
  checkFax,
  checkEmail,
  checkPostalCode,
  checkIdCheck,
  idCheck,
  checkSocialCreditCode,
  checkSHXYDM,
  checkAllDigital,
  checkAllChinese,
  checkAllLetters,
  checkNumberAndLetter,
  checkCarNumber,
  checkIsIp,
  isIdeographUnderline,
  isBrackets,
  isLetterUnderline,
  checkNumberAndLetterAndChinese,
  isIdeographNumUnderline,
  isLetterNumUnderline,
  checkPassword,
  checkMoney,
  checkOfficersCard
}
