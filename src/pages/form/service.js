import $axios from '@/utils/request'

export default {
  /**
   * @author zhoujingjing
   * @description 上传图片
   * @version 1.0.0
   * @param {*} data {Object}
   */
  getSummaryData (data) {
    const service = {
      method: 'post',
      url: `${window.config.baseUrl}/file/upload`
    }
    return $axios(service, data)
  }
}