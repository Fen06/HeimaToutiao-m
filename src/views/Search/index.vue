<template>
  <div>
    <!-- 头部搜索 -->
    <form action="/">
      <van-search
        v-model="keyword"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="viewSearchSuggestion"
      />
    </form>
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->
    <component :is="compentName" :keyword="keyword"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components//SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  data () {
    return {
      keyword: '',
      isShowSearchResults: false
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  methods: {
    onSearch () {
      this.isShowSearchResults = true
    },
    onCancel () {
      this.$router.go(-1)
    },
    viewSearchSuggestion () {
      this.isShowSearchResults = false
    }
  },

  computed: {
    compentName () {
      if (this.keyword.trim().length === 0) {
        return 'SearchHistory'
      }
      if (this.isShowSearchResults) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  }
}
</script>

<style lang="less" scoped>
[role='button'] {
  color: #fff;
}
</style>
