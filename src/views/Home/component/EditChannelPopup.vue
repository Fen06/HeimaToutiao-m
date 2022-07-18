<template>
  <div>
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '90%' }"
      closeable
    >
      <div class="popupMain">
        <!-- 我的频道 -->
        <div class="my-channel">
          <van-cell title="我的频道">
            <van-button size="small" round class="edit-btn"> 编辑 </van-button>
          </van-cell>

          <van-grid gutter="10px" :border="false">
            <van-grid-item
              v-for="item in myChannels"
              :key="item.id"
              :text="item.name"
            >
              <template #icon>
                <van-icon name="cross" />
              </template>
            </van-grid-item>
          </van-grid>
        </div>
        <!-- 推荐频道 -->
        <div class="recommend-channel">
          <van-cell title="推荐频道"></van-cell>
          <van-grid gutter="10px" :border="false">
            <van-grid-item
              v-for="item in allChannels"
              :key="item.id"
              :text="item.name"
              icon="plus"
            ></van-grid-item>
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannels } from '@/api'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getAllChannels()
  },
  data () {
    return {
      isShow: true,
      allChannels: []
    }
  },

  methods: {
    async getAllChannels () {
      const { data } = await getAllChannels()
      console.log(data)
      this.allChannels = data.data.channels
    }
  },

  computed: {
    recommendChannel () {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((ele) => ele.id === item.id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.popupMain {
  margin-top: 1.3rem;
  .edit-btn {
    color: red;
    padding: 0 0.426rem;
    height: 0.65rem;
    border: 0.03rem solid red;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      background-color: #f4f5f6;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 24px;
          width: 24px;
          height: 24px;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
        }
      }
    }
  }

  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      background-color: #f4f5f6;
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
