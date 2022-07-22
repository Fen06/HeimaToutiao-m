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
      <span @click="empty">全部删除</span>
      <span @click="isDelet = true"> 完成</span>
    </div>
    <van-cell-group
      v-for="(item, index) in HistoryLI"
      :key="index"
      @click="GoSearch(item)"
    >
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
            @click="dele(item)"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // HistoryLI: JSON.parse(localStorage.getItem('HistoryLish')),
      HistoryLI: JSON.parse(localStorage.getItem('HistoryLish')),
      isDelet: true
    }
  },
  methods: {
    GoSearch (val) {
      console.log(val)

      this.$emit('result', val)
    },
    empty () {
      localStorage.removeItem('HistoryLI')
      this.HistoryLI = []
    },
    dele (val) {
      const index = this.HistoryLI.findIndex((ele) => ele === val)
      this.HistoryLI.splice(index, 1)
      localStorage.setItem('HistoryLish', JSON.stringify(this.HistoryLI))
      this.HistoryLI = JSON.parse(localStorage.getItem('HistoryLish'))
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
