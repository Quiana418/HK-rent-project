<template>
  <div class="container">
    <!-- <van-loading size="24px">加载中...</van-loading> -->
    <van-nav-bar class="banner" title="城市列表" fixed>
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- 城市滚动栏 -->
    <van-index-bar :index-list="indexList" highlight-color="green">
      <div
        class="div"
        v-for="(val, index) in indexList"
        :key="index"
        :sticky="false"
      >
        <van-index-anchor :index="val">{{
          val === "#" ? "当前城市" : val === "热" ? "热门城市" : val
        }}</van-index-anchor>

        <van-cell
          v-for="(item, index) in cityList[val]"
          :key="index"
          :title="item.label"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { hotCityList, getCityList } from '@/api/citylist'

export default {
  name: 'CityList',
  created () {
    // 获取城市列表
    this.getCityLists()
    // 获取热门城市
    this.getHotCityList()
  },
  data () {
    return {
      indexList: ['#', '热'],
      // 请求城市列表需要的参数 哪一级城市
      level: 1,
      // 城市列表 请求回来的结果
      cityList: {},
      // 热门城市列表
      hotCityList: []
    }
  },
  methods: {
    // 获取城市列表
    async getCityLists () {
      try {
        const res = await getCityList(this.level)
        console.log(res)
        // this.cityList = res.data.body
        // 声明一个对象 存储左侧的索引字母 {A:[{},{}] , B[{},{}]}
        const FirstLetterList = {}
        // 遍历拿到的城市列表 item就是每一个请求回来的数组里面的每一项（对象）
        res.data.body.forEach(item => {
          // 获取每个城市的首字母
          const FirstLetter = item.short.substr(0, 1).toUpperCase()
          // 判断FirstLetterList里面是否有这个分类
          if (FirstLetterList[FirstLetter]) {
            // 如果有 直接往该分类中push数据
            FirstLetterList[FirstLetter].push(item)
          } else {
            // 如果没有，就赋值给他
            FirstLetterList[FirstLetter] = [item]
          }
        })
        console.log(FirstLetterList)
        this.cityList = { ...this.cityList, ...FirstLetterList }
        // 获取到FirstLetterList里面的所有属性A,B,C,,,,,并排序
        const cityListIndex = Object.keys(FirstLetterList).sort()
        // 把请求回来的索引排序的数组 追加进组件自带的indexList里 实现滚动切换
        this.indexList = [...this.indexList, ...cityListIndex]
      } catch (err) {
        console.log('CityList', err)
      }
    },
    // 获取热门城市
    async getHotCityList () {
      try {
        const res = await hotCityList()
        console.log(res)
        this.hotCityList = res.data.body
        this.cityList = { ...this.cityList, 热: [...this.hotCityList], '#': [{ label: '北京' }] }
      } catch (err) {
        console.log('CityList' + err)
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
.container {
  margin-top: 55px;
}
.van-nav-bar {
  margin-top: 0px;
}
/deep/.van-index-bar {
  .van-index-anchor {
    z-index: 0;
    font-size: 14px;
    color: #999 !important;
  }
  .van-cell__title {
    span {
      font-size: 16px;
    }
  }
  .van-index-bar__sidebar {
    // height: 90%;
    margin-top: 20px;
    .van-index-bar__index {
      margin-right: 10px;
      padding: 0;
      margin-bottom: 15px;
      font-size: 14px !important;
    }
  }
}
// .van-index-anchor--sticky {
//   position: relative;
//   position: unset;
// }
/deep/.van-index-bar__index--active {
  background-color: #21b97a !important;
  color: #fff !important;
  border-radius: 50%;
}
// /deep/.van-index-bar__sidebar span:nth-child(1) {
//   background-color: #21b97a !important;
//   color: #fff !important;
//   border-radius: 50%;
// }
</style>
