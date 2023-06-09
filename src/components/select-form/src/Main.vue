<!--
* @Author: yx
* @Description: 查询表单的封装
* @Date: 2020-09-29
-->
<template>
  <div
    class="eve-select-form"
    :class="[{ 'eve-select-form__disabled': !disabledStyle }]"
  >
    <!-- el-form-item 和 el-form 配套使用 -->
    <el-form
      ref="formValidate"
      :model="model"
      :rules="rules"
      :label-width="'0px'"
      @submit.native.prevent
      @keyup.enter.native="handleSubmit('formValidate')"
    >
      <section class="eve-select-form__flex">
        <div class="eve-select-form__flex-start">
          <template v-for="(item, index) in data">
            <!--自定义类型，用slot来定义各种类型-->
            <section
              class="eve-select-form__flex-row-center"
              v-if="item.type === 'custom'"
              :key="`custom${index}`"
            >
              <label
                class="eve-select-form__from-lable"
                :style="{
                  width: `${getLabelWidth(item.labelWidth)}px`,
                  paddingLeft: `${item.labelPaddingLeft || labelPaddingLeft}px`,
                }"
                :class="[checkHidden(index)]"
              >
                <span
                  class="eve-select-form__asterisk"
                  v-if="checkAsterisk(item.prop, rules)"
                >
                  *
                </span>
                <span class="eve-select-form__label">{{ item.label }}</span>
                <span v-show="item.labelSuffix !== false">{{
                  item.labelSuffix || labelSuffix
                }}</span>
              </label>
              <el-form-item
                :prop="item.prop"
                class="
                  eve-select-form__formItem eve-select-form__custom-formItem
                "
                :style="{ width: `${getFormWidth(item.formWidth)}px` }"
                :class="[checkHidden(index)]"
              >
                <slot :name="item.prop" :row="item" :data="data">
                  请放置各种表单
                </slot>
                <!-- 自定义表单错误提示 -->
                <template #error="scope">
                  <el-tooltip
                    :content="scope.error"
                    class="eve-select-form__error-tip"
                  >
                    <i class="el-icon-warning-outline"></i>
                  </el-tooltip>
                </template>
              </el-form-item>
            </section>
            <!-- input-->
            <section
              class="eve-select-form__flex-row-center"
              :key="`input${index}`"
              v-if="item.type === 'input'"
            >
              <label
                class="eve-select-form__from-lable"
                :style="{
                  width: `${getLabelWidth(item.labelWidth)}px`,
                  paddingLeft: `${item.labelPaddingLeft || labelPaddingLeft}px`,
                }"
                :class="[checkHidden(index)]"
              >
                <span
                  class="eve-select-form__asterisk"
                  v-if="checkAsterisk(item.prop, rules)"
                >
                  *
                </span>
                <span class="eve-select-form__label">{{ item.label }}</span>
                <span v-show="item.labelSuffix !== false">{{
                  item.labelSuffix || labelSuffix
                }}</span>
              </label>
              <el-form-item
                :prop="item.prop"
                class="eve-select-form__formItem"
                :class="[checkHidden(index)]"
                :style="{ width: `${getFormWidth(item.formWidth)}px` }"
              >
                <slot :name="item.prop" :row="item" :data="data">
                  <el-input
                    style="width: 100%"
                    v-model.trim="model[item.prop]"
                    :placeholder="item.placeholder || '请输入'"
                    :maxlength="item.maxlength || 32"
                    :disabled="item.disabled"
                    :clearable="
                      item.clearable !== undefined ? item.clearable : true
                    "
                    @clear="clear"
                  ></el-input>
                </slot>

                <!-- 自定义表单错误提示 -->
                <template #error="scope">
                  <el-tooltip
                    :content="scope.error"
                    class="eve-select-form__error-tip"
                  >
                    <i class="el-icon-warning-outline"></i>
                  </el-tooltip>
                </template>
              </el-form-item>

              <section :class="[checkHidden(index)]">
                <slot name="input"></slot>
              </section>

              <section :class="[checkHidden(index)]">
                <slot :name="`input-${item.prop}`"></slot>
              </section>
            </section>

            <!--date-picker -->
            <section
              class="eve-select-form__flex-row-center"
              :key="`date-picker${index}`"
              v-if="item.type === 'date'"
            >
              <label
                class="eve-select-form__from-lable"
                :style="{
                  width: `${getLabelWidth(item.labelWidth)}px`,
                  paddingLeft: `${item.labelPaddingLeft || labelPaddingLeft}px`,
                }"
                :class="[checkHidden(index)]"
              >
                <span
                  class="eve-select-form__asterisk"
                  v-if="checkAsterisk(item.prop, rules)"
                >
                  *
                </span>
                <span class="eve-select-form__label">{{ item.label }}</span>
                <span v-show="item.labelSuffix !== false">{{
                  item.labelSuffix || labelSuffix
                }}</span>
              </label>
              <el-form-item
                :prop="item.prop"
                class="eve-select-form__formItem"
                :style="{ width: `${getFormWidth(item.formWidth)}px` }"
                :class="[checkHidden(index)]"
              >
                <slot :name="item.prop" :row="item" :data="data">
                  <el-date-picker
                    :type="item.pickerType || 'date'"
                    v-model="model[item.prop]"
                    :placeholder="item.placeholder || '选择日期'"
                    style="width: 100%"
                    :value-format="
                      pickerFormat(item.valueFormat, item.pickerType, item.type)
                    "
                    :format="
                      pickerFormat(item.format, item.pickerType, item.type)
                    "
                    :range-separator="item.rangeSeparator"
                    :start-placeholder="
                      item.startPlaceholder ? item.startPlaceholder : '开始日期'
                    "
                    :end-placeholder="
                      item.endPlaceholder ? item.endPlaceholder : '结束日期'
                    "
                    @change="change(model[item.prop])"
                  ></el-date-picker>
                </slot>

                <!-- 自定义表单错误提示 -->
                <template #error="scope">
                  <el-tooltip
                    :content="scope.error"
                    class="eve-select-form__error-tip"
                  >
                    <i class="el-icon-warning-outline"></i>
                  </el-tooltip>
                </template>
              </el-form-item>

              <section :class="[checkHidden(index)]">
                <slot name="date-picker"></slot>
              </section>

              <section :class="[checkHidden(index)]">
                <slot :name="`date-picker-${item.prop}`"></slot>
              </section>
            </section>

            <!--dateRange 自定义时间范围 -->
            <section
              class="eve-select-form__flex-row-center"
              :key="`date-picker${index}`"
              v-if="item.type === 'dateRange'"
            >
              <label
                class="eve-select-form__from-lable"
                :style="{
                  width: `${getLabelWidth(item.labelWidth)}px`,
                  paddingLeft: `${item.labelPaddingLeft || labelPaddingLeft}px`,
                }"
                :class="[checkHidden(index)]"
              >
                <span
                  class="eve-select-form__asterisk"
                  v-if="checkAsterisk(item.prop, rules)"
                >
                  *
                </span>
                <span class="eve-select-form__label">{{ item.label }}</span>
                <span v-show="item.labelSuffix !== false">{{
                  item.labelSuffix || labelSuffix
                }}</span>
              </label>
              <el-form-item
                :prop="item.prop"
                class="eve-select-form__formItem eve-select-form__date-range"
                :style="{ width: `${getFormWidth(item.formWidth)}px` }"
                :class="[checkHidden(index)]"
              >
                <slot :name="item.prop" :row="item" :data="data">
                  <section class="eve-select-form__date-range-flex">
                    <el-date-picker
                      :type="item.pickerType || 'date'"
                      v-model="model[item.prop][0]"
                      :placeholder="item.placeholder || '开始时间'"
                      style="width: 50%"
                      :value-format="
                        pickerFormat(
                          item.valueFormat,
                          item.pickerType,
                          item.type
                        )
                      "
                      :format="
                        pickerFormat(item.format, item.pickerType, item.type)
                      "
                      :range-separator="item.rangeSeparator"
                      :start-placeholder="
                        item.startPlaceholder
                          ? item.startPlaceholder
                          : '开始日期'
                      "
                      :end-placeholder="
                        item.endPlaceholder ? item.endPlaceholder : '结束日期'
                      "
                      @change="change(model[item.prop])"
                    ></el-date-picker>
                    <span style="margin: 0 2px">-</span>
                    <el-date-picker
                      :type="item.pickerType || 'date'"
                      v-model="model[item.prop][1]"
                      :placeholder="item.placeholder || '结束时间'"
                      style="width: 50%"
                      :value-format="
                        pickerFormat(
                          item.valueFormat,
                          item.pickerType,
                          item.type
                        )
                      "
                      :format="
                        pickerFormat(item.format, item.pickerType, item.type)
                      "
                      :range-separator="item.rangeSeparator"
                      :start-placeholder="
                        item.startPlaceholder
                          ? item.startPlaceholder
                          : '开始日期'
                      "
                      :end-placeholder="
                        item.endPlaceholder ? item.endPlaceholder : '结束日期'
                      "
                      @change="change(model[item.prop])"
                    ></el-date-picker>
                  </section>
                </slot>

                <!-- 自定义表单错误提示 -->
                <template #error="scope">
                  <el-tooltip
                    :content="scope.error"
                    class="eve-select-form__error-tip"
                  >
                    <i class="el-icon-warning-outline"></i>
                  </el-tooltip>
                </template>
              </el-form-item>

              <section :class="[checkHidden(index)]">
                <slot name="date-picker"></slot>
              </section>

              <section :class="[checkHidden(index)]">
                <slot :name="`date-picker-${item.prop}`"></slot>
              </section>
            </section>

            <!--time-picker -->
            <section
              class="eve-select-form__flex-row-center"
              :key="`time-picker${index}`"
              v-if="item.type === 'time'"
            >
              <label
                class="eve-select-form__from-lable"
                :style="{
                  width: `${getLabelWidth(item.labelWidth)}px`,
                  paddingLeft: `${item.labelPaddingLeft || labelPaddingLeft}px`,
                }"
                :class="[checkHidden(index)]"
              >
                <span
                  class="eve-select-form__asterisk"
                  v-if="checkAsterisk(item.prop, rules)"
                >
                  *
                </span>
                <span class="eve-select-form__label">{{ item.label }}</span>
                <span v-show="item.labelSuffix !== false">{{
                  item.labelSuffix || labelSuffix
                }}</span>
              </label>

              <el-form-item
                :prop="item.prop"
                class="eve-select-form__formItem"
                :style="{ width: `${getFormWidth(item.formWidth)}px` }"
                :class="[checkHidden(index)]"
              >
                <slot :name="item.prop" :row="item" :data="data">
                  <el-time-picker
                    style="width: 100%"
                    v-model="model[item.prop]"
                    :picker-options="item.pickerOptions"
                    :placeholder="item.placeholder || '选择时间'"
                    :value-format="
                      pickerFormat(item.valueFormat, item.pickerType, item.type)
                    "
                    :format="
                      pickerFormat(item.format, item.pickerType, item.type)
                    "
                    @change="change(model[item.prop])"
                  >
                  </el-time-picker>
                </slot>
                <!-- 自定义表单错误提示 -->
                <template #error="scope">
                  <el-tooltip
                    :content="scope.error"
                    class="eve-select-form__error-tip"
                  >
                    <i class="el-icon-warning-outline"></i>
                  </el-tooltip>
                </template>
              </el-form-item>

              <section :class="[checkHidden(index)]">
                <slot name="time-picker"></slot>
              </section>

              <section :class="[checkHidden(index)]">
                <slot :name="`time-picker-${item.prop}`"></slot>
              </section>
            </section>

            <!-- select-->
            <section
              class="eve-select-form__flex-row-center"
              :key="`select${index}`"
              v-if="item.type === 'select'"
            >
              <label
                class="eve-select-form__from-lable"
                :style="{
                  width: `${getLabelWidth(item.labelWidth)}px`,
                  paddingLeft: `${item.labelPaddingLeft || labelPaddingLeft}px`,
                }"
                :class="[checkHidden(index)]"
              >
                <span
                  class="eve-select-form__asterisk"
                  v-if="checkAsterisk(item.prop, rules)"
                >
                  *
                </span>
                <span class="eve-select-form__label">{{ item.label }}</span>
                <span v-show="item.labelSuffix !== false">{{
                  item.labelSuffix || labelSuffix
                }}</span>
              </label>
              <el-form-item
                :prop="item.prop"
                class="eve-select-form__formItem"
                :style="{ width: `${getFormWidth(item.formWidth)}px` }"
                :class="[checkHidden(index)]"
              >
                <!--下拉菜单 -->
                <slot :name="item.prop" :row="item" :data="data">
                  <el-select
                    style="width: 100%"
                    v-model="model[item.prop]"
                    :placeholder="item.placeholder || '请选择'"
                    :clearable="
                      item.clearable !== undefined ? item.clearable : true
                    "
                    filterable
                    :multiple="item.multiple"
                    :collapse-tags="item.collapseTags"
                    :multiple-limit="item.multipleLimit || 0"
                    :disabled="item.disabled"
                    @clear="clear"
                  >
                    <el-option
                      v-for="(itemOption, index) in item.option"
                      :value="itemOption.value"
                      :key="index"
                      :label="itemOption.label"
                    ></el-option>
                  </el-select>
                </slot>
                <!-- 自定义表单错误提示 -->
                <template #error="scope">
                  <el-tooltip
                    :content="scope.error"
                    class="eve-select-form__error-tip"
                  >
                    <i class="el-icon-warning-outline"></i>
                  </el-tooltip>
                </template>
              </el-form-item>

              <section :class="[checkHidden(index)]">
                <slot name="select"></slot>
              </section>
              <section :class="[checkHidden(index)]">
                <slot :name="`select-${item.prop}`"></slot>
              </section>
            </section>

            <!--radio-->
            <section
              class="eve-select-form__flex-row-center"
              :key="`radio${index}`"
              v-if="item.type === 'radio'"
            >
              <label
                :style="{
                  width: `${getLabelWidth(item.labelWidth)}px`,
                  paddingLeft: `${item.labelPaddingLeft || labelPaddingLeft}px`,
                }"
                class="eve-select-form__from-lable"
                :class="[checkHidden(index)]"
              >
                <span
                  class="eve-select-form__asterisk"
                  v-if="checkAsterisk(item.prop, rules)"
                >
                  *
                </span>
                <span class="eve-select-form__label">{{ item.label }}</span>
                <span v-show="item.labelSuffix !== false">{{
                  item.labelSuffix || labelSuffix
                }}</span>
              </label>
              <el-form-item
                :prop="item.prop"
                :style="{ width: `${getFormWidth(item.formWidth)}px` }"
                class="eve-select-form__formItem"
                :class="[checkHidden(index)]"
              >
                <slot :name="item.prop" :row="item" :data="data">
                  <el-radio-group
                    v-model="model[item.prop]"
                    style="width: 100%"
                  >
                    <el-radio
                      :key="index"
                      :label="itemOption.value"
                      v-for="(itemOption, index) in item.option"
                      >{{ itemOption.label }}</el-radio
                    >
                  </el-radio-group>
                </slot>

                <!-- 自定义表单错误提示 -->
                <template #error="scope">
                  <el-tooltip
                    :content="scope.error"
                    class="eve-select-form__error-tip"
                  >
                    <i class="el-icon-warning-outline"></i>
                  </el-tooltip>
                </template>
              </el-form-item>

              <section :class="[checkHidden(index)]">
                <slot name="radio"></slot>
              </section>

              <section :class="[checkHidden(index)]">
                <slot :name="`radio-${item.prop}`"></slot>
              </section>
            </section>

            <!--checkbox-->
            <section
              class="eve-select-form__flex-row-center"
              :key="`checkbox${index}`"
              v-if="item.type === 'checkbox'"
            >
              <label
                :style="{
                  width: `${getLabelWidth(item.labelWidth)}px`,
                  paddingLeft: `${item.labelPaddingLeft || labelPaddingLeft}px`,
                }"
                class="eve-select-form__from-lable"
                :class="[checkHidden(index)]"
              >
                <span
                  class="eve-select-form__asterisk"
                  v-if="checkAsterisk(item.prop, rules)"
                >
                  *
                </span>
                <span class="eve-select-form__label">{{ item.label }}</span>
                <span v-show="item.labelSuffix !== false">{{
                  item.labelSuffix || labelSuffix
                }}</span>
              </label>
              <el-form-item
                :prop="item.prop"
                class="eve-select-form__formItem"
                :style="{ width: `${getFormWidth(item.formWidth)}px` }"
                :class="[checkHidden(index)]"
              >
                <slot :name="item.prop" :row="item" :data="data">
                  <el-checkbox-group
                    v-model="model[item.prop]"
                    style="width: 100%"
                  >
                    <el-checkbox
                      v-for="(itemOption, index) in item.option"
                      :key="`checkbox-option${index}`"
                      :label="itemOption.value"
                      :name="item.prop"
                      >{{ itemOption.label }}</el-checkbox
                    >
                  </el-checkbox-group>
                </slot>

                <!-- 自定义表单错误提示 -->
                <template #error="scope">
                  <el-tooltip
                    :content="scope.error"
                    class="eve-select-form__error-tip"
                  >
                    <i class="el-icon-warning-outline"></i>
                  </el-tooltip>
                </template>
              </el-form-item>

              <section :class="[checkHidden(index)]">
                <slot name="checkbox"></slot>
              </section>

              <section :class="[checkHidden(index)]">
                <slot :name="`checkbox-${item.prop}`"></slot>
              </section>
            </section>
          </template>

          <el-form-item
            :style="{ width: `${formWidth}px` }"
            class="eve-select-form__flex-row-center"
          >
            <slot> </slot>
            <!-- 自定义表单错误提示 -->
            <template #error="scope">
              <el-tooltip
                :content="scope.error"
                class="eve-select-form__error-tip"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </template>
          </el-form-item>
        </div>

        <!--按钮的值-->
        <el-form-item
          class="eve-select-form__form"
          :style="{ marginTop: marginTop + 'px' }"
        >
          <slot name="right-button">
            <div v-if="rightButtonData.length > 0">
              <template v-for="(item, index) in rightButtonData">
                <el-button
                  :type="item.buttonType"
                  v-if="
                    !item.type ||
                    item.type !== 'pack-up' ||
                    (item.type === 'pack-up' && isShowExpand)
                  "
                  :class="item.buttonClassName"
                  :key="`rightButtonData_${index}`"
                  @click="
                    rightButtonEvent({
                      index: index,
                      value: item.value,
                      type: item.type,
                    })
                  "
                >
                  <i :class="item.iconClassName"></i>
                  <span :class="item.valueClassName">{{ item.value }}</span>
                </el-button>
              </template>
            </div>
            <div v-else>
              <el-button
                type="primary"
                ref="search"
                @click="handleSubmit('formValidate')"
              >
                <span>查 询</span>
              </el-button>
              <el-button ref="reset" @click="handleReset('formValidate')">
                <span>重 置</span>
              </el-button>
              <span
                ref="packUp"
                class="eve-select-form__pack-up"
                @click="packUp"
                v-if="isShowExpand"
              >
                {{ isHidden ? '展开' : '收起' }}
              </span>
              <i
                v-if="isShowExpand"
                :class="[isHidden ? 'el-icon-arrow-down' : 'el-icon-arrow-up']"
              ></i>
            </div>
          </slot>
        </el-form-item>
      </section>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'EveSelectForm',
  props: {
    //  注意：prop不能一样，不然重复的那个不会显示
    data: {
      type: Array,
      default: () => [
        {
          label: '统一社会信用代码：',
          prop: 'name',
          type: 'input'
        },
        {
          label: '所属部门：',
          prop: 'department',
          type: 'select',
          option: [
            {
              label: '北京市',
              value: 'beijing'
            },
            {
              label: '上海市',
              value: 'shanghai'
            },
            {
              label: '深圳市',
              value: 'shenzhen'
            }
          ]
        },
        {
          label: '状态：',
          prop: 'status',
          type: 'checkbox',
          option: [
            {
              label: '北京市',
              value: 'beijing1'
            },
            {
              label: '上海市',
              value: 'shanghai2'
            },
            {
              label: '深圳市',
              value: 'shenzhen3'
            }
          ]
        },
        {
          label: '地址：',
          prop: 'address',
          type: 'radio',
          option: [
            {
              label: '北京市',
              value: 'beijing'
            },
            {
              label: '上海市',
              value: 'shanghai'
            },
            {
              label: '深圳市',
              value: 'shenzhen'
            }
          ]
        },
        {
          label: '日期：',
          prop: 'date',
          type: 'date'
          // pickerType: 'datetime', //类型可选为:date、datetime
          // valueFormat: 'yyyy-MM', //输出值的格式转换
          // format: 'yyyy-MM'//显示在输入框中的格式
        },
        {
          label: '时间：',
          prop: 'time',
          type: 'time',
          pickerOptions: { selectableRange: '15:30:00 - 20:30:00' }
          // valueFormat: 'mm:ss', //输出值的格式转换
          // format: 'mm:ss'// 显示在输入框中的格式
        }
      ]
    },

    // 表单双向绑定(prop)--点击查询按钮时获取值-重置验证时也要用到
    model: {
      type: Object,
      default: () => ({
        name: '',
        department: '',
        status: [], //checkbox是多选的时候，声明时一定要写成数组形式，否则会出现选一个全部勾选情况。
        address: '',
        date: '',
        time: ''
      })
    },

    // 规则验证--名字有变更之前是ruleValidate
    rules: {
      type: Object,
      default: () => ({
        // name: [
        //   {
        //     required: true,
        //     message: 'The name cannot be empty',
        //     trigger: 'blur'
        //   },
        //   {
        //     type: 'string',
        //     min: 20,
        //     message: 'Introduce no less than 20 words',
        //     trigger: 'blur'
        //   }
        // ],
        // department: [
        //   {
        //     required: true,
        //     message: "Please select the city",
        //     trigger: "change"
        //   }
        // ]
        // };
      })
    },

    // 所有右边表单的宽度--名字有变更之前是itemWidth
    formWidth: {
      type: [Number, String],
      default: 200 // 1093
    },

    // 所有左边label的宽度
    labelWidth: {
      type: [Number, String],
      default: 128 // 1093
    },

    // 当参数为空时是否过滤参数
    filterParam: {
      type: Boolean,
      default: true
    },

    // 是否开启自适应收缩展开
    adaptiveExpand: {
      type: Boolean,
      default: true
    },

    //当前组件的左偏移量,一般是指减去左边菜单栏的宽度和布局组件间距的距离--自适应收缩展开时用
    leftFormWidth: {
      type: [Number, String],
      default: 0
    },

    // 右边查询、重置等按钮的宽度,有用插槽、样式等方式改变了右边这个宽度需要手动设置且需加上按钮离最右边body的偏移量--自适应收缩展开时用
    rightButtonWidth: {
      type: [Number, String],
      default: 180
    },

    //右边按钮的数组--当前数组会覆盖默认的按钮，符合个性化的需求
    rightButtonData: {
      type: Array,
      default: () => []
    },

    //右边查询等按钮距离顶部的距离
    marginTop: {
      type: [Number, String],
      default: () => ''
    },

    //表单域标签的后缀
    labelSuffix: {
      type: [String, Boolean],
      default: () => ''
    },

    //表单域标签距离左边的距离
    labelPaddingLeft: {
      type: [Number, String],
      default: () => ''
    },

    //禁用样式，默认是灰色的样式
    disabledStyle: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      winWidth: '', // 当前内容区域的宽度
      num: '', //当前的个数
      isHidden: true // 是否隐藏表单--默认开启隐藏
    }
  },

  mounted () {
    window.addEventListener('resize', this.getWidth)
    this.getWidth()
  },

  methods: {
    /** @description 表单验证并传值
     *  @author yx
     *  @param  {String}  name 表单的ref名称
     */
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const model = this.filterParams(this.model)
          this.$emit('handle-submit', model)
        }
      })
    },

    /** @description 根据当前分辨率获取要显示的表单个数
     *  @author yx
     */
    getNum (param) {
      const left = this.$refs.formValidate
        ? this.offset(this.$refs.formValidate.$el).left
        : 275 //自动计算的左边的间距
      const {
        winWidth,
        formWidth,
        labelWidth,
        leftWidth = this.leftFormWidth !== 0 ? this.leftFormWidth : left,
        rightWidth = this.$refs.reset
          ? this.offset(this.$refs.reset.$el).right
          : 0 //自动计算的右边的间距
      } = param || {}
      // 250是左边导航的宽度  230:右边查询重置收起等按钮的宽度  288:formWidth 120:label   1366-250-200/408=2.24 Math.floor()
      return Math.floor(
        (winWidth - leftWidth - this.rightButtonWidth - rightWidth) /
        (formWidth + labelWidth)
      )
    },

    /**@description 获取距离body的偏移量
     * @author yx
     * @param  {String}  curEle 要获取偏移量的dom元素
     */
    offset (curEle) {
      const width =
        window.innerWidth ||
        document.body.clientWidth ||
        document.documentElement.clientWidth
      return {
        left: curEle.getBoundingClientRect().left,
        top: curEle.getBoundingClientRect().top,
        right: width - curEle.getBoundingClientRect().right
      }
    },

    /** @description 表单重置
     * @author yx
     * @param  {String}  name 表单的ref名称
     */
    handleReset (name) {
      // console.log(this.$refs[name])
      this.$refs[name].resetFields()
      this.clear()
      this.$emit('reset')
    },

    /** @description  展开或收起
     * @author yx
     */
    packUp () {
      this.isHidden = !this.isHidden
      this.$emit('pack-up', this.isHidden)
    },

    /** @description  获取当前内容区域的宽度
     * @author yx
     */
    getWidth () {
      let winWidth
      if (window.innerWidth) {
        winWidth = window.innerWidth
      } else if (document.body && document.body.clientWidth) {
        winWidth = document.body.clientWidth
      }
      const num = this.getNum({
        winWidth: winWidth,
        formWidth: this.formWidth,
        labelWidth: this.labelWidth
      })
      this.num = num > 1 ? num : 1
      this.isHidden = this.adaptiveExpand && this.data.length > this.num
      this.winWidth = winWidth
    },

    /** @description  根据filterParam判断是否过滤参数
     *  @author yx
     *  @param  {Object}  model //要过滤的对象
     */
    filterParams (model) {
      model = JSON.parse(JSON.stringify(model))
      Object.keys(model).some(item => {
        //数组情况清空null值
        // if (Array.isArray(model[item])) {
        //   model[item] = model[item].filter(item => item && item.trim())
        // }
        if (
          this.filterParam &&
          (!model[item] ||
            (Array.isArray(model[item]) && model[item].length === 0))
        ) {
          delete model[item]
        }
      })
      return model
    },

    /** @description  右边按钮事件
     * @author yx
     * @param  {Object}  param //事件回调
     */
    rightButtonEvent (param) {
      const { type, index, value } = param || {}
      const emitParam = {}
      const keyMap = {
        reset: () => {
          this.handleReset('formValidate')
          Object.assign(emitParam, {
            index: index,
            value: value
          })
        },
        'pack-up': () => {
          this.isHidden = !this.isHidden
          Object.assign(emitParam, {
            isHidden: this.isHidde
          })
        },
        search: () => {
          this.$refs.formValidate.validate(valid => {
            if (valid) {
              const model = this.filterParams(this.model)
              Object.assign(emitParam, model)
            }
          })
        },
        default: () => {
          Object.assign(emitParam, {
            index: index,
            value: value
          })
        }
      }
      keyMap[type] ? keyMap[type]() : keyMap.default()
      this.$emit('right-button-event', emitParam)
    },

    change (value) {
      if (Array.isArray(value)) {
        value = value.filter(item => item && item.trim())
      }
      if (!value || (Array.isArray(value) && value.length === 0)) {
        this.clear()
      }
    },

    //清空值
    clear () {
      this.$emit('clear', this.model)
    }
  },

  computed: {
    // 是否显示展开/收起按钮
    isShowExpand () {
      return this.adaptiveExpand && this.data.length > this.num
    },
    // 判断是否隐藏或显示输入框，select等表单  true隐藏 false显示
    checkHidden () {
      // 闭包传值
      return function (index) {
        return (index === this.num && this.isHidden) ||
          (index > this.num && this.isHidden)
          ? 'eve-select-form__display-none'
          : 'eve-select-form__display-block'
      }
    },
    //获取表单左边lable局部或全局的宽度--用户在局部有传labelWidth就使用局部的，局部覆盖全局
    getLabelWidth () {
      // 如果有局部的就用局部的宽，没有就用全局的，改变局部的宽可能对自适应收缩展开功能有一定影响
      return function (width) {
        return width || this.labelWidth
      }
    },

    //获取表单局部或全局的宽度--用户在局部有传formWidth就使用局部的，局部覆盖全局
    getFormWidth () {
      return function (width) {
        return width || this.formWidth
      }
    },

    //日期/时间 输出格式
    pickerFormat () {
      return function (valueFormat = '', pickerType = 'date', type) {
        if (valueFormat) {
          return valueFormat
        }
        if (type === 'time') {
          return 'HH:mm:ss'
        }
        const KeyMap = {
          datetime: () => {
            return 'yyyy-MM-dd HH:mm:ss'
          },

          daterange: () => {
            return 'yyyy-MM-dd'
          },

          date: () => {
            return 'yyyy-MM-dd'
          }
        }
        return KeyMap[pickerType] && KeyMap[pickerType]()
      }
    },

    //该字段是否必填,显示*号
    checkAsterisk () {
      return function (prop, rules) {
        let flag = false
        rules[prop] &&
          rules[prop].some(item => {
            if (item.required) {
              flag = true
              return true
            }
          })
        return flag
      }
    }
  }
}
</script>
<style lang="scss">
@import '@yaoxfly/eve-ui/src/assets/style/base.scss';
@import './select-form.scss';
</style>
