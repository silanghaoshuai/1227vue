<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 去node_modules文件中找swiper文件夹, 根据package.json的main来确定要加载模块
  import Swiper from 'swiper' 
  export default {
    name: 'Carousel',   
    props: { // 声明接收属性数据
      carouselList: Array
    },
    mounted () { 
      if (this.carouselList.length>0) { // 必须判断  数据列表已经显示了如果发生改变创建swiper对象
        this.initSwiper()
      }
    },
    watch: {
      // banners通过此方式创建的swiper
      carouselList(value) { 
        console.log('watch carouselList', value.length)
        // 如果有数据才去创建延迟swiper
        if (value.length>0) {
          // 指定的回调函数什么时候执行: 这次数据更新导致的界面更新完成后立即执行
          this.$nextTick(() => {
            this.initSwiper()
          })
        }
      }
    },

    methods: {
      /* 
      创建swiper实例对象: 必须在列表数据显示之后创建才有正常轮播效果否则数据未加载完成导致无法显示
      */
      initSwiper() {
        new Swiper(this.$refs.swiper, {
          loop: true, // 循环模式
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>