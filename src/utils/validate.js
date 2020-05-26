/**
 * @author zhoujingjing
 * @description 验证文件是否是图片
 * @param {*} fileType 被验证的文件类型
 * @returns {boolean}
 */
export function validateImage (fileType) {
  const reg = /(png|jpe?g)(\?.*)?$/
  return reg.test(fileType)
}