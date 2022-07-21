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
        @cancel="onCancel(val)"
        @focus="viewSearchSuggestion"
      />
    </form>
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->
    <component
      :is="compentName"
      :keyword="keyword"
      @result="result"
    ></component>
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
      isShowSearchResults: false,
      Rapsugg: [],
      en: []
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  created () {
    console.log(localStorage.getItem('HistoryLish'))
  },
  methods: {
    onSearch (val) {
      this.isShowSearchResults = true
      this.en = val
    },
    onCancel () {
      this.$router.go(-1)
    },
    viewSearchSuggestion () {
      this.isShowSearchResults = false
    },

    result (str) {
      console.log(str)
      this.keyword = str
      this.onSearch()
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
    // SearchResultData () {
    //   const reg = new RegExp(this.keyword, 'ig')
    //   return this.Rapsugg.map((item) =>
    //     item.replace(reg, (`<span style='color:red'>${match}</span>`) => `${match}`)
    //   )
    // }
  }
}
</script>

<style lang="less" scoped>
[role='button'] {
  color: #fff;
}
</style>
