<!--
* @Author: yx
* @Description: 横向滚动--菜单
* @Date: 2020-10-26
-->
<template>
  <div class="eve-scroll" ref="eveScroll">
    <el-menu
      :default-active="defaultActive"
      mode="horizontal"
      @select="(index, indexPath) => select(index, indexPath, data)"
      class="eve-scroll__menu"
      :class="[className, bottomBorder || 'eve-scroll__border-none']"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      :style="{ width: width }"
    >
      <swiper
        ref="mySwiper"
        :options="swiperOptions"
        class="eve-scroll__swiper"
        v-if="scroll"
      >
        <slot>
          <template v-for="(item, index) in data">
            <swiper-slide
              :key="item[tempConfig.path]"
              class="eve-scroll__content"
            >
              <slot name="content" :row="item" :index="index" :data="data">
                <menu-item :menu-data="item"></menu-item>
              </slot>
            </swiper-slide>
          </template>
        </slot>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        <div
          v-show="showPoint"
          class="swiper-button-prev"
          :class="swiperButtonColor"
          slot="button-prev"
          @click="prev"
        ></div>
        <div
          v-show="showPoint"
          class="swiper-button-next"
          :class="swiperButtonColor"
          slot="button-next"
          @click="next"
        ></div>
        <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
      </swiper>

      <div class="eve-scroll__item" v-else>
        <template v-for="item in data">
          <div :key="item[tempConfig.path]">
            <menu-item :menu-data="item"></menu-item>
          </div>
        </template>
      </div>
    </el-menu>
  </div>
</template>
<script>

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import MenuItem from '@yaoxfly/eve-ui/src/components/menu/src/MenuItem.vue'
import mixins from './mixins' // 参数和方法
export default {
  name: 'EveScroll',
  mixins: [mixins],
  inject: {
    className: {
      default: 'eve-scroll__menu-item'
    }
  },
  props: {
    // 配置菜单的text、path、children等key值--支持只修改某个key值,其他配置默认
    config: {
      type: Object,
      default: () => ({
        text: 'text', //文本
        path: 'path', // 路径
        children: 'children' //树结构数据的孩子节点
      })
    },
  },
  provide () {
    return {
      //传一个类名用来改样式，以防全局污染样式
      className: this.className,
      config: this.tempConfig
    }
  },
  components: {
    MenuItem,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    },
    showPoint () {
      return this.data.length > this.swiperOptions.slidesPerView
    }
  },
  data () {
    return {
      //滚动
      swiperOptions: {
        spaceBetween: 0,
        //分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: false //允许分页点击跳转
        },
        //左右箭头
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // 滚动条
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        //显示的个数
        slidesPerView: this.slidesPerView
      },
      //key默认配置--配置菜单、面包屑数据的text、path、children等key值(内部用可被config覆盖)
      tempConfig: {
        text: 'text', //文本
        path: 'path', // 路径
        children: 'children' //树结构数据的孩子节点
      },
    }
  },
  watch: {
    config: {
      handler (val) {
        Object.assign(this.tempConfig, val)
        // console.log(111, this.tempConfig, val)
      },
      immediate: true,
    },
  },



}
</script>

<style lang="scss" >
@import '@yaoxfly/eve-ui/src/assets/style/base.scss';
@import './scroll.scss';
</style>






