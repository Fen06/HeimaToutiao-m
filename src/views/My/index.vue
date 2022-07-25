<template>
  <div class="my">
    <!-- 头部 用户信息区域 -->
    <header>
      <div v-if="isLogin" class="user-info banner">
        <van-row></van-row>
        <!-- 用户信息 -->
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userinfo.photo"
              />
              <span class="mobile">{{ userinfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <router-link to="/user">
                <van-button class="code-btn">编辑资料</van-button></router-link
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid :border="false" class="grid">
            <van-grid-item text="头条">
              <template #icon> {{ userinfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon> {{ userinfo.fans_count }} </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon> {{ userinfo.follow_count }} </template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon> {{ userinfo.like_count }} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div v-else class="login-register banner">
        <div class="warp" @click="goLogin">
          <img src="../../assets/images/mobile.png" alt="" />
          <span>登录/注册</span>
        </div>
      </div>
    </header>
    <!-- 主题区域 -->
    <main>
      <!-- 消息通知/小智同学 -->
      <div>
        <van-grid column-num="2" class="grid" clickable>
          <van-grid-item text="收藏">
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
            </template>
          </van-grid-item>
          <van-grid-item text="历史">
            <template #icon>
              <span class="toutiao toutiao-lishi"></span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>

      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>

    <van-button
      v-if="isLogin"
      block
      class="login-btn"
      hairline
      @click="loginout"
    >
      退出登录
    </van-button>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
import { Dialog } from 'vant'
export default {
  data () {
    return {
      userinfo: {}
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  created () {
    this.getUserInfo()
  },

  methods: {
    async getUserInfo () {
      if (this.isLogin) {
        try {
          const {
            data: { data }
          } = await getUserInfo()
          this.userinfo = data
          console.log(this.userinfo)
        } catch (error) {
          this.$toast.fail('登录失败，请重试')
          this.$router.push('/login')
        }
      }
    },
    goLogin () {
      this.$router.push('/login')
    },
    loginout () {
      Dialog.confirm({
        title: '黑马头条',
        message: '是否确定退出该账号'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setuser', {})
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/banner.png');
}

.user-info {
  display: flex;
  flex-direction: column;

  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }

  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}

.login-register {
  display: flex;
  align-items: center;
  justify-content: center;
  .warp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 40%;
    }
    span {
      font-size: 0.4rem;
      color: #fff;
      margin-top: 0.25rem;
    }
  }
}

// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
  .link {
    margin-top: 0.3rem;
  }
}

.login-btn {
  margin-top: 0.18rem;
  :deep(.van-button__text) {
    color: red;
  }
}
</style>
