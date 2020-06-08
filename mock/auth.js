import {delay} from 'roadhog-api-doc'

export default delay({
  'POST /api/user/login': (req, res) => {
    if ((req.body.username === 'admin' || req.body.username === 'guest') && req.body.password === '123456') {
      let result = {}
      if (req.body.username === 'admin') {
        result.username = 'Admin'
      } else {
        result.username = 'Guest'
      }
      res.send({
        code: 200,
        flag: true,
        result,
        msg: ''
      })
    } else {
      res.send({
        code: 'E0001',
        flag: false,
        result: {},
        msg: '用户名或者密码错误'
      })
    }
  },
  'GET /api/user/isLogin': (req, res) => {
    if (!req.query.username) {
      res.send({
        code: 'E0002',
        flag: false,
        result: {},
        msg: '用户未登录'
      })
    } else {
      res.send({
        code: 200,
        flag: true,
        result: {
          username: req.query.username.charAt(0).toUpperCase() + req.query.username.slice(1)
        },
        msg: ''
      })
    }
  },
  'GET /api/user/prmCodeList': (req, res) => {
    if (req.query.username && req.query.username.toLowerCase() === 'admin') {
      res.send({
        code: 200,
        flag: true,
        result: ['UI', 'FORM-BASIC', 'FORM-DYNAMIC'],
        msg: ''
      })
    } else {
      res.send({
        code: 200,
        flag: true,
        result: ['FORM-BASIC', 'FORM-DYNAMIC'],
        msg: ''
      })
    }
  }
}, 1000)