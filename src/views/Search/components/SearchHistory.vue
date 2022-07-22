<template>
  <div>
    <span class="title">搜索历史</span>
    <van-icon
      class="lj-box"
      @click="isDelet = false"
      name="delete-o"
      v-if="isDelet"
    ></van-icon>
    <div class="btn" v-else>
      <span @click="Alldelet(0)">全部删除</span>
      <span @click="isDelet = true"> 完成</span>
    </div>
    <van-cell-group
      v-for="(item, index) in searchinfo"
      :key="index"
      @click="GoSearch(item, index)"
    >
      <!--  -->
      <van-cell>
        <template #icon>
          <van-icon name="search" class="search-icon" />
        </template>
        <template #title>
          <span v-html="item"></span>
        </template>
        <div></div>
        <template #right-icon>
          <van-icon
            name="close"
            v-show="isDelet == false"
            class="Delet"
            @click="delet(item, index)"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: {
    searchinfo: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      // HistoryLI: JSON.parse(localStorage.getItem('HistoryLish')),
      isDelet: true
    }
  },
  methods: {
    // 删除全部
    Alldelet (ele) {
      if (!this.isDelet) {
        this.$emit('Alldelet', ele)
      }
    },
    // 单个删除
    delet (item, index) {
      if (!this.isDelet) {
        return this.$emit('deletHistory', index)
      }
      this.$emit('getSearchSuggestion', item)
    },
    // 历史记录点击搜索
    GoSearch (val) {
      console.log(val)
      this.$emit('OnHistory', val)
    }
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
  padding-right: 10px;
}
.title {
  font-size: 0.35rem;
  margin-left: 0.5rem;
}
.lj-box {
  margin-left: 7.2rem;
  font-size: 0.45rem;
}
.btn {
  position: absolute;
  z-index: 99;
  right: 0.5rem;
  top: 1.6rem;
  font-size: 0.35rem;
  color: #969799;
}
.Delet {
  margin-top: 0.1rem;
  font-size: 0.55rem;
}
</style>
