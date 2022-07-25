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
      <span
        ref="contentRefs"
        v-html="active.content"
        class="ZhengWen markdown-body"
      >
      </span>

      <!--  -->
    </div>

    <!-- 正文结束 -->
    <div class="divider">
      <!-- 细线 -->
      <div class="XiXian"></div>
      <span class="text-End">正文结束</span>
    </div>
    <!-- 评论 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      offset="1"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 对文章的评论 -->
      <van-cell v-for="(item, index) in comments" :key="index">
        <van-image
          slot="icon"
          round
          width="40"
          height="40"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span class="timer">{{ CommentTimer }}</span>
            <van-button
              size="small"
              type="default"
              round
              class="Huif"
              @click="reply(item.com_id)"
              >回复 {{ item.reply_count }}
            </van-button>
          </p>
        </div>
        <van-icon
          v-show="item.is_liking === false"
          slot="right-icon"
          name="good-job-o"
          @click="commentNice(item.com_id)"
          >赞</van-icon
        >
        <van-icon
          v-show="item.is_liking === true"
          class="nice"
          slot="right-icon"
          name="good-job-o"
          @click="commentNoNice(item.com_id)"
          >赞{{ item.like_count }}</van-icon
        >
      </van-cell>
    </van-list>

    <!------------ 回复评论 ------------------------------------------------->

    <!-- 某条评论的界面 -->
    <van-popup
      v-model="Replyshow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      class="ReplyCommentPopup"
    >
      <!-- KingComment -->
      <van-cell
        v-for="(item, index) in KingComment"
        :key="index"
        class="ImComments"
      >
        <van-image
          slot="icon"
          class="img"
          round
          width="40"
          height="40"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title" class="name">{{
          item.aut_name
        }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span class="timer">{{ CommentTimer }}</span>
            <van-button size="small" type="default" round class="Huiff"
              >回复 {{ item.reply_count }}
            </van-button>
          </p>
        </div>
      </van-cell>
      <p class="All-R">全部回复</p>
      <van-cell v-for="(item, index) in inComment" :key="index">
        <van-image
          slot="icon"
          round
          width="40"
          height="40"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span class="timer">{{ CommentTimer }}</span>
            <van-button size="small" type="default" round class="Huif"
              >回复 {{ item.reply_count }}
            </van-button>
          </p>
        </div>
      </van-cell>
      <!-- 底部评论 -->
      <div class="reply-btn-box">
        <van-button type="primary" class="reply-comment" round @click="rmshow"
          >评论</van-button
        >
        <van-popup
          v-model="Rmshow"
          position="bottom"
          :style="{ height: '15%' }"
          class="Rmpopup"
        >
          <van-field
            class="Reply-text-box"
            v-model="commentMessage"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />
          <button
            class="Rarelease"
            @click="rapRelease"
            style="
              position: absolute;
              right: 0.25rem;
              top: 1.1rem;
              background: unset;
              border: unset;
              font-size: 0.4rem;
            "
          >
            发布
          </button>
        </van-popup>
      </div>
    </van-popup>
    <!------------ 回复评论 ------------------------------------------------->
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
  getMyComments,
  getActiveComments,
  getMyInComments,
  getActiveCommentsNice,
  getActiveCommentsNoNice
  // getActiveCommentsYeshu
} from '@/api'

//

