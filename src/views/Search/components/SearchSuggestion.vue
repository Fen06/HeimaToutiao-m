<template>
  <div>
    <van-cell-group>
      <van-cell
        class="btn-cell"
        v-for="(item, index) in HigthLightData"
        :key="index"
        @click="GoSearch(item)"
      >
        <template #icon>
          <van-icon name="search" class="search-icon" />
        </template>
        <template #title>
          <span v-html="item" class="item"></span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'
export default {
  props: {
    keyword: {
      type: String,
      required: true
    }
  },

  mounted () {
    if (JSON.parse(localStorage.getItem('HistoryLish'))) {
      this.HistoryLish = JSON.parse(localStorage.getItem('HistoryLish'))
    }
  },
  data () {
    return {
      suggestion: []
    }
  },
  methods: {
    async getSearchSuggestion () {
      try {
        const res = await getSearchSuggestion(this.keyword)
        if (res.data.data.options.length === 0) {
          this.$toast.fail('没有搜索建议')
        }
        console.log(res)
        this.suggestion = res.data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('获取数据失败,请重试')
      }
    },
    GoSearch (val) {
      console.log(val)
      const str = val.replace(/<[^>]*>/g, '')
      this.$emit('result', str)
      if (!this.HistoryLish.includes(str)) {
        this.HistoryLish.unshift(str)
        localStorage.setItem('HistoryLish', JSON.stringify(this.HistoryLish))
      } else {
        const i = this.HistoryLish.indexOf(str)
        this.HistoryLish.splice(i, 1)
        this.HistoryLish.unshift(str)
        localStorage.setItem('HistoryLish', JSON.stringify(this.HistoryLish))
      }
    }
  },
  watch: {
    keyword: {
      immediate: true,
      handler () {
        this.getSearchSuggestion()
      }
    },
    History: {
      deep: true,
      handler (val) {
        localStorage.setItem('list', JSON.stringify(val || []))
      }
    }
  },
  computed: {
    HigthLightData () {
      const reg = new RegExp(this.keyword, 'ig')
      return this.suggestion.map((item) =>
        item.replace(reg, (match) => `<span style='color:red'>${match}</span>`)
      )
    }
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
}
</style>
