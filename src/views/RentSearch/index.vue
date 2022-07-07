<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="searchText"
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
        @onSearch="onSearch"
        show-action
      />
    </form>
    <SearchSuggest
      v-if="searchText !== ''"
      :searchText="searchText"
    ></SearchSuggest>
  </div>
</template>

<script>
import SearchSuggest from './components/SearchSuggest.vue'
export default {
  name: 'RentSearch',
  created () { },
  data () {
    return {
      // 搜索框内容
      searchText: ''
    }
  },
  methods: {
    onCancel () {
      this.$router.back()
    },
    onSearch (keywords) {
      this.searchText = keywords
      this.$store.commit('searchSuggestList', keywords)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchSuggest }
}
</script>

<style scoped lang='less'>
.van-search {
  background-color: #f7f8fa;
  .van-cell {
    background-color: #fff;
    border-radius: 3px;
  }
}
</style>
