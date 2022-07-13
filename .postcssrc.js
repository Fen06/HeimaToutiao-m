module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      //设计稿1rem的大小
      //vant组件库根据37.5
      //   rootValue: 37.5,
      rootValue: (module) => (/vant/gi.test(module.file) ? 37.5 : 75),

      //   适配属性 * 代表全部
      propList: ['*']
    }
  }
}
