import axios from 'axios'

const env = process.env
// 获取验证码
export function getVerifyCode (params) {
  return axios.get(env.REACT_APP_MI + '/user/sms/send', {params: params}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 账号密码登录接口
export function pwdSignIn (params) { // application/json
  return axios.post(env.REACT_APP_MI + '/user/login/pwd', params).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 短信登录接口
export function codeSignIn (params) {
  return axios.post(env.REACT_APP_MI + '/user/login/sms', params).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}
