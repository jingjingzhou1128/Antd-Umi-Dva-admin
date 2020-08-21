import $axios from '@/utils/request'

export default {
  /**
   * @author zhoujingjing
   * @description 获取图表数据
   * @version 1.0.0
   */
  getFlowData () {
    const service = {
      method: 'get',
      url: `${window.config.baseUrl}/chart/flow/data`
    }
    return $axios(service, '')
  }
}