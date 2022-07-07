<template>
  <div class="container">
    <van-nav-bar
      :title="houseList.community"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="pic">
      <img :src="`http://liufusong.top:8080${houseList.houseImg}`" alt="" />
    </div>

    <div class="houseInfo">
      <div class="title">{{ houseList.title }}</div>
      <div class="position">{{ houseList.tags && houseList.tags[0] }}</div>
      <div class="houseDesc">
        <div class="rent">
          <div class="top">
            <i>{{ houseList.price }}</i
            ><span>/月</span>
          </div>
          <div class="bottom">租金</div>
        </div>
        <div class="room">
          <div class="top">{{ houseList.roomType }}</div>
          <div class="bottom">房型</div>
        </div>
        <div class="area">
          <div class="top">{{ houseList.size }}平方米</div>
          <div class="bottom">面积</div>
        </div>
      </div>

      <div class="houseDecorate">
        <div class="same decorate">装修：<span>精装</span></div>
        <div class="same direction">
          朝向：<span>{{ houseList.oriented && houseList.oriented[0] }}</span>
        </div>
        <div class="same floor">
          楼层：<span>{{ houseList.floor }}</span>
        </div>
        <div class="same type">类型：<span>普通住宅</span></div>
      </div>
    </div>

    <div class="community">
      <div class="same">
        小区：<span>{{ houseList.community }}</span>
      </div>
    </div>

    <!-- 地图 -->
    <div class="map"></div>

    <!-- 房屋配套 -->
    <div class="furniture">
      <div class="houseTitle">房屋配套</div>
      <ul class="details">
        <li
          class="details_item"
          v-for="(item, index) in houseList.supporting"
          :key="index"
        >
          <i><van-icon name="send-gift-o" class="icon" /></i>
          <div class="item">
            {{ item }}
          </div>
        </li>
      </ul>
    </div>

    <!-- 房源概况 -->
    <div class="houseDt">
      <div class="houseTitle">房源概况</div>
      <div class="contact">
        <div class="up">
          <img src="" alt="" />
          <div class="person">
            <p>王女士</p>
            <div>
              <van-icon name="shield-o" />
              已认证房主
            </div>
          </div>
          <button>发消息</button>
        </div>
        <div class="down">
          {{ houseList.description }}
          <!-- 1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
          2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
          3.人车分流，环境优美。
          4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。 -->
        </div>
      </div>
    </div>

    <!-- 猜你喜欢 -->
    <div class="yourLike">
      <div class="houseTitle">猜你喜欢</div>
      <HouseList :cityList="recommendHouses"></HouseList>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="collect">
        <van-icon name="star-o" />
        <span>收藏</span>
      </div>
      <div class="consult">在线咨询</div>
      <div class="call">电话预约</div>
    </div>
  </div>
</template>

