<template>
  <div class="container">
    <!-- 顶部搜索框 -->
    <div class="search-box">
      <van-icon name="arrow-left" class="triangle" @click="$router.back()" />
      <span @click="$router.push('/citylist')">{{
        currentCity.label || "北京"
      }}</span>
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
      <!--
      <van-dropdown-item title="筛选">
        <van-picker show-toolbar toolbar-position="bottom" />
      </van-dropdown-item> -->

      <van-dropdown-item title="筛选" class="last">
        <van-picker toolbar-position="bottom" />
      </van-dropdown-item>
    </van-dropdown-menu>

    <!-- 房屋列表展示 -->
    <HouseList :cityList="cityList"></HouseList>
  </div>
</template>

<script>
import HouseList from '@/components/HouseList.vue'
import { cityList } from '@/api/citylist'
import { mapState } from 'vuex'
export default {
  name: 'FindHouse',
  created () {
    // 调用请求 找房中的城市信息
    this.getCityList()
  },
  data () {
    return {
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      columns1: ['不限', '整租', '合租'],
      columns2: ['不限', '1000及以下', '1000-2000', '2000-3000', '3000-4000', '4000-5000', '5000-7000', '7000以上'],
      show: false,
      showPopover: false,
      // 找房中请求回来的 每个城市对应的城市数据
      cityList: []
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    // 请求 找房中的每个城市对应的城市信息
    async getCityList () {
      try {
        const res = await cityList(this.currentCity.value)
        console.log(res)
        this.cityList = res.data.body.list
      } catch (err) {
        console.log('findHouse', err)
      }
    }

  },
  computed: {
    ...mapState(['currentCity'])
  },
  watch: {},
  filters: {},
  components: { HouseList }
}
</script>

<style scoped lang='less'>
.container {
  margin-top: 50px;
  overflow: hidden;
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
.van-dropdown-menu {
  width: 101%;
}
/deep/.van-popup {
  height: 300px !important;
}

/deep/.van-picker__toolbar {
  height: 1.8rem;
  background-color: #fff;
  font-size: 18px !important;
  line-height: 60px;
  text-align: center;
  margin-top: -0.7rem;
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
/deep/.van-dropdown-menu__bar--opened {
  z-index: 10 !important;
}
/deep/.van-dropdown-menu {
  .last {
    .van-dropdown-item__content {
      position: absolute !important;
      top: 0;
      left: 1.99rem !important;
      width: 80% !important;
      height: 100% !important;
      max-height: unset;
    }
    // .van-picker {
    //   height: 667px !important;
    //   position: absolute;
    //   top: 0;
    // }
    .van-dropdown-item--down {
      position: fixed !important;
      top: 0px !important;
    }
  }
}
</style>
