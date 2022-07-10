<template>
  <div>
    <van-nav-bar class="banner" title="房屋管理">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>

    <div class="null" v-if="publishedHouseList.length === 0">
      您还没有房源发布，去<span>发布房源</span>吧~
    </div>
    <HouseList :cityList="publishedHouseList" v-else></HouseList>
  </div>
</template>

<script>
import HouseList from '@/components/HouseList.vue'
import { checkPublishedHouse } from '@/api/publishedHouse'
export default {
  name: 'MyRent',
  async created () {
    try {
      const res = await checkPublishedHouse()
      console.log(res)
      this.publishedHouseList = res.data.body
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      // 已发布的房源
      publishedHouseList: []
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {
    HouseList
  }
}
</script>

<style scoped lang='less'>
.null {
  margin-top: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  span {
    color: #33b985;
  }
}
</style>
