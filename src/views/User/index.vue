<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="onClickLeft"
      class="topBgc"
    >
      <template #left>
        <van-icon name="arrow-left" />
      </template>
    </van-nav-bar>
    <input type="file" hidden ref="file" @change="onFileChange" />
    <div class="Nr">
      <van-cell
        class="Toux"
        title="头像"
        is-link
        :value="Tx"
        @click="$refs.file.click()"
      >
        <van-image
          class="img"
          round
          width="0.8rem"
          height="0.8rem"
          :src="User.photo"
        />
        <template #right-icon>
          <van-icon name="arrow" class="right" />
        </template>
      </van-cell>
      <!-- 顶部更改昵称 -->
      <van-cell
        class="Name"
        title="昵称"
        is-link
        :value="User.name"
        @click="Nameshow = true"
      />
      <van-cell
        class="Sex"
        title="性别"
        is-link
        @click="Sexshow = true"
        :value="User.gender === 0 ? '男' : '女'"
      ></van-cell>
      <van-cell
        is-link
        title="生日"
        @click="show = true"
        :value="User.birthday || '1990-11-20'"
      />
      <!-- 时间选择面板 -->
      <van-action-sheet v-model="show">
        <van-datetime-picker
          class="picker-day"
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="Srconfirm"
          @cancel="cancel"
        >
        </van-datetime-picker>
      </van-action-sheet>
      <!-- 性别选择面板 -->
      <van-popup v-model="Sexshow" position="bottom" :style="{ height: '50%' }">
        <van-picker
          title="更新性别"
          show-toolbar
          :columns="columns"
          @confirm="SexYes"
          @cancel="SexNo"
          @change="onChange"
        >
        </van-picker>
      </van-popup>
      <!-- 修改昵称 -->
      <van-popup
        v-model="Nameshow"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <van-nav-bar
          title="更改昵称"
          left-text="返回"
          right-text="保存"
          left-arrow
          @click-left="NameOut"
          @click-right="NameEnter"
        />
        <van-cell-group>
          <van-field
            v-model="value"
            placeholder="请输入新的昵称"
            maxlength="7"
            show-word-limit
          />
        </van-cell-group>
      </van-popup>
      <!-- 编辑头像弹层 -->
      <van-popup
        v-model="isShowUpdateAvatar"
        style="height: 100%"
        position="bottom"
      >
        <UpdatePhoto
          v-if="isShowUpdateAvatar"
          @update-photo="User.photo = $event"
          @close="isShowUpdateAvatar = false"
          :img="imgUrl"
        ></UpdatePhoto>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getUserData, getUserProfile } from '@/api'
import { Toast } from 'vant'
import UpdatePhoto from './updatePhoto.vue'
export default {
  data () {
    return {
      Tx: '',
      Nc: '',
      Sr: '',
      Nameshow: false,
      value: '',
      // 性别选择状态
      Sexshow: false,
      columns: ['男', '女'],
      Xb: '',
      // 用户信息
      User: [],
      // 生日选择状态
      show: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2022, 10, 1),
      currentDate: new Date(2020, 10, 1),
      isShowUpdateAvatar: false,
      imgUrl: ''
    }
  },
  created () {
    this.getUserData()
    this.Sr = this.User.birthday
  },
  mounted () {
    this.timeFormat(new Date())
  },

  components: {
    UpdatePhoto
  },

  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    NameOut () {
      this.Nameshow = false
    },
    async NameEnter () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await getUserProfile({ name: this.value })
        console.log(res)
        this.User.name = this.value
      } catch (e) {
        console.log('昵称修改有误', e)
      }
      this.Nameshow = false
    },
    SexShow () {
      this.Sexshow = true
    },
    // 性别关闭
    SexNo () {
      this.Sexshow = false
    },
    // 性别确认
    async SexYes () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })

      try {
        const res = await getUserProfile({ gender: this.Xb })
        console.log(res)
        // window.location.reload()
        this.User.gender = this.Xb
        this.Sexshow = false
      } catch (e) {
        console.log('sex', e)
      }
    },
    onChange (picker, value, index) {
      this.Xb = index
    },

    async UpdataSex () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await getUserProfile({ gender: this.Xb })
        console.log(res)
        // window.location.reload()
      } catch (e) {
        console.log('sex', e)
      }
    },
    // 点击取消
    cancel () {
      this.show = false
    },
    // 点击确认
    async Srconfirm () {
      this.Sr = this.timeFormat(this.currentDate)
      console.log(this.Sr)
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await getUserProfile({ birthday: this.Sr })
        console.log(res)
        this.User.birthday = this.Sr
        window.location.reload()
      } catch (e) {
        console.log('生日错误', e)
      }

      this.show = false
    },
    timeFormat (time) {
      // 时间格式化 2019-09-08
      const year = time.getFullYear()
      const month = time.getMonth() + 1
      const day = time.getDate()
      return year + '-' + month + '-' + day
    },
    // 获取用户个人信息
    async getUserData () {
      try {
        const res = await getUserData()
        console.log(res)
        this.User = res.data.data
      } catch (e) {
        console.log('获取用户个人资料错误', e)
      }
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.imgUrl = window.URL.createObjectURL(file)
      // console.log(imgUrl)
      this.isShowUpdateAvatar = true
      this.$refs.file.value = ''
    }
  }
  // computed: {
  //   timer () {
  //     this.nowTmer=this
  //   }
  // }
}
</script>

<style lang="less" scoped>
:deep(.topBgc) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.Nr {
  background-color: #fff;
  .img {
    margin-right: 0.3rem;
  }
  .right {
    line-height: 1rem;
    color: #969799;
  }
}
.content {
  padding: 16px 16px 160px;
}
.Bgc {
  width: 100%;
  height: 100%;
  background-color: #ccc;
}
.cls {
  background-color: unset;
  border: unset;
}
</style>
