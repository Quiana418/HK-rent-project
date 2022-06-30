<template>
  <div>
    <van-nav-bar class="banner" title="收藏列表">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'Favorate',
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
</style>
