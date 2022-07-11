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
    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item title="区域">
          <van-picker :columns="areaList" value-key="label" />
          <van-row>
            <van-col span="8">
              <van-button block>取消</van-button>
            </van-col>
            <van-col span="16">
              <van-button type="primary" block>确定</van-button>
            </van-col>
          </van-row>
        </van-dropdown-item>
        <van-dropdown-item title="方式" ref="rentType1">
          <van-picker
            ref="rentType"
            :columns="rentTypeList"
            value-key="label"
            @change="getColumnValue"
          />
          <van-row>
            <van-col span="8">
              <van-button block @click="$refs.rentType1.toggle()"
                >取消</van-button
              >
            </van-col>
            <van-col span="16">
              <van-button type="primary" block @click="getColumnValue"
                >确定</van-button
              >
            </van-col>
          </van-row>
        </van-dropdown-item>
        <van-dropdown-item title="租金" ref="rentPrice1">
          <van-picker
            :columns="rentPriceList"
            value-key="label"
            @change="getColumnValue1"
          />
          <van-row>
            <van-col span="8">
              <van-button block @click="$refs.rentPrice1.toggle()"
                >取消</van-button
              >
            </van-col>
            <van-col span="16">
              <van-button type="primary" block @click="getColumnValue1"
                >确定</van-button
              >
            </van-col>
          </van-row>
        </van-dropdown-item>

        <van-dropdown-item title="筛选" @open="flag = true">
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>
    <van-popup
      position="right"
      style="height: 100%; width: 70%"
      v-model="flag"
    ></van-popup>

    <!-- 房屋列表展示 -->
    <HouseList :cityList="cityList"></HouseList>
  </div>
</template>

<script>
import { getHousesQueryCondition, queryHouses } from '@/api/houses'
import HouseList from '@/components/HouseList.vue'
import { cityList } from '@/api/citylist'
import { mapState } from 'vuex'
export default {
  name: 'FindHouse',
  // 获取房屋查询条件
  async created () {
    // 调用请求 找房中的城市信息
    this.getCityList()
    try {
      const res = await getHousesQueryCondition(this.currentCity.value)
      // console.log(res)
      this.rentTypeList = res.data.body.rentType
      this.rentPriceList = res.data.body.price
      // 区域内的数据 需要进行处理
      // 级联选择的数据嵌套深度需要保持一致，如果部分选项没有子选项，可以使用空字符串进行占位
      res.data.body.area.children[0].children = [{ label: '' }]
      res.data.body.subway.children[0].children = [{ label: '' }]
      this.areaList = [res.data.body.area, res.data.body.subway]
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      // rentType 查询条件
      rentTypeList: [],
      // 租金查询条件
      rentPriceList: [],
      // 区域数据
      areaList: [],
      // 控制弹层
      show: false,
      showPopover: false,
      // 找房中请求回来的 每个城市对应的城市数据
      cityList: [],
      // 控制筛选弹出层是否弹出
      flag: false,
      // 请求传参数据
      dataObj:
      {
        rentType: '',
        price: '',
        area: '',
        subway: '',
        roomType: '',
        oriented: '',
        characteristic: '',
        floor: ''
      }

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
        // console.log(res)
        this.cityList = res.data.body.list
        // console.log(this.cityList)
      } catch (err) {
        console.log('findHouse', err)
      }
    },
    // 根据条件（合租方式）查询房屋
    // rentType: this.dataObj.rentType
    async renderHouseList () {
      try {
        const res = await queryHouses({
          start: 1,
          end: 20,
          cityId: this.currentCity.value,
          ...this.dataObj
        })
        // console.log(res)
        this.cityList = res.data.body.list
      } catch (err) {
        console.log(err)
      }
    },

    // 获取对应列中选中的值---方式
    // 根据 方式 查询房屋
    getColumnValue (ref, value) {
      // value是当前列中选中的值
      // console.log(value)
      this.$refs.rentType1.toggle()
      this.dataObj.rentType = value.value
      this.housesList = []
      this.renderHouseList()
    },
    // 根据 房租 查询房屋
    // 获取对应列中选中的值---租金
    getColumnValue1 (ref, value) {
      this.$refs.rentPrice1.toggle()
      this.dataObj.price = value.value
      this.housesList = []
      this.renderHouseList()
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
/deep/.van-dropdown-menu {
  width: 101%;
}
.van-popup {
  height: 300px;
}
/deep/.van-dropdown-menu__bar {
  height: 55px !important;
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
/* /deep/.van-dropdown-menu {
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
} */
</style>
