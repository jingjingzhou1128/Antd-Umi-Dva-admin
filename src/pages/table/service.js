import $axios from '@/utils/request'

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
      url: `${window.config.baseUrl}/table/list`
    }
    return $axios(service, data)
  }
}