export default {
  namespace: 'app',
  state: {
    collapsed: sessionStorage.getItem('collapsed') ? !!+sessionStorage.getItem('collapsed') : false, // 收起：1,true；展开：0,false；
    device: sessionStorage.getItem('device') || 'desktop',
    theme: sessionStorage.getItem('theme') || 'default',
    lang: sessionStorage.getItem('lang') || window.config.defaultLang
  },
  subscriptions: {},
  effects: {},
  reducers: {
    'openSidebar' (state) {
      sessionStorage.setItem('collapsed', 0)
      return {
        ...state,
        collapsed: false
      }
    },
    'closeSidebar' (state) {
      sessionStorage.setItem('collapsed', 1)
      return {
        ...state,
        collapsed: true
      }
    },
    'toggleSidebar' (state) {
      sessionStorage.setItem('collapsed', state.collapsed ? 0 : 1)
      return {
        ...state,
        collapsed: !state.collapsed
      }
    },
    'setDevice' (state, {device}) {
      sessionStorage.setItem('device', device)
      // console.log(device)
      return {
        ...state,
        device
      }
    },
    'setTheme' (state, {theme}) {
      sessionStorage.setItem('theme', theme)
      return {
        ...state,
        theme
      }
    },
    'setLang' (state, {lang}) {
      sessionStorage.setItem('lang', lang)
      return {
        ...state,
        lang
      }
    }
  }
}