<script>
import HouseList from '@/components/HouseList.vue'
import { houseDetails } from '@/api/citylist'
export default {
  name: 'HouseDetails',
  // 路由传参
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    // 请求查询房屋的具体信息
    this.getHouseDetails()
  },
  data () {
    return {
      // 房屋详情
      houseList: {},
      recommendHouses: [
        {
          id: 1,
          houseImg: '/img/message/1.png',
          desc: '72.32㎡/南 北/低楼层',
          title: '安贞西里 3室1厅',
          price: 4500,
          tags: ['随时看房']
        },
        {
          id: 2,
          houseImg: '/img/message/2.png',
          desc: '83㎡/南/高楼层',
          title: '天居园 2室1厅',
          price: 7200,
          tags: ['近地铁']
        },
        {
          id: 3,
          houseImg: '/img/message/3.png',
          desc: '52㎡/西南/低楼层',
          title: '角门甲4号院 1室1厅',
          price: 4300,
          tags: ['集中供暖']
        }
      ]

    }
  },
  methods: {
    // 请求查询房屋的具体信息
    async getHouseDetails () {
      try {
        // 路由传参
        const res = await houseDetails(this.id)
        console.log(res)
        this.houseList = res.data.body
      } catch (err) {
        console.log('findHouse', err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    HouseList
  }
}
</script>

<style scoped lang='less'>
.container {
  // position: relative;
  overflow: auto;
  background: #f5f5f9 !important;
}
.pic {
  width: 100%;
  height: 252px;
  background-color: pink;
  img {
    width: 100%;
    height: 100%;
  }
}
.houseInfo {
  background-color: #fff;
  width: 100%;
  height: 267px;
  padding: 15px;
  .title {
    font-weight: normal;
    font-size: 16px;
    margin: 15px 0;
  }
  .position {
    width: 66px !important;
    height: 20px;
    color: #39becd;
    background-color: #e1f5f8;
    font-size: 12px;
    padding: 4px 5px;
    margin: 0 5px 0 0;
    text-align: center;
    line-height: 20px;
    border-radius: 3px;
  }
  .houseDesc {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 345px;
    height: 84px;
    margin: 13px 0;
    padding: 13px 0;
    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;
    .top {
      width: 110px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      font-weight: 800;
      color: #fa5741;
      font-size: 18px;
      span {
        font-size: 12px;
      }
    }
    .bottom {
      width: 110px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      color: #999;
      font-size: 14px;
    }
  }
  .houseDecorate {
    float: left;

    .same {
      float: left;
      color: #999;
      width: 168.5px;
      height: 26px;
      font-size: 13px;
      span {
        margin-left: 5px;
        color: #333;
      }
    }
  }
}
.community {
  margin-top: 10px;
  padding: 0px 11px 0;
  background-color: #fff;
  width: 353px;
  height: 44px;
  line-height: 44px;
  .same {
    float: left;
    color: #999;
    width: 168.5px;
    height: 26px;
    font-size: 13px;
    span {
      margin-left: 5px;
      color: #333;
    }
  }
}
.map {
  width: 100%;
  height: 145px;
  background-color: lightblue;
}
.furniture {
  padding: 0 10px;
  margin: 0 0 10px;
  width: 100%;
  // height: 146px;
  background-color: #fff;
  box-sizing: border-box;

  .details {
    display: flex;
    // flex: 1;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 355px;
    .details_item {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 20%;
      font-size: 14px;
      color: #333;
      width: 71px;
      height: 51px;
      margin: 8px 0;
      i {
        width: 23px !important;
        height: 23px !important;
        /deep/.icon {
          width: 23px !important;
          height: 23px !important;
        }
      }
      .item {
        margin-top: 10px;
      }
    }
  }
}
.houseTitle {
  background-color: #fff;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 15px 0;
  margin: 0 0 10px;
  font-weight: 600;
  font-size: 15px !important;
  border-bottom: 1px solid #cecece;
}
.houseDt {
  width: 100%;
  height: 270px;
  padding: 0 10px;
  background-color: #fff;
  box-sizing: border-box;
  .up {
    display: flex;
    width: 355px;
    height: 62px;
    background-color: #fff;
    img {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      margin: 10px 10px 0 0;
    }
    .person {
      margin-left: 10px;
      margin-top: 16px;
      p {
        font-size: 14px;
        color: #333;
        margin: 0 0 6px 0;
      }
      div {
        font-size: 12px;
        color: #fa5741;
      }
    }
    button {
      background-color: #fff;
      border: 1px solid #33be85;
      border-radius: 3px;
      font-size: 14px;
      width: 74px;
      height: 29px;
      margin-top: 17px;
      margin-left: 120px;
      text-align: center;
      line-height: 25px;
      color: #33be85;
    }
  }
  .down {
    margin-top: 15px;
    width: 355px;
    height: 132px;
    font-size: 14px;
    color: #333;
    padding: 10px 0;
  }
}
.yourLike {
  width: 100%;
  padding: 0 10px;
  background-color: #fff;
  box-sizing: border-box;
}
.footer {
  text-align: center;
  font-size: 17px;
  color: #999;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0;
  width: 375px;
  height: 50px;
  background-color: #fff;
  .call {
    width: 120px;
    height: 50px;
    line-height: 50px;
    background-color: #21b97a;
    color: #fff;
  }
  .collect {
    flex: 1;
  }
  .consult {
    flex: 1;
  }
}
</style>
