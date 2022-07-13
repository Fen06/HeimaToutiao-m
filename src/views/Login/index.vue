<template>
  <div>
    <!-- 头部区域 -->
    <van-nav-bar class="navbar" title="登录" @click-left="base">
      <!-- @click-left="onClickLeft" -->
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 头部区域 -->
    <!-- 表单区域 -->
    <van-form @submit="login" class="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button class="cobe-btn" size="mini" round
            >发送验证码</van-button
          ></template
        >
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// import request from '@/utils'
// import { Toast } from 'vant'
import { login } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: ''
    }
  },

  methods: {
    base () {
      this.$router.base()
    },

    async login () {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}

.from {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }

  .toutiao {
    font-size: 0.46333rem;
  }
  .cobe-btn {
    padding: 0 0.33333rem;
    color: #666;
  }
}
</style>
