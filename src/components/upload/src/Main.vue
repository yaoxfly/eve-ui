
<!--
* @Author: yx
* @Description: 上传组件
* @Date: 2020-11-05
-->
<template>
  <div>
    <el-upload
      class="eve-upload"
      ref="upload"
      :class="isHideAdd && 'eve-upload__none'"
      :action="action"
      :multiple="multiple"
      :show-file-list="showFileList"
      :headers="headers"
      :data="data"
      :drag="drag"
      :name="name"
      :with-credentials="withCredentials"
      :accept="accept"
      :limit="limit"
      :list-type="listType"
      :file-list="fileLists"
      :on-exceed="handleOnExceed"
      :on-preview="handleOnPreview"
      :on-remove="handleOnRemove"
      :on-success="handleOnSuccess"
      :on-change="handleOnChange"
      :before-upload="handleBeforeUpload"
      :before-remove="handleBeforeRemove"
      :auto-upload="autoUpload"
      :disabled="disabled"
      v-bind="$attrs"
    >
      <slot>
        <!-- 单独上传一张图片 -->
        <section v-if="tempUploadType === 'picture'">
          <div v-if="imageUrl">
            <el-image
              fit="conver"
              :src="imageUrl"
              class="eve-upload__img"
              :preview-src-list="srcList"
            />
          </div>
          <i v-else class="el-icon-plus eve-upload__icon"></i>
        </section>

        <!-- 照片墙,多张图片 -->
        <section v-else-if="tempUploadType === 'picture-card'">
          <i class="el-icon-plus"></i>
        </section>

        <!-- 拖拽上传 -->
        <section v-else-if="tempUploadType === 'drag'">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </section>

        <!-- 其他文件类型 -->
        <el-button type="primary" v-else>点击上传</el-button>
      </slot>

      <template #tip>
        <div class="el-upload__tip">
          <!-- 提示说明文字 -->
          <slot name="tip"> {{ tip }} </slot>
        </div>
      </template>

      <!-- 触发文件选择框的内容 -->
      <template #trigger> <slot name="trigger"></slot> </template>
      <!-- 文件缩略图--自定义黑色框里的按钮 -->
      <template v-slot:file="{ file }">
        <slot name="file" :file="file"> </slot>
      </template>
    </el-upload>

    <!-- 预览-放大图用 -->
    <el-image
      ref="imagePreviewer"
      v-show="false"
      :src="dialog.imageUrl"
      :preview-src-list="srcList"
      fit="conver"
      lazy
      :z-index="zIndex"
    />
    <!-- <el-dialog
      :visible.sync="dialog.visible"
      title="预览"
      :append-to-body="appendToBody"
    >
      <img width="100%" :src="dialog.imageUrl" alt="" />
    </el-dialog> -->
  </div>
</template>

<script>


