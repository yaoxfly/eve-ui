# 自定义主题
`eve-ui` 默认提供一套主题，`CSS` 命名采用 `BEM` 的风格，方便使用者覆盖样式。

### 在项目中改变 `SCSS` 变量切换主题
`eve-ui` 的 `theme-chalk` 使用 `SCSS` 编写，如果你的项目也使用了`SCSS`，那么可以直接在项目中改变 `eve-ui` 的样式变量。新建一个样式文件,例如`eve-ui-variables.scss`把它放进`src/assets/style`，没有当前目录就创建目录，写入以下内容：

```js
/* 改变主题色变量 */
$--color-primary: teal;
/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';
/* element-ui样式 */
@import "~element-ui/packages/theme-chalk/src/index";
/* eve-ui样式 */
@import "~eve-ui/src/assets/style/theme-chalk/index";
```

> 注意使用`scss`变量改变主题，需要安装`node-sass`和`sass-loader` 

### 自定义样式主题颜色设置(非组件以及公共样式)

> 在自定义样式中设置主题颜色时，不要在`scoped`下修改,要包一层父亲或者兄弟`class`，否则样式可能无法生效

文字

```scss
 /* 原本写法，主题切换后不生效 */
 .test{
    color:$--color-primary  /*color:#409eff*/
  }

 /* 主题切换生效的写法 */
 .test{
     @include themes-text-color  
  }
```

背景色

```scss
@include themes-background-color 
/*替代以下写法*/
 .test{
     background: $--color-primary
  }
```

边框颜色

```scss
@include themes-border-color
/*替代以下写法*/
 .test{
     border:1px solid $--color-primary
 }

```

自定义属性

除了border、color、background之外 其他任意属性也可设置，设置后才能根据主题来切换颜色

```scss
//第一个参数是css属性 第二个参数设置主题色，第三个参数css属性:后的任意值

@include themes-column-attribute('border',color-primary,1px solid )
/*以上写法变成下面的写法*/
.test{
     border: $--color-primary 1px solid
 }
```

