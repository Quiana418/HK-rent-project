<template>
  <div>
    <van-nav-bar class="banner" title="收藏列表">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <HouseList :cityList="collectedList"></HouseList>
  </div>
</template>

<script>
import HouseList from '@/components/HouseList.vue'
import { checkCollectList } from '@/api/favorites'
import { mapState } from 'vuex'
export default {
  name: 'Favorite',
  // 查看收藏列表
  async created () {
    if (this.user.token) {
      try {
        const res = await checkCollectList()
        // console.log(res)
        this.collectedList = res.data.body
      } catch (err) {
        console.log(err)
      }
    } else {
      // 如果未登录，跳转到登录页面
      this.$dialog.confirm({
        title: '好客租房',
        message: '您还未登录，是否跳转到登录页面？',
        confirmButtonColor: '#108ee9'
      })
        .then(() => {
          this.$router.push('/login')
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  data () {
    return {
      // 房屋收藏列表
      collectedList: []
    }
  },
  methods: {},
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: { HouseList }
}
</script>

<style scoped lang='less'>
</style>
