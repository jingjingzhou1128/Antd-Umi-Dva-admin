import $axios from '@/utils/request'
const deploy = '/api'

export default {
  /**
   * @author zhoujingjing
   * @description 用户登录接口
   * @version 1.0.0
   * @param {*} data {Object}
   *                 username {String} 用户名
   *                 password {String} 密码
   */
  login (data) {
    const service = {
      method: 'post',
      url: `${deploy}/user/login`
    }
    return $axios(service, data)
  },
  /**
   * @author zhoujingjing
   * @description 判断用户是否已登录
   * @version 1.0.0
   * @param {*}
   */
  isLogin (data) {
    const service = {
      method: 'get',
      url: `${deploy}/user/isLogin`
    }
    return $axios(service, data)
  },
  /**
   * @author zhoujingjing
   * @description 获取用户菜单权限
   * @version 1.0.0
   * @param {*}
   */
  getPrmCode (data) {
    const service = {
      method: 'get',
      url: `${deploy}/user/prmCodeList`
    }
    return $axios(service, data)
  }
}