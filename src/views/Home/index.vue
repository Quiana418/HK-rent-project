<template>
  <div>
    <!-- 轮播图 -->
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in swiperPics" :key="index">
          <img v-lazy="item.imgSrc" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 顶部搜索框 -->
    <div class="search-box">
      <span @click="$router.push('/citylist')">北京</span>
      <i class="iconfont icon-arrow"></i>
      <img src="@/assets/fonts/triangle.png" alt="" />
      <span class="vertical-line"></span>
      <van-icon name="search" />
      <div class="map">
        <img src="@/assets/fonts/map.png" alt="" class="mapPic" />
      </div>
      <input
        readonly="readonly"
        type="text"
        class="search-input"
        placeholder="请输入小区或地址"
      />
    </div>

    <!-- 中间导航栏 -->
    <div class="middle-nav">
      <van-grid icon-size="60">
        <van-grid-item>
          <img src="@/assets/fonts/nav-1.png" alt="" />
          <div class="text">整租</div>
        </van-grid-item>
        <van-grid-item>
          <img src="@/assets/fonts/nav-2.png" alt="" />
          <div class="text">合租</div>
        </van-grid-item>
        <van-grid-item
          ><img src="@/assets/fonts/nav-3.png" alt="" />
          <div class="text">地图找房</div></van-grid-item
        >
        <van-grid-item>
          <img src="@/assets/fonts/nav-4.png" alt="" />
          <div class="text">去出租</div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 更多 -->
    <div class="more">
      <div class="up">
        <h4>租房小组</h4>
        <span>更多</span>
      </div>
      <div class="bottom">
        <van-grid :column-num="2" :gutter="10" direction="horizontal">
          <van-grid-item
            icon="photo-o"
            text="文字"
            v-for="(item, index) in rentGroupList"
            :key="index"
          >
            <van-image :src="`http://liufusong.top:8080${item.imgSrc}`" />
            <div class="info">
              <p>{{ item.title }}</p>
              <p>{{ item.desc }}</p>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { SwiperPic, rentGroups } from '@/api/home'
export default {
  name: 'Home',
  created () {
    // 调用请求轮播图的方法
    this.getSwiperPic()
    // 调用请求租房小组数据的方法
    this.getRentGroups()
  },
  data () {
    return {
      // 轮播图数据
      /* swiperPics: [
        'http://liufusong.top:8080/img/swiper/1.png',
        'http://liufusong.top:8080/img/swiper/2.png',
        'http://liufusong.top:8080/img/swiper/3.png'
      ] */
      // 轮播图数据
      swiperPics: [],
      // 租房小组数据
      rentGroupList: []
    }
  },
  methods: {
    // 请求轮播图的方法
    async getSwiperPic () {
      try {
        const res = await SwiperPic()
        console.log(res)
        this.swiperPics = res.data.body
        // eslint-disable-next-line no-return-assign
        this.swiperPics.map(item => item.imgSrc = 'http://liufusong.top:8080' + item.imgSrc)
      } catch (err) {
        console.log('home' + err)
      }
    },
    // 请求租房小组数据
    async getRentGroups () {
      try {
        const res = await rentGroups()
        console.log(res)
        this.rentGroupList = res.data.body
      } catch (err) {
        this.$toast('数据请求失败' + err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.swiper {
  width: 375px;
  height: 212px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.van-swipe-item {
  width: 375px;
  height: 212px;
}
.van-swipe-item img[data-v-1d9b105c] {
  height: 212px;
}
input {
  border: none;
  border-radius: 3px;
}
/deep/.search-box {
  position: absolute;
  top: 23px;
  left: 19px;
  width: 310px;
  height: 34px;
  padding: 5px 5px 5px 8px;
  img {
    position: absolute;
    left: 45px;
    top: 12px;
    width: 18px;
    height: 18px;
  }

  span {
    position: absolute;
    top: 5px;
    left: 20px;
    color: #333;
    font-size: 14px;
    line-height: 34px;
  }
  .vertical-line {
    position: absolute;
    left: 70px;
    top: 14px;
    width: 1px;
    height: 18px;
    background-color: #e5e5e5;
  }
  .van-icon-search {
    position: absolute;
    font-size: 15px;
    color: #a6a9ab;
    top: 15px;
    left: 75px;
  }
  .map {
    position: absolute;
    top: 6px;
    right: -25px;
    width: 25px;
    height: 25px;
    border: 3px solid #fff;
    border-radius: 50%;
    .mapPic {
      position: absolute;
      top: 3px;
      left: 3px;
      color: #fff !important;
    }
  }
}

/* 谷歌、苹果浏览器 */
::-webkit-input-placeholder {
  color: #9c9fa1;
  font-size: 14px;
}
/deep/input::-webkit-input-placeholder {
  position: relative;
  top: -2px;
  left: 80px;
}
.middle-nav {
  width: 100%;
  height: 123px;
  padding: 10px 0;
  .van-grid {
    height: 123px;
  }
  .van-grid-item {
    img {
      width: 60px;
      height: 60px;
      margin-bottom: 20px;
    }
    .text {
      font-size: 16px;
      color: #333333;
    }
    /deep/ .van-grid-item__content {
      padding: 0 !important;
    }
  }
}
.more {
  padding-left: 10px;
  padding-right: 10px;
  height: 190px;
  background-color: #f6f5f6;
  .up {
    font-size: 15px;
    display: flex;
    line-height: 13px;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0 0px 10px;
    span {
      color: #787d82;
    }
  }
  .bottom {
    width: 355px;
    height: 130px;
    .van-grid-item {
      .van-image {
        width: 50px;
        height: 50px;
        margin: 0 10px;
      }
      p {
        line-height: 4px;
        font-size: 14px;
        color: #333;
      }
      /deep/.van-grid-item__content {
        border-radius: 5px !important;
        height: 60px;
      }
    }
  }
}
</style>