import dayjs from '@/utils/dayjs'
import { Toast } from 'vant'
export default {
  data () {
    return {
      // 存放文章详情
      active: [],
      show: false,
      // 对文章评论的文本内容
      message: [],
      // 评论的评论文本内容
      commentMessage: [],
      offset: null,
      limit: 10,
      // 对文章评论列表
      comments: [],
      Numcomments: [],
      list: [],
      loading: false,
      finished: false,
      // 评论的开关
      Replyshow: false,
      // 评论的评论开关
      Rmshow: false,
      total_count: 0,
      // 存放点击评论的评论列表
      inComment: [],
      // 存放点击评论的信息
      KingComment: [],
      comId: [],
      commentNiceId: []
    }
  },

  created () {
    // 加载页面时获取文章数据
    this.getDetailsActive()
    // 加载页面时获取文章评论
  },
  // mounted

  methods: {
    // 取消点赞
    commentNoNice (val) {
      console.log(val)
      this.commentNiceId = val
      console.log(this.commentNiceId)
      this.getActiveCommentsNoNice()
    },
    // 对评论点赞
    commentNice (val) {
      console.log(val)
      this.commentNiceId = val
      console.log(this.commentNiceId)
      this.getActiveCommentsNice()
      // console.log(res)
    },
    // 对评论的评论进行发布
    rapRelease () {
      // console.log(this.commentMessage)
      if (this.commentMessage.trim() === '') {
        console.log('内容不能为空')
      } else {
        this.getMyInComments()
        this.Rmshow = false
        this.commentMessage = ''
      }
    },
    rmshow () {
      this.Rmshow = true
    },
    // 点击回复调用评论的评论
    async reply (val) {
      this.Replyshow = true
      const res = await getActiveComments('c', val)
      console.log(res)
      // 评论里的评论
      this.inComment = res.data.data.results
      // 筛选文章评论里符合点击的com_id
      const str = this.comments.filter((ele) => ele.com_id === val)
      // 找到后把值传给一个空数组
      this.KingComment = str
      console.log(str)
      console.log('com_id', val)
      this.comId = val
      this.getActiveComments()
      // console.log(this.inComment)
    },
    async onLoad () {
      this.offset++
      const { data } = await getActiveComments(
        'a',
        this.active.art_id,
        this.Numcomments.last_id
      )
      const { results } = data.data
      this.Numcomments.push(...results)
      console.log(this.Numcomments.end_id)
      console.log(data.data)
      // 获取评论的内容，不能动
      this.comments = data.data.results
      // 打印所有评论
      this.loading = false

      if (data.data.end_id === data.data.last_id) {
        this.finished = false
        this.loading = false
      }
    },
    // 获取文章评论
    async getActiveComments () {
      await getActiveComments('a', this.active.art_id)
    },
    // 获取点击评论的评论
    async getTwoComments () {
      await getActiveComments('c', this.active.com_id)
    },
    showPopup () {
      this.show = true
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    // 获取文章数据················································
    async getDetailsActive () {
      const res = await getDetailsActive(this.$route.query.detailsId)
      console.log(res)
      this.active = res.data.data
      // console.log('++++', this.active)
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
      // console.log(this.active.art_id)
      try {
        // this.getActiveComments()
        await PostZang(this.active.art_id)
        // console.log(this.active.art_id)
        this.$toast.success('已点赞')
      } catch (e) {
        console.log('Zang', e, this.active.art_id)
      }
    },
    // 取消赞
    async PostFurkZang () {
      try {
        await PostFurkZang(this.active.art_id)

        this.$toast.success('已取消点赞')
      } catch (e) {
        console.log('Zang', e)
      }
    },
    // 对评论进行点赞
    async getActiveCommentsNice () {
      try {
        // console.log('ac', this.commentNiceId)
        const res = await getActiveCommentsNice(this.commentNiceId)
        this.getActiveComments()
        Toast.loading({
          message: '加载中...',
          forbidClick: true
        })

        // window.location.reload()
        console.log(res)
      } catch (e) {
        console.log('对评论点赞', e)
      }
    },
    // 取消点赞
    async getActiveCommentsNoNice () {
      try {
        const res = await getActiveCommentsNoNice(this.commentNiceId)
        this.getActiveComments()
        Toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        console.log(res)
      } catch (e) {
        console.log('取消', e)
      }
    },

    // 发布内容
    async getMyComments () {
      try {
        const res = await getMyComments(this.active.art_id, this.message)
        console.log(res.data.data)
        const mycomment = res.data.data.new_obj
        this.comments.unshift(mycomment)
        this.$toast.success('评论成功')
        this.getActiveComments()
      } catch (e) {
        console.log('comments', e)
      }
    },
    // 对评论进行评论发布
    async getMyInComments () {
      try {
        const res = await getMyInComments(
          this.comId,
          this.commentMessage,
          this.active.art_id
        )
        const mycomment = res.data.data.new_obj
        this.inComment.unshift(mycomment)
        console.log(res)
        console.log(this.active.art_id)
      } catch (e) {
        console.log('comments', e, this.comId, this.commentMessage)
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
    },
    CommentTimer () {
      const art = this.comments
      const comtimer = dayjs(art.pubdate).fromNow()
      return comtimer
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
    position: relative;
    border-radius: 25%;
    margin-left: 0.4rem;

    .van-button--info {
      height: 1rem;
      width: 2.2rem;
      right: 0.3rem;
    }
    .van-button--normal {
      font-size: 0.28rem;
    }

    .add {
      margin-right: 0.1rem;
    }
    :deep(.noguanz) {
      position: absolute;
      background: #fff;
      color: #323233;
      border-color: #ebedf0;
      width: 2.2rem;
      height: 0.9rem;
      top: 0.1rem;
      height: 1rem;
      right: 0.1rem;
    }
  }
}
.ZhengWen-box {
  width: 100%;
  margin-top: 0.3rem;

  .ZhengWen {
    font-size: 0.32rem;
    margin: 0 0.3rem;
    padding: 0 0.2rem;
    // white-space: wrap;
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

.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 150px;
  .timer {
    margin-top: 8px;
    margin-right: 10px;
  }
  .Huif {
    width: 2rem;
    height: 0.7rem;
  }

  // .ReplyCommentPopup {
  //   .reply-btn-box {
  //     width: 100%;
  //     height: 1.35rem;
  //     background-color: #ff69b4;
  //     position: fixed;
  //     left: 0;
  //     bottom: 0;
  //     .reply-comment {
  //       width: 85%;
  //       color: #000;
  //       background-color: #fff;
  //       border: unset;
  //       height: 75%;
  //       margin-top: 0.15rem;
  //       :deep(.text-box) {
  //         width: 80%;
  //         background-color: #f5f7f9;
  //         height: 75%;
  //         margin-top: 0.35rem;
  //         margin-left: 0.35rem;
  //         :deep(.van-field__word-limit) {
  //           line-height: 0rem;
  //         }
  //         :deep(.Rarelease) {
  //           position: absolute;
  //           bottom: 1.2rem;
  //           color: #b5d1ec;
  //           margin-left: 8.55rem;
  //           font-size: 0.45rem;
  //           border: unset;
  //           background-color: unset;
  //         }
  //       }
  //     }
  //   }
  // }
}

.ReplyCommentPopup {
  .ImComments {
    align-self: start;
    :deep(.img) {
      margin-top: 0.55rem;
    }
  }
  .reply-btn-box {
    width: 100%;
    height: 1.35rem;
    background-color: #ff69b4;
    position: fixed;
    left: 0;
    bottom: 0;
    .reply-comment {
      width: 85%;
      color: #000;
      background-color: #fff;
      border: unset;
      height: 75%;
      margin-top: 0.15rem;
      margin-left: 0.7rem;
    }
    .Reply-text-box {
      width: 80%;
      background-color: #f5f7f9;
      height: 75%;
      margin-top: 0.35rem;
      margin-left: 0.35rem;

      :deep(.Rarelease) {
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
}
.All-R {
  font-size: 0.4rem;
  text-align: center;
}
:deep(.nice) {
  color: red;
}
</style>
