import $axios from '@/utils/request'

export default {
  /**
   * @author zhoujingjing
   * @description 获取访问量数据
   * @version 1.0.0
   * @param {*} data {Object}
   */
  getSummaryData (data) {
    const service = {
      method: 'get',
      url: `${window.config.baseUrl}/ds/summary`
    }
    return $axios(service, data)
  }
}