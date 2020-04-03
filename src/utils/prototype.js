import {message, notification} from 'antd'

/**
 * @author zhoujingjing
 * @description 格式化数字，每三位加分位符
 * @param value 需要转换的值
 *        precis 保留小数位位数
 */
window.toThousandFilter = (value, precis = 2) => {
  if (!value) return ''
  return Number(value).toFixed(precis).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

/**
 * @author zhoujingjing
 * @description 首字母大写
 * @param str 需要转换的字符串
 */
window.initToUpperCase = (str) => {
  if (!str) return ''
  str = str.toString()
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * @author zhoujingjing
 * @description 消息提示
 * @param option {Object} 配置项
 *               content 内容
 */
window.messageInfo = (option) => {
  message.info(option.content, 3)
}

/**
 * @author zhoujingjing
 * @description 成功提示
 * @param option {Object} 配置项
 *               content 内容
 */
window.messageSuccess = (option) => {
  message.success(option.content, 3)
}

/**
 * @author zhoujingjing
 * @description 错误提示
 * @param option {Object} 配置项
 *               content 内容
 */
window.messageError = (option) => {
  message.error(option.content, 3)
}

/**
 * @author zhoujingjing
 * @description 警告提示
 * @param option {Object} 配置项
 *               content 内容   
 */
window.messageWarn = (option) => {
  message.warning(option.content, 3)
}

/**
 * @author zhoujingjing
 * @description 消息通知
 * @param option {Object} 配置项
 *               content 内容
 *               callback 关闭消息时回调函数   
 */
window.notificationInfo = (option) => {
  notification.info({
    placement: 'topRight',
    duration: 3,
    message: option.msg,
    description: option.desc
  })
}

/**
 * @author zhoujingjing
 * @description 成功通知
 * @param option {Object} 配置项
 *               content 内容
 *               callback 关闭消息时回调函数   
 */
window.notificationSuccess = (option) => {
  notification.success({
    placement: 'topRight',
    duration: 3,
    message: option.msg,
    description: option.desc
  })
}

/**
 * @author zhoujingjing
 * @description 错误通知
 * @param option {Object} 配置项
 *               content 内容
 *               callback 关闭消息时回调函数   
 */
window.notificationError = (option) => {
  notification.error({
    placement: 'topRight',
    duration: 3,
    message: option.msg,
    description: option.desc
  })
}

/**
 * @author zhoujingjing
 * @description 警告通知
 * @param option {Object} 配置项
 *               content 内容
 *               callback 关闭消息时回调函数   
 */
window.notificationWarn = (option) => {
  notification.warning({
    placement: 'topRight',
    duration: 3,
    message: option.msg,
    description: option.desc
  })
}

/**
 * @author zhoujingjing
 * @description 格式化时间
 * @param option value 时间
 *               format 时间格式   
 */
window.formatDate = (value, format = 'yyyy-MM-dd HH:mm:ss') => {
  if (value === null || value === '' || value === undefined) {
    return
  }
  var paddNum = function (num) {
    num += ''
    return num.replace(/^(\d)$/, '0$1')
  }
  var date = new Date(parseInt(value))
  var cfg = {
    yyyy: date.getFullYear(),
    yy: date.getFullYear().toString().substring(2),
    M: date.getMonth() + 1,
    MM: paddNum(date.getMonth() + 1),
    d: date.getDate(),
    dd: paddNum(date.getDate()),
    HH: paddNum(date.getHours()),
    mm: paddNum(date.getMinutes()),
    ss: paddNum(date.getSeconds())
  }
  return format.replace(/([a-z])(\1)*/ig, function (m) {
    return cfg[m]
  })
}
