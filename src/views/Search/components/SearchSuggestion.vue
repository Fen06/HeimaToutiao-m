<template>
  <div>
    <van-cell-group>
      <van-cell v-for="(item, index) in HigthLightData" :key="index">
        <template #icon>
          <van-icon name="search" class="search-icon" />
        </template>
        <template #title>
          <span v-html="item"></span>
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

  watch: {
    keyword: {
      immediate: true,
      handler () {
        this.getSearchSuggestion()
      }
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
