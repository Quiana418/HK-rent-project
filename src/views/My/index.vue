<template>
  <div>
    <!-- 已登陆 -->
    <div class="head head-login"></div>
    <div class="login login1" v-if="user && user.token">
      <div class="avatar">
        <!-- <img src="@/assets/images/avatar1.png" alt="" /> -->
        <img :src="`http://liufusong.top:8080${userInfo.avatar}`" alt="" />
      </div>
      <div class="username">{{ userInfo.nickname }}</div>
      <van-button type="primary" v-if="user && user.token" @click="logout"
        >退出</van-button
      >
      <p>编辑个人资料</p>
    </div>

    <!-- 未登陆 -->
    <div class="login" v-else>
      <div class="avatar">
        <img src="@/assets/images/avatar.png" alt="" />
      </div>
      <div class="username">游客</div>
      <van-button type="primary" @click="$router.push('login')"
        >去登录</van-button
      >
    </div>

    <van-grid class="my-grid" :border="true" column-num="3" clickable>
      <van-grid-item icon="like-o" text="我的收藏" to="/favorate" />
      <van-grid-item icon="wap-home-o" text="我的出租" to="/myrent" />
      <van-grid-item icon="clock-o" text="看房记录" />
      <van-grid-item icon="notes-o" text="成为房主" />
      <van-grid-item icon="user-o" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>
    <div class="join"><img src="@/assets/images/join.png" alt="" /></div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/login'
import { mapState } from 'vuex'
export default {
  name: 'My',
  created () {
    // 请求用户数据
    this.getUserInfos()
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    // 退出登录
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗' })
        // 确认退出之后 清清除token
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    },
    // 请求用户信息
    async getUserInfos () {
      try {
        // console.log(this.user.token)
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.body
      } catch (err) {
        console.log('my' + err)
      }
    }
  },
  computed: {
    // 获取
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.head {
  width: 375px;
  height: 191px;
  background: url("@/assets/images/bg.png") no-repeat;
  background-size: 100% 100%;
}
.head-notLogin {
  // width: 375px;
  // height: 375px;
  background: url("@/assets/images/avatar1.png") no-repeat;
  background-size: contain;
}
.login1 {
  p {
    font-size: 12px;
    color: #999;
  }
  /deep/.van-button {
    margin-top: 10px !important;
    width: 50px !important;
    height: 20px !important;
    font-size: 12px !important;
  }
  /deep/ .van-button__content {
    margin-left: -15px;
    width: 50px;
    height: 20px;
  }
}
.login {
  width: 278px;
  height: 165px;
  background-color: pink;
  position: absolute;
  background: #fff;
  bottom: 365px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px 3px #ddd;
  margin: 50px auto 0;
  padding: 0 20px;
  text-align: center;
  font-size: 13px;
  .avatar {
    position: relative;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    img {
      width: 100%;
    }
  }
  .username {
    margin-top: -20px;
  }
  .van-button {
    width: 75px;
    height: 30px;
    background-color: #21b97a;
    padding: 0 15px;
    font-size: 13px;
    line-height: 30px;
    border-radius: 5px;
    margin-top: 20px;
  }
}
.my-grid {
  margin-top: 120px;
}
.join {
  img {
    width: 94%;
    margin-top: 25px;
    margin-left: 10px;
  }
}
</style>
