<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar
      class="Hear"
      title="黑马头条"
      left-arrow
      @click-left="onClickLeft"
    />
    <h3>{{ active.title }}</h3>

    <!-- 头像+关注 -->
    <van-row class="Toux-Guanz">
      <van-col span="4" class="Toux"
        ><img :src="active.aut_photo" alt=""
      /></van-col>
      <van-col span="1"></van-col>
      <van-col span="8" class="Id-Time">
        <span>{{ active.aut_name }}</span>
        <span class="timer">{{ timer }}</span>
      </van-col>
      <van-col span="6"></van-col>
      <van-col span="5" class="Anniu"
        ><van-button type="info" round
          ><van-icon name="plus" class="add" />关注</van-button
        ></van-col
      >
    </van-row>

    <!-- 正文 -->
    <div>
      <span v-html="active.content" class="ZhengWen"></span>
    </div>

    <!-- 底部评论 -->
  </div>
</template>

<script>
import { getDetailsActive } from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  data () {
    return {
      active: []
    }
  },
  created () {
    this.getDetailsActive()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    async getDetailsActive () {
      const res = await getDetailsActive(this.$route.params.detailsId)
      console.log(res)
      this.active = res.data.data
    }
  },
  computed: {
    timer () {
      const art = this.active
      const Timer = dayjs(art.pubdate).fromNow()
      return Timer
    }
  }
}
</script>

<style lang="less" scoped>
.Hear {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}

h3 {
  padding: 0 1rem 0 0.4rem;
  font-size: 0.6rem;
  color: #3a3a3a;
}

.Toux-Guanz {
  display: flex;
  padding: 0.15rem 0.35rem;
  .Toux {
    width: 1.15rem;
    height: 1.15rem;
    background-color: #ccc;
    border-radius: 50%;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .Id-Time {
    display: flex;
    flex-direction: column;
    font-size: 0.2rem;
    .timer {
      margin-top: 0.3rem;
    }
  }
  .Anniu {
    border-radius: 25%;
    margin-left: 0.4rem;

    .van-button--info {
      height: 0.8rem;
    }
    .van-button--normal {
      font-size: 0.28rem;
    }

    .add {
      margin-right: 0.1rem;
    }
  }
}

.ZhengWen {
  font-size: 0.32rem;
  margin: 0 0.3rem;
  white-space: wrap;
}
</style>
