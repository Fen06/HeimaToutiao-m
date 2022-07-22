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
    <component
      :is="compentName"
      :keyword="keyword"
      :searchinfo="searchinfo"
      @getSearchSuggestion="getSearchSuggestion"
      @deletHistory="deletHistory"
      @OnHistory="OnHistory"
      @Alldelet="Alldelet"
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
      searchinfo: []
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  // created () {
  //   console.log(localStorage.getItem('HistoryLish'))
  // },
  created () {
    this.searchinfo = this.$store.state.search
  },

  methods: {
    onSearch () {
      this.isShowSearchResults = true
      // const res = this.keyword

      if (!this.searchinfo.includes(this.keyword)) {
        this.searchinfo.unshift(this.keyword)
        this.$store.commit('setSearch', this.searchinfo)
      } else {
        const i = this.searchinfo.indexOf(this.keyword)
        this.searchinfo.splice(i, 1)
        this.searchinfo.unshift(this.keyword)
        this.$store.commit('setSearch', this.searchinfo)
      }
    },
    onCancel () {
      this.$router.go(-1)
    },
    viewSearchSuggestion () {
      this.isShowSearchResults = false
    },

    getSearchSuggestion (str) {
      this.keyword = str
      this.onSearch()
    },
    // 单个删除
    deletHistory (index) {
      this.searchinfo.splice(index, 1)
      this.$store.commit('setSearch', this.searchinfo)
    },
    // 全部删除
    Alldelet (ele) {
      if (ele === 0) {
        this.searchinfo = []
      }
      this.$store.commit('setSearch', this.searchinfo)
    },
    // 点击历史记录进行搜索
    OnHistory (str) {
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
  }
}
</script>

<style lang="less" scoped>
[role='button'] {
  color: #fff;
}
</style>
