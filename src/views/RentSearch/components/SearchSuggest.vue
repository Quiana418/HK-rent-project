<template>
  <div class="container">
    <van-cell
      class="searchSuggest"
      v-for="(item, index) in suggestList"
      :key="index"
      @click="$router.push({ name: 'gorent', params: { housing: item } })"
    >
      {{ item.communityName }}
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getSearchList } from '@/api/search'
let timer = null
export default {
  name: 'SearchSuggest',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      // 搜索建议城市列表
      suggestList: []
    }
  },
  methods: {
    // 路由传参 点击实现跳转到发布房源
    // onClick (item) {
    //   console.log(item)
    //   this.$router.push({ path: '/gorent', params: { housing: item } })
    // }
  },
  computed: {
    ...mapState(['currentCity'])
  },
  watch: {
    // 监听表单内容的变化  请求搜索建议列表
    searchText: {
      immediate: true,
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSearchList({ name: newVal, id: this.currentCity.value })
            console.log(res)
            this.suggestList = res.data.body
          } catch (e) {
            console.log(e)
          }
        }, 600)
      }
    }
  },
  filters: {},
  components: {},
  beforeDestroy () {
    // 销毁定时器 避免内存泄漏
    clearTimeout(timer)
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 0 10px;
}
.searchSuggest {
  width: 355px;
  height: 51px;
  color: #333;
  font-size: 14px;
  padding: 0 0 0 2px;
  line-height: 51px;
  border-bottom: 1px solid #ddd !important;
}
</style>
