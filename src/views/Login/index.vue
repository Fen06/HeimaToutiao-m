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
    <van-form @submit="login" class="from" ref="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="mobileRule"
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
        :rules="codeRule"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <!-- 验证码倒计时 -->
          <van-count-down
            :time="3 * 1000"
            v-if="isShow"
            @finish="isShow = false"
          />
          <van-button
            class="cobe-btn"
            size="mini"
            round
            v-else
            native-type="button"
            @click="sendCode"
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
import { login, sendCode } from '@/api/user'
import { mobileRule, codeRule } from './rules'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: '',
      codeRule,
      mobileRule,
      isShow: false
    }
  },

  methods: {
    base () {
      this.$router.go(-1)
    },

    async login () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // 储存token
        this.$store.commit('setuser', res.data.data)
        this.$router.push('/priect')
        // console.log(res)
        this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)
        const status = error.response.status
        let message = '登录错误,请刷新'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    // 验证码
    async sendCode () {
      try {
        await this.$refs.from.validate('mobile')
        await sendCode(this.mobile)
        this.isShow = true
      } catch (error) {
        if (!error.response) {
          this.$toast.fail('号码有误')
        } else {
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
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
