<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round>
          <van-icon name="search" />
          搜索
        </van-button>
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <AtricleList :id="item.id"></AtricleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="PopUp"></span>
    </van-tabs>

    <EditChannelPopup
      ref="popup"
      :myChannels="myChannels"
      @delChannel="delChannel"
      @change-channel="changeChannel"
      @addMyChannel="addMyChannel"
    ></EditChannelPopup>
  </div>
</template>

<script>
import {
  getMyChannels,
  getMyChannelsLocal,
  setMyChannelsLocal,
  removeChannel,
  addChannel
} from '@/api'
import EditChannelPopup from './component/EditChannelPopup.vue'
import AtricleList from '@/views/Home/component/AtricleList.vue'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      myChannels: []
    }
  },
  components: {
    AtricleList,
    EditChannelPopup
  },

  created () {
    this.getMyChannels()
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },

  methods: {
    async getMyChannels () {
      try {
        // 如果为离线状态
        // 就使用本地存储
        if (!this.isLogin) {
          const myChannels = getMyChannelsLocal()
          if (myChannels) {
            this.myChannels = myChannels
          } else {
            // 如果没有数据就请求数据
            const { data } = await getMyChannels()
            this.myChannels = data.data.channels
          }
        } else {
          const { data } = await getMyChannels()
          this.myChannels = data.data.channels
        }
        // console.log(this.channel)
      } catch (error) {
        this.$toast.fail('数据请求失败，请重试')
      }
    },

    PopUp () {
      this.$refs.popup.isShow = true
    },
    async delChannel (id) {
      this.myChannels = this.myChannels.filter((ele) => ele.id !== id)
      // 如果为离线状态
      // 就把数据存储在本地
      if (!this.isLogin) {
        setMyChannelsLocal(this.myChannels)
      } else {
        try {
          await removeChannel(id)
        } catch (error) {
          return this.$toast.fail('删除用户频道失败')
        }
      }
      this.$toast.success('删除用户频道成功')
    },
    changeChannel (active) {
      this.active = active
    },
    async addMyChannel (channel) {
      this.myChannels.push(channel)
      // 如果为离线状态
      // 就把数据存储在本地
      if (!this.isLogin) {
        setMyChannelsLocal(this.myChannels)
      } else {
        try {
          await addChannel(channel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加用户频道失败')
        }
      }
      this.$toast.success('添加用户频道成功')
    }
  }
}
</script>

<style lang="less" scoped>
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  z-index: 99;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
:deep(.van-popup__close-icon--top-right) {
  top: 0.42667rem;
  left: 0.42667rem;
}
</style>
