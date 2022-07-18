<template>
  <div>
    <van-pull-refresh
      v-model="refreshLogin"
      @refresh="loadpage"
      success-text="刷新成功"
    >
      <van-list
        @load="loadpage"
        offset="1"
        :immediate-check="false"
        :finished="isfinished"
        :error.sync="error"
        error-text="错误，请重试"
        v-model="loading"
        finished-text="没有更多了~~~~~"
      >
        <AtricleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></AtricleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getActiveList } from '@/api'
import AtricleItem from './AtricleItem.vue'
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      isfinished: false,
      loading: false,
      error: false,
      refreshLogin: false
    }
  },

  created () {
    this.getActiveList()
  },
  components: {
    AtricleItem
  },
  methods: {
    async getActiveList () {
      try {
        const { data } = await getActiveList(this.id, +new Date())
        // pre_timestamp 页数
        this.pre_timestamp = data.data.pre_timestamp
        console.log(data)
        this.articles = data.data.results
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重试')
        }
      }
    },

    async loadpage () {
      try {
        // 滚动底部加载数据
        const { data } = await getActiveList(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.isfinished = true
        }
        // console.log(data)
        if (this.refreshLogin) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        // 更新数据页数
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLogin = false
      }
    }
  }
}
</script>

<style></style>