内置的颜色变量
```js
/*
* @Author: yx
* @Description: 当前项目颜色主题变量
*/
// 白色
$--color-white: #ffffff !default;
/***自定义mixin*****/

// 默认主题
$default-theme: (
  color-primary: #409eff,
  color-primary-light-8: mix($--color-white, #409eff, 80%),
  color-primary-light-9: mix($--color-white, #409eff, 90%),
  color-primary-light-2: mix($--color-white, #409eff, 20%),
  color-primary-light-5: mix($--color-white, #409eff, 50%),
);

//桔黄色主题
$orange-theme: (
  color-primary: #c7993f,
  color-primary-light-8: mix($--color-white, #c7993f, 80%),
  color-primary-light-9: mix($--color-white, #c7993f, 90%),
  color-primary-light-2: mix($--color-white, #c7993f, 20%),
  color-primary-light-5: mix($--color-white, #c7993f, 50%),
);

//红色主题
$red-theme: (
  color-primary: #fa541c,
  color-primary-light-8: mix($--color-white, #c7993f, 80%),
  color-primary-light-9: mix($--color-white, #c7993f, 90%),
  color-primary-light-2: mix($--color-white, #c7993f, 20%),
  color-primary-light-5: mix($--color-white, #c7993f, 50%),
);


$cyan-theme: (
  color-primary: #13c2c2,
  color-primary-light-8: mix($--color-white, #c7993f, 80%),
  color-primary-light-9: mix($--color-white, #c7993f, 90%),
  color-primary-light-2: mix($--color-white, #c7993f, 20%),
  color-primary-light-5: mix($--color-white, #c7993f, 50%),
);

$green-theme: (
  color-primary: #52c41a,
  color-primary-light-8: mix($--color-white, #c7993f, 80%),
  color-primary-light-9: mix($--color-white, #c7993f, 90%),
  color-primary-light-2: mix($--color-white, #c7993f, 20%),
  color-primary-light-5: mix($--color-white, #c7993f, 50%),
);


$purple-theme: (
  color-primary: #712dce,
  color-primary-light-8: mix($--color-white, #c7993f, 80%),
  color-primary-light-9: mix($--color-white, #c7993f, 90%),
  color-primary-light-2: mix($--color-white, #c7993f, 20%),
  color-primary-light-5: mix($--color-white, #c7993f, 50%),
);


//定义映射集合
$themes: (
  default-theme: $default-theme,
  orange-theme: $orange-theme,
  red-theme:$red-theme,
  cyan-theme: $cyan-theme,
  green-theme: $green-theme,
  purple-theme:$purple-theme
);

//文本颜色
@mixin themes-text-color() {
  @each $themeName, $theme in $themes {
    [data-theme='#{$themeName}'] & {
      color: map-get($map: $theme, $key: color-primary);
    }
  }
}

//边框颜色
@mixin themes-border-color() {
  @each $themeName, $theme in $themes {
    [data-theme='#{$themeName}'] & {
      border-color: 1px solid map-get($map: $theme, $key: color-primary);
    }
  }
}

//背景颜色
@mixin themes-background-color($value...) {
  @each $themeName, $theme in $themes {
    [data-theme='#{$themeName}'] & {
      background: map-get($map: $theme, $key: color-primary);
    }
  }
}

//自定义属性 1.属性值 例如border 2.主题色 例如 color-primary  3.写除了主题色的任意值 例如 1px solid 没有顺序
@mixin themes-column-attribute($attribute, $color, $value...) {
  @each $themeName, $theme in $themes {
    [data-theme='#{$themeName}'] & {
      #{$attribute}: map-get($map: $theme, $key: $color) $value;
    }
  }
}
/*element-ui*/


/* -----基础颜色----- */

/*主色*/
// 主题色
$--color-primary: #409eff !default;
// d9ecff
$--color-primary-light-8: mix($--color-white, $--color-primary, 80%) !default;
// ecf5ff-- 按钮填充样式2
$--color-primary-light-9: mix($--color-white, $--color-primary, 90%) !default;
// 66b1ff-- 鼠标悬停
$--color-primary-light-2: mix($--color-white, $--color-primary, 20%) !default;
// 3A8EE6-- 鼠标按下

// A0CFFF-- 禁用
$--color-primary-light-5: mix($--color-white, $--color-primary, 50%) !default;

/*辅助色*/
// 黑色
$--color-black: #000000 !default;

// 成功
$--color-success: #67c23a !default;
//E1F3D8
$--color-success-light: mix($--color-white, $--color-success, 80%) !default;
//F0F9EB
$--color-success-lighter: mix($--color-white, $--color-success, 90%) !default;

// 警告
$--color-warning: #e6a23c !default;
//FAECD8
$--color-warning-light: mix($--color-white, $--color-warning, 80%) !default;
//FDF6EC
$--color-warning-lighter: mix($--color-white, $--color-warning, 90%) !default;

// 危险
$--color-danger: #f56c6c !default;
//FDE2E2
$--color-danger-light: mix($--color-white, $--color-danger, 80%) !default;
//FEF0F0
$--color-danger-lighter: mix($--color-white, $--color-danger, 90%) !default;

// 信息
$--color-info: #909399 !default;
//E9E9EB
$--color-info-light: mix($--color-white, $--color-info, 80%) !default;
//F4F4F5
$--color-info-lighter: mix($--color-white, $--color-info, 90%) !default;

/*-----文本颜色-----*/
//主要文字
$--color-text-primary: #303133 !default;
//常规文字
$--color-text-regular: #606266 !default;
//次要文字
$--color-text-secondary: #909399 !default;
//占位文字
$--color-text-placeholder: #c0c4cc !default;

/*-----边框颜色-----*/
//一级边框
$--border-color-base: #dcdfe6 !default;
//二级边框
$--border-color-light: #e4e7ed !default;
//三级边框
$--border-color-lighter: #ebeef5 !default;
//四级边框
$--border-color-extra-light: #f2f6fc !default;

/*-----字体大小-----*/
//主标题
$--font-size-extra-large: 20px !default;
//标题
$--font-size-large: 18px !default;
//小标题
$--font-size-medium: 16px !default;
//正文
$--font-size-base: 14px !default;
//正文（小）
$--font-size-small: 13px !default;
//辅助文字
$--font-size-extra-small: 12px !default;

// Background--背景
/// color|1|Background Color|4
$--background-color-base: #f5f7fa !default;

// Box-shadow --阴影
/// boxShadow|1|Shadow|1
$--box-shadow-base: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04) !default;
// boxShadow|1|Shadow|1
$--box-shadow-dark: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.12) !default;
/// boxShadow|1|Shadow|1
$--box-shadow-light: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !default;

/* Typography--字体
-------------------------- */
$--font-color-disabled-base: #bbb !default;

/* Size--形状
-------------------------- */
$--size-base: 14px !default;

/* z-index--层级
-------------------------- */
$--index-normal: 1 !default;
$--index-top: 1000 !default;
$--index-popper: 2000 !default;

/* Icon--字体图标
-------------------------- */
$--icon-color: #666 !default;

/* Checkbox
-------------------------- */
$--checkbox-disabled-input-fill: #edf2fc !default;

/* Select
-------------------------- */
$--select-multiple-input-color: #666 !default;
$--select-dropdown-empty-color: #999 !default;

/* Message --消息
-------------------------- */
$--message-background-color: #edf2fc !default;

/* Cascader
-------------------------- */
$--cascader-tag-background: #f0f2f5;

/* Tab
-------------------------- */
$--tab-border-line: 1px solid #e4e4e4 !default;

/* Dialog
-------------------------- */
$--dialog-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !default;

/* DatePicker
--------------------------*/
$--datepicker-inner-border-color: #e4e4e4 !default;
$--datepicker-cell-hover-color: #fff !default;
/* Calendar
--------------------------*/
$--calendar-selected-background-color: #f2f8fe !default;

/* Avatar
--------------------------*/
/// color||Color|0
$--avatar-font-color: #fff !default;
/// color||Color|0
$--avatar-background-color: #c0c4cc !default;

/*自定义的变量*/

/*---字体---*/

// 标题
$--font-size-title: 14px !default;
// 内容
$--font-size-content: 13px !default;
// 内容(小)
$--font-size-content-small: 12px !default;

/*---菜单---*/

//宽度
$--eve-menu-width: 256px !default;
/*---header组件---*/

//背景色
$--eve-header-background: #3379cc !default;

//自定义的高度、对话框的高度、footer的高度等
$--height: 40px !default;

/*---Form---*/

//表格类表单[边框]颜色-d9ecff
$tableBorderColor: $--color-primary-light-8 !default;

//form-item__label背景色-ecf5ff
$LabelbgColor: $--color-primary-light-9 !default;

//form-item__label文字颜色（常规文字）
$LabelColor: $--color-text-regular !default;

//form-item__label文字大小 (正文小)-13px
$LabelFontSize: $--font-size-small !default;

//form-item__label边距设置
$LabelPadding: 8px 12px 8px 4px !default;

//form-item__content边距设置
$ContentPadding: 3px 30px 3px 4px !default;

//eve-common-input高度
$eveCommonInputHeight: 26px !default; //mini为28px,目前设置比mini还小

//eve-common-input内部边距
$eveCommonInputPadding: 0 4px !default;

//eve-common-input prefix、suffix图标距离文字间距
$eveCommonInputPrefixSuffix: 30px !default;

```