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
      <!-- 未关注 -->
      <van-col span="5" class="Anniu">
        <van-button
          v-if="active.is_followed === false"
          type="info"
          round
          @click="AddGuanZ"
        >
          <van-icon name="plus" class="add">关注</van-icon>
        </van-button>

        <van-button
          v-if="active.is_followed"
          type="info"
          round
          @click="NoGuanz"
          class="noguanz"
        >
          取消关注
        </van-button>
      </van-col>
    </van-row>

    <!-- 正文 -->
    <div class="ZhengWen-box">
      <span v-html="active.content" class="ZhengWen markdown-body"></span>
    </div>
    <!-- 正文结束 -->
    <div class="divider">
      <!-- 细线 -->
      <div class="XiXian"></div>
      <span class="text-End">正文结束</span>
    </div>
    <!-- 评论 -->

    <van-row class="comment">
      <van-col span="3" class="comment-left">
        <img src="http://toutiao.itheima.net/uploads/1658452200198.blob" />
      </van-col>
      <van-col span="7">
        <span class="comment-name">评论者的ID</span>
      </van-col>
      <van-col span="2" offset="12" class="comment-right">
        <van-icon class="nice" name="good-job-o" /><span class="num">1</span>
      </van-col>
    </van-row>
    <!-- 评论+时间+回复 -->
    <div class="comment-pople">
      <van-row class="comment-text"
        ><p class="text">
          XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        </p></van-row
      >
      <van-row class="reply">
        <van-col span="4" class="reply-timer">{{ timer }}</van-col>
        <van-col span="6"
          ><van-button plain type="primary" round class="reply-btn"
            >回复 1</van-button
          ></van-col
        >
      </van-row>
    </div>
    <!-- 写评论 -->
    <van-row class="write-comments">
      <van-col span="8">
        <!-- <van-button plain type="primary" round class="play-comments"
          >写评论</van-button
        > -->
        <van-cell
          :closeable="true"
          class="play-comments"
          is-link
          @click="showPopup"
          >写评论</van-cell
        >

        <van-popup
          v-model="show"
          position="bottom"
          :style="{ height: '15%' }"
          class="popup"
        >
          <van-field
            class="text-box"
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />
          <button class="release" @click="Release">发布</button>
        </van-popup>
      </van-col>
      <van-col span="4" class="icon"
        ><van-icon name="comment-o" :badge="active.comm_count" />
      </van-col>
      <!-- comm_count -->
      <!-- 收藏 -->
      <van-col span="4" class="icon">
        <van-icon
          name="star-o"
          v-show="active.is_collected === false"
          @click="isCollection"
        />
      </van-col>
      <!-- 取消收藏 -->
      <van-icon
        v-show="active.is_collected"
        name="star-o"
        class="collection"
        @click="isNoCollection"
      />
      <!-- 点赞 -->
      <!--  -->
      <van-col span="4" class="icon">
        <van-icon
          v-show="active.attitude === -1"
          name="good-job-o"
          @click="Zang"
        />
      </van-col>
      <van-icon
        v-show="active.attitude === 1"
        class="RndZang"
        name="good-job-o"
        @click="noZang"
      />
      <!-- 转发 -->
      <van-col span="4" class="icon"><van-icon name="share-o" /></van-col>
    </van-row>
  </div>
</template>

<script>
import {
  getDetailsActive,
  PostLike,
  PostFurkLike,
  PostNice,
  PostFurkNice,
  PostZang,
  PostFurkZang,
  getComments,
  getMyComments
} from '@/api'

