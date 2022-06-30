<template>
  <div>
    <!-- 二级路由占位符 -->
    <router-view class="main" />

    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/findhouse" icon="search"
        >找房</van-tabbar-item
      >
      <van-tabbar-item replace to="/information" icon="newspaper-o"
        >资讯</van-tabbar-item
      >

      <van-tabbar-item replace to="/my" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  created () { },
  data () {
    return {
      active: 0
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
.main {
  margin-bottom: 50px;
}
.van-tabbar {
  z-index: 1 !important;
}
</style>
