import $axios from '@/utils/request'
const deploy = '/api'

export default {
  /**
   * @author zhoujingjing
   * @description 获取图表数据
   * @version 1.0.0
   */
  getFlowData () {
    const service = {
      method: 'get',
      url: `${deploy}/chart/flow/data`
    }
    return $axios(service, '')
  }
}