export default {
  name: 'EveUpload',
  inheritAttrs: false,
  props: {
    /*element-ui属性 */
    //必选参数，上传的地址
    action: {
      type: String,
      default: () => ''
    },

    //设置上传的请求头部
    headers: {
      type: Object,
      default: () => ({})
    },
    //是否支持多选
    multiple: {
      type: Boolean,
      default: () => true
    },

    //上传时附带的额外参数
    data: {
      type: Object,
      default: () => ({})
    },

    //上传的文件字段名
    name: {
      type: String,
      default: () => 'file'
    },
    //是否支持发送 cookie 凭证信息
    withCredentials: {
      type: Boolean,
      default: () => false
    },
    //是否显示已上传文件列表
    showFileList: {
      type: Boolean,
      default: () => true
    },
    //是否启用拖拽上传
    drag: {
      type: Boolean,
      default: () => false
    },
    //接受上传的文件类型--".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF";默认无限制
    accept: {
      type: String,
      default: () => ''
    },
    //点击文件列表中已上传的文件时的钩子
    onPreview: {
      type: Function,
      default: () => { }
    },
    //文件列表移除文件时的钩子
    onRemove: {
      type: Function,
      default: () => { }
    },
    //文件上传成功时的钩子
    onSuccess: {
      type: Function,
      default: () => { }
    },

    //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange: {
      type: Function,
      default: () => { }
    },

    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传，要去掉列表
    beforeUpload: {
      type: Function,
      default: () => true
    },

    //删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除
    beforeRemove: {
      type: Function,
      default: () => { }
    },

    //文件列表的类型(展示用) --text/picture/picture-card
    listType: {
      type: String,
      default: () => 'text'
    },

    //是否在选取文件后立即进行上传
    autoUpload: {
      type: Boolean,
      default: () => false
    },

    //最大允许上传个数 -- 0是无限制
    limit: {
      type: Number,
      default: 3
    },

    /* 文件超出个数限制时的钩子
     * @param  {Object}  file 文件详细信息
     * @param  {Array}  fileList 文件列表信息(被删除后剩余的列表信息)
    */
    onExceed: {
      type: Function,
      default: function () {
        return true
      }
    },

    //上传的文件列表
    fileList: {
      type: Array,
      default: () => []
    },

    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },

    // Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
    // appendToBody: {
    //   type: Boolean,
    //   default: () => false
    // },

    /* 自定义属性 */

    //提示说明文字
    tip: {
      type: String,
      default: '上传提示说明文字，可传属性也可用slot,slot名和属性名一样都是tip (例子：只能上传jpg/png文件，且不超过500kb)'
    },

    //上传类型 --text(按钮)/picture(单张图片)/picture-card(照片墙)/drag(拖拽上传的样式),当listType为picture-card时,当前值一定也要设置为picture-card，showFileList也要设置为true否则看不见已经添加的图片。
    uploadType: {
      type: String,
      default: 'text'
    },

    //是否开启图片预染功能
    preview: {
      type: Boolean,
      default: true
    },

    //设置图片预览的 z-index
    zIndex: {
      type: Number,
      default: 2000
    },

    //验证上传的文件是否有重复
    repeat: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      //上传成功后要回填的图片地址
      imageUrl: '',
      //文件列表(内部处理逻辑用)
      fileLists: [],
      //对话框
      dialog: {
        imageUrl: '', //图片地址
        visible: false //是否显示
      },
      permission: true, //是否允许上传
      tempUploadType: 'text' //上传类型(内部判断逻辑用)
    }
  },

  created () { },
  mounted () { },
  methods: {
    /** @description   点击文件列表中已上传的文件时的钩子(回调)
      * @author yx
      * @param  {Object}  file  文件详细信息
     */
    handleOnPreview (file) {
      //当文件列表类型为picture和picture-card的时候才开启预览功能
      if (this.preview && (this.listType === 'picture' || this.listType === 'picture-card')) {
        this.dialog.imageUrl = file.url
        // this.dialog.imageUrl && (this.dialog.visible = true)
        this.$refs.imagePreviewer.clickHandler()
      }
      this.onPreview(file)
    },

    /** @description   文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      * @author yx
      * @param  {Object}  file 文件详细信息
      * @param  {Array}  fileList 文件列表信息
     */
    handleOnChange (file, fileList) {
      const KeyMap = {
        //上传类型是单张图片的时候--显示图片
        picture: () => {
          this.fileLists = []
          this.imageUrl = URL.createObjectURL(file.raw)
          this.$emit('update:fileList', this.fileLists)
        },
        //上传类型是照片墙的时候
        'picture-card': () => {
          this.fileLists = fileList
          this.$emit('update:fileList', this.fileLists)
        }
      }
      this.repeat && this.filterRepeat(fileList) && this.$message.warning('文件名重复')
      KeyMap[this.tempUploadType] && KeyMap[this.tempUploadType]()
      this.onChange(file, fileList)
    },


    /** @description   文件上传成功时的钩子
      * @author yx
      * @param  {Object}  response 上传成功后的返回信息
      * @param  {Object}  file 文件详细信息
      * @param  {Array}  fileList 文件列表信息
     */
    handleOnSuccess (response, file, fileList) {
      this.onSuccess(response, file, fileList)
    },

    /** @description  文件列表移除文件时的钩子(回调)
       * @author yx
       * @param  {Object}  file 文件详细信息
       * @param  {Array}  fileList 文件列表信息(被删除后剩余的列表信息)
      */
    handleOnRemove (file, fileList) {
      this.fileLists = fileList
      this.$emit('update:fileList', this.fileLists)
      this.onRemove(file, fileList)
    },

    /** @description  文件超出个数限制时的钩子
        * @author yx
        * @param  {Object}  file 文件详细信息
        * @param  {Array}  fileList 文件列表信息(被删除后剩余的列表信息)
     */
    handleOnExceed (files, fileList) {
      this.onExceed(files, fileList) && this.$message.warning(`当前限制选择${this.limit}个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },

    /** @description  上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传，要去掉列表
       * @author yx
       * @param  {Object}  file 文件详细信息
     */
    handleBeforeUpload (file) {
      this.permission = this.beforeUpload(file)
      return this.permission
    },

    //删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除
    handleBeforeRemove (file, fileList) {
      const flag = this.beforeRemove(file, fileList)
      if (flag !== undefined) return flag
      if (this.permission) {
        return this.$confirm(`确定移除 ${file.name}?`, '', {
          closeOnClickModal: false,
          closeOnPressEscape: false,
        })
      }
    },

    /** @description 手动上传文件列表
        * @author yx
      */
    submit () {
      this.$refs.upload.submit()
    },

    /** @description 清空已上传的文件列表（该方法不支持在 before-upload 中调用）
         * @author yx
       */
    clearFiles () {
      this.$refs.upload.clearFiles()
    },

    /** @description 取消上传请求 , file: fileList 中的 file 对象
       * @author yx
     */
    abort (file) {
      this.$refs.upload.abort(file)
    },

    /** @description 过滤重名的文件
      * @param  {Array}  fileList 文件列表
      * @author yx
     */
    filterRepeat (fileList) {
      const obj = {}
      let flag = false
      fileList.some(item => {
        if (obj[item.name]) {
          flag = true
          return
        } else {
          Object.assign(obj, {
            [item.name]: item.name
          })
        }
      })
      return flag
    }
  },

  computed: {
    //当uploadType类型是picture-card的时候, 超过限制张数，隐藏新增按钮,注意:要对fileLists赋值才会监听到
    isHideAdd () {
      return (this.limit !== 0 && this.fileLists.length >= this.limit) || this.disabled
    },
    //路径列表
    srcList () {
      return this.fileLists.filter(item => item.url).map(item => item.url)
    }
  },

  watch: {
    //文件列表
    fileList: {
      handler (newValue) {
        this.fileLists = newValue
        this.$emit('update:fileList', this.fileLists)
      },
      immediate: true
    },

    //上传类型
    uploadType: {
      handler (newValue) {
        this.tempUploadType = newValue
      },
      immediate: true
    },

    //文件列表的类型
    listType: {
      handler (newValue) {
        newValue === 'picture-card' && (this.tempUploadType = newValue)
      },
      immediate: true
    },

    //拖拽
    drag: {
      handler (newValue) {
        this.drag && (this.tempUploadType = 'drag')
        console.log(this.tempUploadType)
      },
      immediate: true
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep .eve-upload__none {
  .el-upload--picture-card i {
    display: none;
  }
  .el-upload {
    display: none;
  }
}
::v-deep .el-button {
  padding: 9px 15px;
}
::v-deep .el-icon-close-tip {
  display: none !important;
}
::v-deep .el-upload-list__item-name {
  cursor: pointer;
}
</style>

<style lang="scss">
@import '@yaoxfly/eve-ui/src/assets/style/base.scss';
@import './upload.scss';
</style>
