export const mobileRule = [
  { required: true, message: '请填写手机号' }
  //   {
  //     pattern: /^1[0-9]{10}$/,
  //     //   (0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]
  //     message: '请输入正确的手机号'
  //   }
]

export const codeRule = [
  { required: true, message: '请填写验证码' },
  {
    pattern: /[0-9]{6}/,
    message: '请输入6位验证码'
  }
]