//
import dayjs from '@/utils/dayjs'
export default {
  data () {
    return {
      active: [],
      addactive: [],
      show: false,
      message: []
    }
  },
  created () {
    this.getDetailsActive()
    this.getComments()
  },
  methods: {
    showPopup () {
      this.show = true
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    // 获取文章数据
    async getDetailsActive () {
      const res = await getDetailsActive(this.$route.params.detailsId)
      console.log(res)
      this.active = res.data.data
    },
    // 添加关注
    async PostLike () {
      try {
        const res = await PostLike(this.active.aut_id)
        console.log(res)
        this.$toast.success('关注成功！')
      } catch (e) {
        console.log('关注', e)
        this.$toast.fail('关注失败 请重试')
      }
    },
    // 取消关注
    async PostFurkLike () {
      try {
        const res = await PostFurkLike(this.active.aut_id)
        console.log(res)
        this.$toast.success('已取消关注！')
      } catch (e) {
        console.log('noGuanz', e)
        this.$toast.fail('取消关注失败，请重试')
      }
    },
    // 添加收藏
    async PostNice () {
      try {
        const res = await PostNice(this.active.art_id)
        console.log(res)
        this.$toast.success('已收藏！')
      } catch (e) {
        console.log('e', e)
      }
    },
    // 取消收藏
    async PostFurkNice () {
      try {
        const res = await PostFurkNice(this.active.art_id)
        console.log(res)
        this.$toast.success('已取消收藏！')
      } catch (e) {
        console.log('取消收藏', e)
      }
    },
    // 点赞
    async PostZang () {
      try {
        const res = await PostZang(this.active.art_id)
        console.log(res)
        this.$toast.success('已点赞')
      } catch (e) {
        console.log('Zang', e, this.active.art_id)
      }
    },
    // 取消赞
    async PostFurkZang () {
      try {
        const res = await PostFurkZang(this.active.art_id)
        console.log(res)
        this.$toast.success('已取消点赞')
      } catch (e) {
        console.log('Zang', e)
      }
    },
    // 获得评论
    async getComments () {
      try {
        const res = await getComments('a', this.active.art_id)
        // 保存进度 ID发布出去-----------------------------------------------------------
        console.log(res)
      } catch (e) {
        console.log('评论获取错误，原因是', e)
      }
    },
    // 发布内容
    async getMyComments () {
      try {
        const res = await getMyComments(
          this.active.aut_id,
          this.message,
          this.active.aut_id
        )
        console.log(res)
      } catch (e) {
        console.log('comments', e)
      }
    },

    // 点击关注/取消关注
    AddGuanZ () {
      this.PostLike()
      this.getDetailsActive()
    },

    NoGuanz () {
      this.PostFurkLike()

      this.getDetailsActive()
    },
    // 添加收藏
    isCollection () {
      this.PostNice()

      this.getDetailsActive()
      // console.log('已收藏')
    },
    // 取消收藏
    isNoCollection () {
      this.PostFurkNice()

      this.getDetailsActive()
    },
    // 点赞
    Zang () {
      this.PostZang()
      this.getDetailsActive()
    },
    // 点个锤子赞
    noZang () {
      this.PostFurkZang()
      this.getDetailsActive()
    },
    // 发布
    Release () {
      // console.log(this.message)
      if (this.message.trim() === '') {
        this.disabled = true
      } else {
        this.disabled = false
        this.show = false
        this.getMyComments()
        this.message = ''
      }
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
  font-size: 0.5rem;
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
      height: 100%;
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
    :deep(.noguanz) {
      position: absolute;
      right: 0.28rem;
      top: 3.1rem;
      background: #fff;
      color: #323233;
      border-color: #ebedf0;
    }
  }
}
.ZhengWen-box {
  width: 100%;
  margin-top: 0.3rem;
  .ZhengWen {
    font-size: 0.32rem;
    margin: 0 0.3rem;
    white-space: wrap;
  }

  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }
}
.divider {
  margin: 1rem;
  .XiXian {
    margin-top: 1rem;
    height: 0.005rem;
    background-color: #f5f6f7;
  }
  .text-End {
    position: absolute;
    left: 35%;
    margin-top: -0.3rem;
    font-size: 0.37rem;
    color: #969799;
    background-color: #fff;
    width: 3rem;
    text-align: center;
  }
}

.comment {
  padding: 0 0.65rem;
  .comment-left {
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .comment-name {
    font-size: 0.32rem;
    color: #406599;
    margin-left: 0.25rem;
  }
  .comment-right {
    .nice {
      font-size: 0.4rem;
    }
    .num {
      font-size: 0.25rem;
      margin-left: 0.1rem;
    }
  }
}
.comment-pople {
  border-bottom: 0.01rem solid #eceef1;
  margin-bottom: 2.5rem;
  .comment-text {
    // background-color: #ccc;
    width: 73%;
    margin-left: 2rem;
    height: auto !important;
    height: 50px;
    min-height: 50px;

    .text {
      font-size: 0.3rem;
      word-break: break-word;
    }
  }
  .reply {
    margin-left: 2rem;
    .reply-timer {
      font-size: 0.35rem;
      margin-top: 0.075rem;
    }
    .reply-btn {
      width: 2rem;
      height: 0.6rem;
      font-size: 0.25rem;
      bottom: 0.25rem;
      line-height: 0.6rem;
      border: 0.02667rem solid #eceef1;
      .van-button__content {
        line-height: 100%;
        color: #3d3d3d;
      }
    }
  }
}

.write-comments {
  position: fixed;
  left: 0;
  bottom: 0;
  margin-top: 120%;
  border-top: 0.05rem solid #d8d8d8;
  padding: 0.3rem;
  line-height: 0.1rem;
  background-color: #fff;
  width: 100%;
  .play-comments {
    // background-color: #ccc;
    padding: 0.1rem 0.8rem;
    top: -0.2rem;
    :deep(.van-icon-arrow:before) {
      color: unset;
      background-color: unset;
    }
  }
  .icon {
    text-align: center;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.5rem;
  }
  .collection {
    color: #3296fa;
    position: absolute;
    font-size: 0.5rem;
    top: 0.33rem;
    right: 4.22rem;
  }
  .RndZang {
    color: red;
    position: absolute;
    font-size: 0.5rem;
    top: 0.33rem;
    right: 2.55rem;
  }
  .popup {
    .text-box {
      width: 80%;
      background-color: #f5f7f9;
      height: 75%;
      margin-top: 0.35rem;
      margin-left: 0.35rem;
      :deep(.van-field__word-limit) {
        line-height: 0rem;
      }
    }
    .release {
      position: absolute;
      bottom: 1.2rem;
      color: #b5d1ec;
      margin-left: 8.55rem;
      font-size: 0.45rem;
      border: unset;
      background-color: unset;
    }
  }
}
</style>
