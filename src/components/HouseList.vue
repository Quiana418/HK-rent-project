<template>
  <div>
    <!-- 列表展示 -->
    <!-- 点击房屋列表 跳转到房屋详情 -->
    <div
      class="list"
      v-for="(item, index) in cityList"
      :key="index"
      @click="
        $router.push({
          name: 'houseDetails',
          params: { id: item.houseCode },
        })
      "
    >
      <div class="img">
        <img :src="`http://liufusong.top:8080${item.houseImg}`" alt="" />
      </div>
      <div class="message">
        <h3 class="van-multi-ellipsis--l2">{{ item.title }}</h3>
        <p class="describe">{{ item.desc }}</p>
        <p class="position">{{ item.tags[0] }}</p>
        <p class="price">
          <span>{{ item.price }}</span>
          <span>元/月</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HouseList',
  props: {
    cityList: {
      type: Array,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
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
    img {
      width: 100%;
      height: 100%;
    }
  }
  .message {
    flex: 1;
    padding: 0 0 0 12px;
    line-height: 10px;
    h3 {
      font-size: 14px;
      line-height: 16px;
      margin: 0;
    }
    .describe {
      font-size: 13px;
      color: #afb2b3;
    }
    .position {
      width: 66px;
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
</style>
