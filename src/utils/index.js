export const LANGS = [
  {
    label: '中文简体',
    value: 'zh-CN'
  },
  {
    label: 'English',
    value: 'en-US'
  }
]

export const THEMES = [
  {
    label: 'Default',
    value: 'default'
  },
  {
    label: 'Theme1',
    value: 'theme1'
  }
]

// 函数节流
export function throttle (fn, interval = 500) {
  let timer = null
  let firstTime = true
  return function (...args) {
    if (firstTime) {
      // 第一次加载
      fn.apply(this, args)
      firstTime = false
      return
    }
    if (timer) {
      // 定时器正在执行中，跳过
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      // clearTimeout(timer)
      timer = null
    }, interval)
  }
}

// 函数防抖
export function debounce (fn, interval = 500) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, interval)
  }
}