import axios from 'axios'
//获取用户的空投数据
export function getArkdropUserInfoByAxios(url: string, params = {}) {
  return axios
    .get(url, {
      params: params,
      validateStatus: function(status) {
        // axios 底层采用 Promise 实现，下方表达式表示只有返回 code 为 2xx 才被正常返回（resolve），非 2xx 全部当做异常（reject）
        return status >= 200 && status < 300
      }
    })
    .then(response => {
      // 返回后端返回数据
      return response.data
    })
    .catch(error => {
      // 异常处理
      console.log(error)
    })
}
//获取用户的空投数据
export function getAirdropUserInfoByPost(url: string, params = {}) {
  return axios
    .post(url, params)
    .then(response => {
      // 返回后端返回数据
      // console.log(response)
      return response.data
    })
    .catch(error => {
      // 异常处理
      console.log(error)
      console.debug(error)
    })
}

//获取用户的空投数据
export function getAirdropRewardByPost(url: string, params = {}) {
  return axios
    .post(url, params)
    .then(response => {
      // 返回后端返回数据
      // console.log(response)
      return response.data
    })
    .catch(error => {
      // 异常处理
      console.log(error)
      console.debug(error)
    })
}
//获取用户的空投数据
export function getAirdropRewardByGet(url: string, params = {}) {
  return axios
    .get(url, params)
    .then(response => {
      // 返回后端返回数据
      // console.log(response)
      return response.data
    })
    .catch(error => {
      // 异常处理
      console.log(error)
      console.debug(error)
    })
}
