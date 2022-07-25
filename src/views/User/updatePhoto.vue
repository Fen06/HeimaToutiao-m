<template>
  <div>
    <div class="data">
      <img :src="img" ref="thisImg" />
      <div class="toolbar">
        <span class="cancel" @click="$emit('close')">取消</span>
        <span class="confirm" @click="confirm">完成</span>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import { Toast } from 'vant'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  data () {
    return {
      cropper: []
    }
  },
  props: {
    img: {
      type: [String, Object],
      retuired: true
    }
  },
  mounted () {
    const imd = this.$refs.thisImg
    this.cropper = new Cropper(imd, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: true, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
    // console.log(cropper)
  },
  methods: {
    confirm () {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        Toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserPhoto(formData)
        console.log(data)
        this.$emit('close')
        this.$emit('update-photo', data.data.photo)
        // 关闭弹层，更新视图
        this.$emit('close')
        this.$emit('update-photo', data.data.photo)
      })
    }
    // async updateAvatar (blob) {
    //   this.$toast.loading({
    //     message: '保存中...',
    //     forbidClick: true,
    //     loadingType: 'spinner',
    //     duration: 0
    //   })
    //   try {
    //     const formData = new FormData()
    //     formData.append('photo', blob)
    //     const { data } = await updateUserPhoto(formData)
    //     // 关闭弹层，更新视图
    //     this.$emit('close')
    //     this.$emit('update-photo', data.data.photo)
    //     this.$toast('更新成功')
    //   } catch (err) {
    //     this.$toast('更新失败')
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.data {
  background-color: #ccc;
  width: 100%;
  height: 17.75rem;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
