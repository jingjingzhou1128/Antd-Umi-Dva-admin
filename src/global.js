import { setLocale } from 'umi-plugin-react/locale'

import '@/utils/prototype.js'

/**
 * @author zhoujingjing
 * @description 初始化页面样式主题
 */
function initTheme () {
  let theme = sessionStorage.getItem('theme') || 'default'
  document.getElementsByTagName('body')[0].setAttribute('data-theme', theme)
}

// 初始化页面主题
initTheme()

// 国际化
setLocale(sessionStorage.getItem('lang') || window.config.defaultLang, false)