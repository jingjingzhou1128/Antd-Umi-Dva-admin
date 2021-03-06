import $axios from '@/utils/request'
const deploy = '/api'

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
      url: `${deploy}/ds/summary`
    }
    return $axios(service, data)
  },
  /**
   * @author zhoujingjing
   * @description 获取销售额类别占比数据
   * @version 1.0.0
   * @param {*} data {Object}
   */
  getSaleType (data) {
    const service = {
      method: 'get',
      url: `${deploy}/ds/saleType`
    }
    return $axios(service, data)
  },
  /**
   * @author zhoujingjing
   * @description 获取热门搜索列表数据
   * @version 1.0.0
   * @param {*} data {Object}
   */
  getSearchList (data) {
    const service = {
      method: 'get',
      url: `${deploy}/ds/searchList`
    }
    return $axios(service, data)
  },
  /**
   * @author zhoujingjing
   * @description 获取销售趋势图数据
   * @version 1.0.0
   * @param {*} data {Object}
   */
  getSaleTrend (data) {
    const service = {
      method: 'get',
      url: `${deploy}/ds/saleTrend`
    }
    return $axios(service, data)
  }
}