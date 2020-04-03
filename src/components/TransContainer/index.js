import {ConfigProvider} from 'antd'
import {connect} from 'dva'
import antdEnLocale from 'antd/es/locale/en_US'
import antdZhLocale from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'

function getAntLocale (lang) {
  switch (lang) {
    case 'zh-CN':
      return antdZhLocale
    case 'en-US':
      return antdEnLocale
    default:
      return antdEnLocale
  }
}

function TransContainer ({app, children}) {
  let antLocale = getAntLocale(app.lang)
  return (
    <ConfigProvider locale={antLocale}>
      {children}
    </ConfigProvider>
  )
}


export default connect(({app}) => ({app}))(TransContainer)