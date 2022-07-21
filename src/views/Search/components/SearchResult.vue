<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      offset="1"
      finished-text="没有更多了"
      @load="loadpage"
    >
      <van-cell-group>
        <van-cell v-for="(item, index) in result" :key="index">
          <template #icon>
            <van-icon name="search" class="search-icon" />
          </template>
          <template #title>
            <span v-html="item.title"></span>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api'
export default {
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  watch: {
    keyword: {
      immediate: true,
      handler () {
        this.getSearchResult()
      }
    }
  },
  data () {
    return {
      result: [],
      list: [],
      footer: '',
      page: 1,
      loading: false,
      finished: false
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult(this.keyword)
        console.log(res.data.data.results)
        this.result = res.data.data.results
      } catch (error) {
        console.log('error', error)
      }
    },
    async loadpage () {
      try {
        this.page++
        const res = await getSearchResult(this.keyword, this.page)
        const str = res.data.data.results
        if (str.length < 10) {
          this.finished = true
          return
        }
        this.result = [...this.result, ...str]
        this.loading = false
      } catch (error) {
        console.log('error', error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
}
</style>
