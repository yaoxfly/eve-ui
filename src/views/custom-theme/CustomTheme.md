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

内置的颜色变量
```js
/* Color 基础颜色
-------------------------- */
/// color|1|Brand Color|0 --主题色
$--color-primary: #409eff !default;
// $--color-deep-primary: blue !default;
/// color|1|Background Color|4 --白色
$--color-white: #ffffff !default;
/// color|1|Background Color|4  --黑色
$--color-black: #000000 !default;
/// color|1|Functional Color|1  --成功
$--color-success: #67c23a !default;
/// color|1|Functional Color|1  --警告
$--color-warning: #e6a23c !default;
/// color|1|Functional Color|1  --危险
$--color-danger: #f56c6c !default;
/// color|1|Functional Color|1  --信息
$--color-info: #909399 !default;
/// color|1|Font Color|2 --文本主题颜色
$--color-text-primary: #303133 !default;
/// color|1|Font Color|2
$--color-text-regular: #606266 !default;
/// color|1|Font Color|2
$--color-text-secondary: #909399 !default;
/// color|1|Font Color|2
$--color-text-placeholder: #c0c4cc !default;
/// color|1|Border Color|3 --边框颜色
$--border-color-base: #dcdfe6 !default;
/// color|1|Border Color|3
$--border-color-light: #e4e7ed !default;
/// color|1|Border Color|3
$--border-color-lighter: #ebeef5 !default;
/// color|1|Border Color|3
$--border-color-extra-light: #f2f6fc !default;

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
```