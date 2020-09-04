import $axios from '@/utils/request'
const deploy = '/api'

export default {
  /**
   * @author zhoujingjing
   * @description 获取列表数据
   * @version 1.0.0
   * @param {*} data {Object}
   */
  getTableList (data) {
    const service = {
      method: 'get',
      url: `${deploy}/table/list`
    }
    return $axios(service, data)
  }
}