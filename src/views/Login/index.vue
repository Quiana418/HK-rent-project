<template>
  <div>
    <van-nav-bar class="banner" title="账号登录">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        type="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '账号不能为空' }]"
      />
      <van-field
        v-model.trim="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请输入密码' },
          { pattern: /^\d{6}$/, message: '密码长度必须为6位数' },
        ]"
      />
      <van-button
        class="login-btn"
        type="info"
        native-type="submit"
        @click="loginFn"
        >登录</van-button
      >
    </van-form>

    <p @click="$router.push('/register')" class="register">
      还没有账号，去注册~
    </p>
  </div>
</template>

<script>
import { Login } from '@/api/login'
export default {
  name: 'Login',
  created () {
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        console.log('submit', values)
        const res = await Login(values)
        console.log(res)
        // console.log(res.data.body)
        // 登录成功后 把用户登录信息通过vuex存储
        this.$store.commit('setUser', res.data.body)
        // this.$router.push({ name: 'my' })
        this.$router.push('/my')
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },

    loginFn () {

    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.banner {
  margin-bottom: 16px;
}

.van-cell {
  height: 70px !important;
}
.van-field__control {
  margin-top: 18px;
}

/deep/.login-btn {
  width: 345px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  color: #fff;
  margin-top: 32px;
  margin-left: 15px;
  background-color: #1cb676;
  border: 1px solid #1cb676;
}
.register {
  margin-left: 14px;
  margin-top: 30px;
  font-size: 14px;
  color: #666;
}
</style>
