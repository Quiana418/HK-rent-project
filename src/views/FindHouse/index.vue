<template>
  <div class="container">
    <!-- 顶部搜索框 -->
    <div class="search-box">
      <van-icon name="arrow-left" class="triangle" />
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

    <!-- 顶部导航 -->
    <van-dropdown-menu>
      <van-dropdown-item title="区域">
        <van-picker show-toolbar :columns="columns" toolbar-position="bottom" />
      </van-dropdown-item>
      <van-dropdown-item title="方式">
        <van-picker
          show-toolbar
          :columns="columns1"
          toolbar-position="bottom"
        />
      </van-dropdown-item>
      <van-dropdown-item title="租金">
        <van-picker
          show-toolbar
          :columns="columns2"
          toolbar-position="bottom"
        />
      </van-dropdown-item>
      <van-dropdown-item title="筛选">
        <van-picker show-toolbar :columns="columns" toolbar-position="bottom" />
      </van-dropdown-item>
    </van-dropdown-menu>

    <!-- 列表展示 -->
    <div class="list">
      <div class="img"></div>
      <div class="message">
        <h3>我是标题</h3>
        <p class="describe">二室/100/西/南浦滨海花园</p>
        <p class="position">近地铁</p>
        <p class="price">
          <span>1234</span>
          <span>元/月</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FindHouse',
  created () { },
  data () {
    return {
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      columns1: ['不限', '整租', '合租'],
      columns2: ['不限', '1000及以下', '1000-2000', '2000-3000', '3000-4000', '4000-5000', '5000-7000', '7000以上']
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  margin-top: 50px;
}
.search-input {
  margin-left: -30px;
  margin-top: 5px;
  height: 34px;
  border: none;
  border-radius: 3px;
}
/deep/.search-box {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  text-align: center;
  padding: 5px 5px 0px 8px;
  background-color: #21b97a;
  .triangle {
    position: absolute;
    top: 17px;
    left: 5px;
    color: #fff;
  }
  img {
    position: absolute;
    left: 68px;
    top: 18px;
    width: 18px;
    height: 18px;
  }
  span {
    position: absolute;
    top: 12px;
    left: 40px;
    color: #333;
    font-size: 14px;
    line-height: 34px;
  }
  .vertical-line {
    position: absolute;
    left: 90px;
    top: 18px;
    width: 1px;
    height: 18px;
    background-color: #e5e5e5;
  }
  .van-icon-search {
    position: absolute;
    font-size: 15px;
    color: #a6a9ab;
    top: 22px;
    left: 98px;
  }
  .map {
    position: absolute;
    top: 12px;
    right: 30px;
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
.nav {
  border-bottom: 1px solid #e5e5e5 !important;
  display: flex;
  justify-content: space-between;
  img {
    position: absolute;
    left: 68px;
    top: 68px;
    width: 18px;
    height: 18px;
  }
}
/deep/.van-popup {
  height: 300px !important;
}
.list {
  display: flex;
  padding: 10px 0 0;
  width: 100%;
  height: 120px;
  margin-left: 10px;
  border-bottom: 1px solid #e5e5e5;
  .img {
    width: 106px;
    height: 80px;
    background-color: green;
    margin-top: 15px;
  }
  .message {
    flex: 1;
    padding: 0 0 0 12px;
    line-height: 10px;
    h3 {
      font-size: 16px;
    }
    .describe {
      font-size: 13px;
      color: #afb2b3;
    }
    .position {
      width: 46px;
      height: 20px;
      margin-top: -5px;
      text-align: center;
      border-radius: 3px;
      line-height: 20px;
      background: #e1f5f8;
      font-size: 13px;
      color: #39becd;
    }
    /deep/.price {
      margin: -3px;
      & span:nth-child(1) {
        font-size: 16px;
        color: #fa5741;
        font-weight: 800;
      }
      & span:nth-child(2) {
        font-size: 12px;
        color: #fa5741;
      }
    }
  }
}
/deep/.van-picker__toolbar {
  height: 50px;
  background-color: #fff;
  font-size: 18px !important;
  line-height: 60px;
  text-align: center;
  margin-top: -15px;
  border-top: 1px solid #e3e3e3;
  .van-picker__cancel {
    color: #21b97a;
    width: 125px;
  }
  .van-picker__confirm {
    width: 250px;
    color: #fff;
    background-color: #21b97a;
  }
  .van-picker__cancel,
  .van-picker__confirm {
    font-size: 18px;
    z-index: 2;
  }
  /deep/.van-picker-column {
    width: 254px !important;
  }
}
</style>
